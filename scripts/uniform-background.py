#!/usr/bin/env python3
"""Give team photos the same soft grey studio background.

Run this after scripts/process-headshots.py, on the finished 900x1200 photos in public/team/.
Each person is cut out with BiRefNet (portrait model, via rembg), the edge colours are
cleaned with pymatting (so no dark or bright fringe from the old background), and the
person is placed on one shared background: light grey, brightest behind the head, a little
darker towards the corners. The page shows the photos in greyscale.

Usage:
  python3 scripts/uniform-background.py <slug> [<slug> ...]      # e.g. max-bruel
  python3 scripts/uniform-background.py --all
  python3 scripts/uniform-background.py --masks <dir> <slug>...   # reuse masks (<dir>/<slug>.png)

Requires: pip install "rembg[cpu]" pymatting pillow numpy
The BiRefNet model needs about 8 GB of RAM; on a small machine compute the masks on the
Mac Mini (Mini Compute, python recipe) and pass them with --masks.
Check every result by eye at full size: hair, glasses and light clothing on a light
background are where a cut-out can go wrong. The photo is overwritten in place; the
original stays in git history.
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image
from pymatting import estimate_foreground_ml

ROOT = Path(__file__).resolve().parent.parent
TEAM = ROOT / "public" / "team"
W, H = 900, 1200
CENTRE = (0.5, 0.36)       # brightest point, behind the head (fraction of width, height)
LIGHT, FALLOFF = 238, 26   # grey level at the centre, and how much darker the corners get


def background():
    yy, xx = np.mgrid[0:H, 0:W].astype(np.float64)
    d = np.sqrt(((xx - W * CENTRE[0]) / (W * 0.75)) ** 2 + ((yy - H * CENTRE[1]) / (H * 0.75)) ** 2)
    lum = (LIGHT - FALLOFF * np.clip(d, 0, 1) ** 1.6) / 255
    return np.repeat(lum[..., None], 3, axis=2)


def main():
    args = sys.argv[1:]
    mask_dir = None
    if args[:1] == ["--masks"]:
        mask_dir, args = Path(args[1]), args[2:]
    slugs = sorted(p.stem for p in TEAM.glob("*.jpg")) if args == ["--all"] else args
    if not slugs:
        sys.exit(__doc__)
    session = None
    bg = background()
    for slug in slugs:
        path = TEAM / f"{slug}.jpg"
        image = Image.open(path).convert("RGB")
        if image.size != (W, H):
            sys.exit(f"{slug}: expected {W}x{H}, run scripts/process-headshots.py first")
        if mask_dir:
            mask = Image.open(mask_dir / f"{slug}.png").convert("L")
        else:
            if session is None:
                from rembg import new_session
                session = new_session("birefnet-portrait")
            from rembg import remove
            mask = remove(image, session=session, only_mask=True)
        img = np.asarray(image, dtype=np.float64) / 255
        alpha = np.asarray(mask.resize((W, H), Image.LANCZOS), dtype=np.float64) / 255
        alpha = np.clip((alpha - 0.02) / 0.96, 0, 1)
        fg = estimate_foreground_ml(img, alpha)
        out = fg * alpha[..., None] + bg * (1 - alpha[..., None])
        Image.fromarray((np.clip(out, 0, 1) * 255 + 0.5).astype(np.uint8)).save(
            path, "JPEG", quality=82, optimize=True, progressive=True)
        print(f"{slug}: done")


if __name__ == "__main__":
    main()
