#!/usr/bin/env python3
"""Write a text version of every published PDF for its web page.

For each public/<library>/pdf/<id>.pdf this writes public/<library>/text/<id>.json:
    {"id", "source", "sha256", "pageCount", "author", "pages": [[paragraph, ...], ...]}

The publication pages show this text so search engines and AI assistants can read and
quote it. The JSON is rewritten only when the PDF changes (sha256), and text files whose
PDF is gone are removed. Runs in the Drive sync workflow; safe to run locally:

    python ops/drive-sync/extract_text.py            # update what changed
    python ops/drive-sync/extract_text.py --check    # exit 1 if anything is missing or stale
"""
import hashlib
import json
import re
import sys
from collections import Counter
from pathlib import Path

import pymupdf

ROOT = Path(__file__).resolve().parents[2]
LIBRARIES = ["presentations", "newsletters", "founder-reports"]
GENERIC_AUTHORS = {"", "user", "admin", "author", "unknown", "microsoft office user", "owner", "ais", "canva"}


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1 << 20), b""):
            digest.update(chunk)
    return digest.hexdigest()


def clean(text: str) -> str:
    text = text.replace("­", "").replace("ﬁ", "fi").replace("ﬂ", "fl")
    text = re.sub(r"-\n(?=[a-z])", "", text)  # rejoin words hyphenated at a line break
    text = re.sub(r"\s*\n\s*", " ", text)
    return re.sub(r"[ \t ]+", " ", text).strip()


def page_paragraphs(page) -> list[str]:
    paragraphs = []
    for block in page.get_text("blocks", sort=True):
        if block[6] != 0:  # 0 = text block, 1 = image
            continue
        text = clean(block[4])
        if not text or re.fullmatch(r"[\d\s/|.]+", text):  # page numbers and separators
            continue
        paragraphs.append(text)
    return paragraphs


def extract(pdf: Path) -> dict:
    with pymupdf.open(pdf) as doc:
        pages = [page_paragraphs(page) for page in doc]
        author = (doc.metadata or {}).get("author", "") or ""
    # Drop running headers and footers: short lines repeated on most pages of longer documents.
    if len(pages) >= 4:
        counts = Counter(p for page in pages for p in set(page) if len(p) <= 80)
        repeated = {p for p, n in counts.items() if n >= max(3, len(pages) * 0.5)}
        pages = [[p for p in page if p not in repeated] for page in pages]
    author = author.strip()
    if author.lower() in GENERIC_AUTHORS or not re.fullmatch(r"[A-Za-zÀ-ÿ'.\- ]{3,60}", author) or " " not in author:
        author = ""
    return {"pageCount": len(pages), "author": author, "pages": pages}


def main() -> int:
    check_only = "--check" in sys.argv
    problems, written, removed = [], 0, 0
    for library in LIBRARIES:
        pdf_dir = ROOT / "public" / library / "pdf"
        text_dir = ROOT / "public" / library / "text"
        text_dir.mkdir(parents=True, exist_ok=True)
        ids = set()
        for pdf in sorted(pdf_dir.glob("*.pdf")):
            ids.add(pdf.stem)
            target = text_dir / f"{pdf.stem}.json"
            digest = sha256(pdf)
            try:
                current = json.loads(target.read_text("utf-8"))
            except (OSError, ValueError):
                current = None
            if current and current.get("sha256") == digest:
                continue
            if check_only:
                problems.append(f"{library}/{pdf.stem}: text {'stale' if current else 'missing'}")
                continue
            data = {"id": pdf.stem, "source": f"/{library}/pdf/{pdf.name}", "sha256": digest, **extract(pdf)}
            target.write_text(json.dumps(data, ensure_ascii=False, separators=(",", ":")) + "\n", "utf-8")
            written += 1
        for orphan in text_dir.glob("*.json"):
            if orphan.stem not in ids:
                if check_only:
                    problems.append(f"{library}/{orphan.stem}: text without a PDF")
                else:
                    orphan.unlink()
                    removed += 1
    if check_only:
        print("\n".join(problems) or "All publication text files are present and current.")
        return 1 if problems else 0
    print(f"Publication text: {written} written, {removed} removed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
