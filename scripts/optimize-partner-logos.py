"""Regenerate homepage logo variants from the preserved PNGs (requires Pillow)."""

import json
from pathlib import Path
import re
import subprocess
import xml.etree.ElementTree as ET

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "src/data/partners.js"
OUTPUT = ROOT / "public/logos/optimized"
partners = json.loads(subprocess.check_output([
    "node", "--input-type=module", "-e",
    'import {trackRecord,academicPartners} from "./src/data/partners.js";'
    'console.log(JSON.stringify([...trackRecord,...academicPartners]));',
], cwd=ROOT, text=True))
OUTPUT.mkdir(exist_ok=True)
source_text = DATA.read_text()
report = []

for partner in partners:
    path = ROOT / "public" / partner["logo"].lstrip("/")
    if path.suffix == ".svg":
        view_box = ET.parse(path).getroot().attrib["viewBox"].split()
        width, height = (int(float(value)) for value in view_box[2:])
        fields = f'logo: "{partner["logo"]}", logoWidth: {width}, logoHeight: {height}'
    else:
        source = ROOT / "public/logos" / f"{path.stem}.png"
        original = Image.open(source).convert("RGBA")
        width, height = original.size
        display_height = 40 * partner.get("scale", 1)
        target_height = min(height, round(display_height * 2))
        target_width = round(width * target_height / height)
        target = OUTPUT / f"{source.stem}.webp"
        size = (target_width, target_height)
        colours = {pixel[:3] for pixel in original.get_flattened_data() if pixel[3]}
        if len(colours) == 1:
            # Preserve the exact solid logo colour while resampling its edges.
            resized = Image.new("RGBA", size, (*next(iter(colours)), 255))
            resized.putalpha(original.getchannel("A").resize(size, Image.Resampling.LANCZOS))
        else:
            resized = original.resize(size, Image.Resampling.LANCZOS)
        resized.save(target, "WEBP", lossless=True, quality=100, method=6, exact=True)
        with Image.open(target) as decoded:
            assert decoded.convert("RGBA").tobytes() == resized.tobytes(), f"Lossless mismatch: {target}"
        output_path = "/" + str(target.relative_to(ROOT / "public"))
        fields = f'logo: "{output_path}", logoWidth: {width}, logoHeight: {height}'
        report.append({
            "id": partner["id"], "name": partner["name"], "source": "/logos/" + source.name,
            "original_width": width, "original_height": height,
            "display_height": display_height, "original_bytes": source.stat().st_size,
            "optimized_path": output_path, "optimized_width": target_width,
            "optimized_height": target_height, "optimized_bytes": target.stat().st_size,
        })
    pattern = rf'(\{{ id: "{re.escape(partner["id"])}", name: "[^"]+", )logo:.*?(, eventSlug:)'
    source_text, replacements = re.subn(pattern, lambda match: match[1] + fields + match[2], source_text)
    assert replacements == 1, f"Expected one data entry for {partner['id']}"

DATA.write_text(source_text)
print(json.dumps(report, indent=2))
