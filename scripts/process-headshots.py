#!/usr/bin/env python3
"""Turn raw headshot uploads into consistent team-page photos.

Each photo is rotated upright (EXIF), cropped to the 3:4 portrait shape used by the
team cards, resized to 900x1200 and saved as a progressive JPEG in public/team/<slug>.jpg.

Faces are aligned by the eyes, so every card in a row shows the eyes at the same height
and at the same size:
  - the eye line sits at EYE_LINE (34%) of the card height;
  - the distance between the eyes is EYE_SPACING (19%) of the card width.
If the original doesn't reach far enough (for example it ends at the shoulders), the eye
line may move between 32% and 36%; after that the crop gets tighter and the face larger,
by at most 15%. A photo that still doesn't fit should be replaced with a less tightly framed one.

Usage:
  python3 scripts/process-headshots.py <mapping.csv>

mapping.csv has no header: <path to raw image>,<slug>[,<output file name, default <slug>.jpg>]
Requires Pillow and opencv-python 4.x. The YuNet face model (scripts/models/) gives the
eye positions; without it the script falls back to a Haar face box, which is less exact.
Check the result visually: a wrong detection (a face in the background, a hand) breaks the crop.
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

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "public" / "team"
YUNET = Path(__file__).resolve().parent / "models" / "face_detection_yunet_2023mar.onnx"
WIDTH, HEIGHT = 900, 1200
RATIO = WIDTH / HEIGHT
EYE_LINE = 0.34
EYE_LINE_RANGE = (0.32, 0.36)
EYE_SPACING = 0.19
MAX_TIGHTEN = 1.15


def detect_eyes(image):
    """Return (eye_x, eye_y, eye_distance) in image pixels, or None."""
    if cv2 is None:
        return None
    w, h = image.size
    scale = min(1.0, 1000 / max(w, h))
    small = image.resize((max(1, int(w * scale)), max(1, int(h * scale))))
    bgr = cv2.cvtColor(np.array(small), cv2.COLOR_RGB2BGR)
    if YUNET.exists() and hasattr(cv2, "FaceDetectorYN"):
        detector = cv2.FaceDetectorYN.create(str(YUNET), "", (bgr.shape[1], bgr.shape[0]), 0.7)
        _, faces = detector.detect(bgr)
        if faces is not None and len(faces):
            f = max(faces, key=lambda r: r[2] * r[3]) / scale
            rx, ry, lx, ly = f[4:8]
            return (rx + lx) / 2, (ry + ly) / 2, float(np.hypot(lx - rx, ly - ry))
    if hasattr(cv2, "CascadeClassifier") and hasattr(cv2, "data"):
        # Fallback: estimate the eyes from a Haar face box (eyes at about 40% of its height, 40% of its width apart).
        gray = cv2.cvtColor(bgr, cv2.COLOR_BGR2GRAY)
        cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
        faces = cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=6, minSize=(40, 40))
        if len(faces):
            fx, fy, fw, fh = (v / scale for v in max(faces, key=lambda r: r[2] * r[3]))
            return fx + fw / 2, fy + fh * 0.4, fw * 0.4
    return None


def crop_box(image, eyes):
    w, h = image.size
    if eyes is None:
        # No face found: keep the top of the photo, where heads usually are.
        crop_w = min(w, h * RATIO)
        crop_h = crop_w / RATIO
        left = (w - crop_w) / 2
        top = max(0, min(h - crop_h, h * 0.05))
        return (left, top, left + crop_w, top + crop_h)
    ex, ey, spacing = eyes
    crop_w = spacing / EYE_SPACING
    crop_h = crop_w / RATIO
    lo, hi = EYE_LINE_RANGE
    # Largest crop (up to the ideal size) that stays inside the photo for a given eye line.
    def fits(line):
        return min(crop_h, ey / line, (h - ey) / (1 - line), w / RATIO)
    # Prefer the ideal eye line; move it within its range only if that allows a less tight crop.
    candidates = [lo + i * (hi - lo) / 20 for i in range(21)]
    line = max(candidates, key=lambda c: (round(fits(c), 3), -abs(c - EYE_LINE)))
    # Never zoom in more than MAX_TIGHTEN beyond the ideal size; past that, the eye line gives way instead
    # (such a photo has too little room around the head and should be replaced).
    crop_h = min(max(fits(line), crop_h / MAX_TIGHTEN), h, w / RATIO)
    crop_w = crop_h * RATIO
    left = min(max(0, ex - crop_w / 2), w - crop_w)
    top = min(max(0, ey - line * crop_h), h - crop_h)
    return (left, top, left + crop_w, top + crop_h)


def process(src, slug, out_name=None):
    image = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
    eyes = detect_eyes(image)
    box = crop_box(image, eyes)
    out = image.crop(tuple(round(v) for v in box)).resize((WIDTH, HEIGHT), Image.LANCZOS)
    target = OUT_DIR / (out_name or f"{slug}.jpg")
    out.save(target, "JPEG", quality=82, optimize=True, progressive=True)
    return target, eyes is not None, box


def main():
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    with open(sys.argv[1], newline="", encoding="utf-8") as handle:
        for row in csv.reader(handle):
            src, slug = row[0], row[1]
            out_name = row[2] if len(row) > 2 and row[2] else None
            target, found, box = process(src, slug, out_name)
            upscale = WIDTH / (box[2] - box[0])
            note = f", upscaled {upscale:.1f}x" if upscale > 1.5 else ""
            print(f"{slug}: {target.stat().st_size // 1024} KB, face {'found' if found else 'NOT found, check crop'}{note}")


if __name__ == "__main__":
    main()
