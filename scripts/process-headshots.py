#!/usr/bin/env python3
"""Turn raw headshot uploads into consistent team-page photos.

Each photo is rotated upright (EXIF), cropped to the 3:4 portrait shape used by the
team cards around the detected face (head in the upper third), resized to 900x1200
and saved as a progressive JPEG in public/team/<slug>.jpg.

Usage:
  python3 scripts/process-headshots.py <mapping.csv>

mapping.csv has two columns without a header: <path to raw image>,<slug>
Requires Pillow and opencv-python (face detection falls back to a centred crop).
"""
import csv
import sys
from pathlib import Path

from PIL import Image, ImageOps

try:
    import cv2
    import numpy as np
except ImportError:  # Face detection is optional.
    cv2 = None

try:
    from pillow_heif import register_heif_opener
    register_heif_opener()
except ImportError:
    pass

OUT_DIR = Path(__file__).resolve().parent.parent / "public" / "team"
WIDTH, HEIGHT = 900, 1200
RATIO = WIDTH / HEIGHT


def largest_face(image):
    if cv2 is None:
        return None
    gray = cv2.cvtColor(np.array(image.convert("RGB")), cv2.COLOR_RGB2GRAY)
    cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
    faces = cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=6, minSize=(60, 60))
    if len(faces) == 0:
        return None
    return max(faces, key=lambda f: f[2] * f[3])


def crop_box(image, face):
    w, h = image.size
    if face is None:
        # No face found: keep the top of the photo, where heads usually are.
        crop_w = min(w, h * RATIO)
        crop_h = crop_w / RATIO
        left = (w - crop_w) / 2
        top = max(0, min(h - crop_h, h * 0.05))
        return (left, top, left + crop_w, top + crop_h)
    fx, fy, fw, fh = face
    # The face should take roughly 38% of the crop height, centred, with its middle at 38% from the top.
    crop_h = min(h, max(fh / 0.38, fh * 1.8))
    crop_w = crop_h * RATIO
    if crop_w > w:
        crop_w = w
        crop_h = crop_w / RATIO
    cx = fx + fw / 2
    cy = fy + fh / 2
    left = min(max(0, cx - crop_w / 2), w - crop_w)
    top = min(max(0, cy - crop_h * 0.38), h - crop_h)
    return (left, top, left + crop_w, top + crop_h)


def process(src, slug):
    image = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
    face = largest_face(image)
    box = crop_box(image, face)
    out = image.crop(tuple(round(v) for v in box)).resize((WIDTH, HEIGHT), Image.LANCZOS)
    target = OUT_DIR / f"{slug}.jpg"
    out.save(target, "JPEG", quality=82, optimize=True, progressive=True)
    return target, face is not None


def main():
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    with open(sys.argv[1], newline="", encoding="utf-8") as handle:
        for src, slug in csv.reader(handle):
            target, found = process(src, slug)
            print(f"{slug}: {target.stat().st_size // 1024} KB, face {'found' if found else 'NOT found, check crop'}")


if __name__ == "__main__":
    main()
