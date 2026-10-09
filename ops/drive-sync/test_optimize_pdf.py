"""Regression check: repeated images retain resolution at their largest use."""
import importlib.util
from pathlib import Path
import unittest
import xml.etree.ElementTree as ET

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


class DocumentTitleTest(unittest.TestCase):
    def test_title_update_preserves_authorship_content_links_and_rendering(self):
        for old_title in ["", "Presentations Slide Master and Guide"]:
            with self.subTest(old_title=old_title), pymupdf.open() as document:
                page = document.new_page()
                page.insert_text((40, 40), "AIS research")
                page.insert_link({"kind": pymupdf.LINK_URI, "from": pymupdf.Rect(40, 25, 130, 45), "uri": "https://www.escpais.com"})
                document.set_toc([[1, "Introduction", 1]])
                document.set_metadata({"title": old_title, "author": "Original author", "subject": "Existing subject"})
                page = document.reload_page(page)
                expected = optimizer.contents(document)
                pixels = page.get_pixmap().samples
                optimizer.set_document_title(document, "Deep Dive: Activist Hedge Funds")
                with pymupdf.open(stream=document.tobytes(), filetype="pdf") as saved:
                    self.assertEqual(saved.metadata["title"], "Deep Dive: Activist Hedge Funds")
                    self.assertEqual(saved.metadata["author"], "Original author")
                    self.assertEqual(saved.metadata["subject"], "Existing subject")
                    self.assertEqual(optimizer.contents(saved), expected)
                    self.assertEqual(saved[0].get_pixmap().samples, pixels)

    def test_stale_xmp_title_is_replaced_and_other_xmp_is_retained(self):
        with pymupdf.open() as document:
            document.new_page()
            document.set_xml_metadata('''<x:xmpmeta xmlns:x="adobe:ns:meta/">
              <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
                <rdf:Description xmlns:dc="http://purl.org/dc/elements/1.1/" dc:title="Old attribute">
                  <dc:title><rdf:Alt><rdf:li xml:lang="x-default">Old template</rdf:li></rdf:Alt></dc:title>
                  <dc:creator><rdf:Seq><rdf:li>Original author</rdf:li></rdf:Seq></dc:creator>
                </rdf:Description>
              </rdf:RDF></x:xmpmeta>''')
            title = "Buy & Build – Q2 2026"
            optimizer.set_document_title(document, title)
            with pymupdf.open(stream=document.tobytes(), filetype="pdf") as saved:
                self.assertEqual(saved.metadata["title"], title)
                root = ET.fromstring(saved.get_xml_metadata())
                titles = root.findall(".//{http://purl.org/dc/elements/1.1/}title")
                self.assertEqual(len(titles), 1)
                self.assertEqual("".join(titles[0].itertext()), title)
                self.assertIn("Original author", saved.get_xml_metadata())
                self.assertNotIn("Old attribute", saved.get_xml_metadata())


if __name__ == "__main__":
    unittest.main()
