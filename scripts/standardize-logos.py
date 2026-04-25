"""
Normalize partner logos so each PNG file has the same canvas dimensions
and the visible content sits inside a consistent inner box. This makes
every logo display at a similar visual size in the LogoBanner without
needing per-logo CSS scale factors.

Usage:
    python3 scripts/standardize-logos.py             # process all PNGs
    python3 scripts/standardize-logos.py NewLogo.png # process one file

Run this whenever you add a new logo to public/logos/.
"""
import os
import sys
from PIL import Image

LOGO_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "logos")

CANVAS_W = 600
CANVAS_H = 200
INNER_W = 560
INNER_H = 160


def standardize(path: str) -> None:
    img = Image.open(path).convert("RGBA")
    bbox = img.getbbox()
    if not bbox:
        print(f"SKIP {os.path.basename(path)}: no visible content")
        return
    content = img.crop(bbox)
    cw, ch = content.size
    scale = min(INNER_W / cw, INNER_H / ch)
    new_w = max(1, round(cw * scale))
    new_h = max(1, round(ch * scale))
    scaled = content.resize((new_w, new_h), Image.LANCZOS)

    canvas = Image.new("RGBA", (CANVAS_W, CANVAS_H), (0, 0, 0, 0))
    canvas.paste(scaled, ((CANVAS_W - new_w) // 2, (CANVAS_H - new_h) // 2), scaled)
    canvas.save(path, optimize=True)
    print(f"{os.path.basename(path):<30} content {cw}x{ch} → {new_w}x{new_h} on {CANVAS_W}x{CANVAS_H}")


def main() -> None:
    targets = sys.argv[1:]
    if targets:
        for name in targets:
            standardize(os.path.join(LOGO_DIR, name))
    else:
        for name in sorted(os.listdir(LOGO_DIR)):
            if name.endswith(".png") and not name.startswith("_"):
                standardize(os.path.join(LOGO_DIR, name))


if __name__ == "__main__":
    main()
