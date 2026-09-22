"""Regression check: repeated images retain resolution at their largest use."""
import importlib.util
from pathlib import Path
import unittest

import pymupdf

spec = importlib.util.spec_from_file_location("optimize_pdf", Path(__file__).with_name("optimize-pdf.py"))
optimizer = importlib.util.module_from_spec(spec)
spec.loader.exec_module(optimizer)


class ImageOptimizationTest(unittest.TestCase):
    def test_shared_image_is_scaled_once_for_largest_placement(self):
        with pymupdf.open() as source:
            page = source.new_page(width=720, height=720)
            # A detailed image large enough to qualify for optimization.
            for n in range(180):
                page.draw_rect(pymupdf.Rect(n * 4, 0, n * 4 + 4, 720),
                               fill=((n % 17) / 17, (n % 11) / 11, (n % 7) / 7))
            image = page.get_pixmap(matrix=pymupdf.Matrix(3, 3)).tobytes("jpeg", jpg_quality=95)

        with pymupdf.open() as document:
            large = document.new_page(width=720, height=720)
            xref = large.insert_image(pymupdf.Rect(0, 0, 600, 600), stream=image)
            large.insert_text((20, 650), "Searchable text stays sharp.")
            large.insert_link({"kind": pymupdf.LINK_URI, "from": pymupdf.Rect(20, 630, 200, 660), "uri": "https://www.escpais.com"})
            for _ in range(8):
                document.new_page(width=720, height=720).insert_image(pymupdf.Rect(0, 0, 30, 30), xref=xref)
            expected = optimizer.contents(document)
            optimizer.optimize_images(document)
            optimized = document.extract_image(xref)
            self.assertGreaterEqual(optimized["width"], 600 * 110 / 72)
            self.assertLess(optimized["width"], 2160)
            self.assertEqual(optimizer.contents(document), expected)


if __name__ == "__main__":
    unittest.main()
