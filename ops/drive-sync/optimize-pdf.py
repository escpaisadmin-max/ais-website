"""Build a smaller, fast-web-view PDF without modifying the Drive original."""
import hashlib
import json
import math
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile

import pymupdf


def optimize_images(document):
    # A shared image must be resized ONCE, for its largest use across all pages.
    # Document.rewrite_images can repeatedly downsample images reused on pages.
    images = {}
    for page in document:
        for image in page.get_image_info(xrefs=True):
            xref = image["xref"]
            if not xref or image["bpc"] == 1:
                continue
            a, b, c, d, _, _ = image["transform"]
            scale = min(1, max(
                math.hypot(a, b) * 110 / 72 / image["width"],
                math.hypot(c, d) * 110 / 72 / image["height"],
            ))
            images[xref] = max(images.get(xref, 0), scale)

    for xref, scale in images.items():
        image = document.extract_image(xref)
        mask = image["smask"]
        original_size = len(image["image"])
        if mask:
            original_size += len(document.extract_image(mask)["image"])
        # Small logos and line art are already cheap to load: keep them sharp.
        if original_size < 65536:
            continue
        pixmap = pymupdf.Pixmap(document, xref)
        if pixmap.colorspace.n not in (1, 3):
            pixmap = pymupdf.Pixmap(pymupdf.csRGB, pixmap)
        if mask:
            pixmap = pymupdf.Pixmap(pixmap, pymupdf.Pixmap(document, mask))
        if scale < 110 / 130:
            pixmap = pymupdf.Pixmap(pixmap, math.ceil(pixmap.width * scale), math.ceil(pixmap.height * scale))
        encoded = pixmap.tobytes("png" if pixmap.alpha else "jpeg", jpg_quality=75)
        if len(encoded) < original_size:
            document[0].replace_image(xref, stream=encoded)


def contents(document):
    """Text, page geometry, links and bookmarks must survive optimization."""
    return [
        (
            tuple(page.rect),
            page.get_text(),
            [{k: v for k, v in link.items() if k not in ("xref", "id")}
             for link in page.get_links()],
        )
        for page in document
    ], document.get_toc()


def linearize(source, target):
    result = subprocess.run([
        "qpdf", "--linearize", "--object-streams=generate", "--recompress-flate",
        "--compression-level=9", "--deterministic-id", str(source), str(target),
    ], capture_output=True, text=True)
    # qpdf can repair source cross-reference tables while reporting warnings (3).
    if result.returncode not in (0, 3):
        raise RuntimeError(result.stderr)
    subprocess.run(["qpdf", "--check", str(target)], check=True, capture_output=True)


def optimize(source, target):
    cache_path = Path(__file__).with_name("pdf-cache.json")
    repo = Path(__file__).resolve().parents[2]
    key = str(target.relative_to(repo))
    fingerprint = hashlib.sha256(
        source.read_bytes() + Path(__file__).read_bytes() + pymupdf.VersionBind.encode()
    ).hexdigest()
    cache = json.loads(cache_path.read_text()) if cache_path.exists() else {}
    if cache.get(key) == fingerprint and target.exists():
        print(f"  PDF cached: {target.name}")
        return

    with tempfile.TemporaryDirectory(prefix="ais-pdf-") as temp:
        temp = Path(temp)
        lossless = temp / "lossless.pdf"
        linearize(source, lossless)
        candidates = [source, lossless]
        with pymupdf.open(source) as original:
            expected = contents(original)
            # Leave fully scanned documents at their original image resolution.
            if any(page.get_text().strip() for page in original):
                try:
                    optimize_images(original)
                    images = temp / "images.pdf"
                    original.save(images, garbage=4, deflate=True, use_objstms=1, no_new_id=True)
                    web = temp / "web.pdf"
                    linearize(images, web)
                    with pymupdf.open(web) as candidate:
                        if contents(candidate) == expected:
                            candidates.append(web)
                        else:
                            print(f"  Using lossless optimization for {source.name}: text or links changed.")
                except (RuntimeError, subprocess.CalledProcessError):
                    print(f"  Using lossless optimization for {source.name}: rewritten PDF failed validation.")

        # Never replace an already-small PDF with a larger reading copy.
        chosen = min(candidates, key=lambda file: file.stat().st_size)
        with pymupdf.open(chosen) as candidate:
            if contents(candidate) != expected:
                raise RuntimeError(f"PDF validation failed: {source.name}")
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(chosen, target)

    cache[key] = fingerprint
    cache_path.write_text(json.dumps(cache, indent=2, sort_keys=True) + "\n")
    print(f"  PDF optimized: {target.name}: {source.stat().st_size:,} → {target.stat().st_size:,} bytes")


if __name__ == "__main__":
    optimize(Path(sys.argv[1]).resolve(), Path(sys.argv[2]).resolve())
