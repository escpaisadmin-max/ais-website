#!/usr/bin/env python3
"""Stand-in for the qpdf command line, used only when apt cannot install qpdf.

The Drive sync installs qpdf with apt. GitHub's runners sometimes cannot reach the
Ubuntu package servers (11 Nov 2026: DNS failures for several minutes), which used to
fail the whole sync. In that case the workflow installs pikepdf from PyPI (it ships the
same qpdf library) and puts this script on PATH as `qpdf`.

It supports exactly the two calls optimize-pdf.py makes:
  qpdf --linearize --object-streams=generate --recompress-flate
       --compression-level=N --deterministic-id SOURCE TARGET
  qpdf --check FILE
Exit codes follow qpdf: 0 ok, 2 errors.
"""
import sys

import pikepdf


def main(argv):
    if argv[:1] == ["--check"] and len(argv) == 2:
        with pikepdf.open(argv[1]) as pdf:
            check = getattr(pdf, "check_pdf_syntax", None) or pdf.check  # renamed in pikepdf 10
            problems = list(check())
        for problem in problems:
            print(problem, file=sys.stderr)
        return 2 if problems else 0

    flags = [a for a in argv if a.startswith("--")]
    files = [a for a in argv if not a.startswith("--")]
    known = {"--linearize", "--object-streams=generate", "--recompress-flate", "--deterministic-id"}
    unknown = [f for f in flags if f not in known and not f.startswith("--compression-level=")]
    if unknown or len(files) != 2:
        print(f"qpdf-fallback: unsupported arguments {argv}", file=sys.stderr)
        return 2
    for flag in flags:
        if flag.startswith("--compression-level="):
            pikepdf.settings.set_flate_compression_level(int(flag.split("=", 1)[1]))
    source, target = files
    with pikepdf.open(source) as pdf:
        pdf.save(
            target,
            linearize="--linearize" in flags,
            object_stream_mode=pikepdf.ObjectStreamMode.generate,
            recompress_flate="--recompress-flate" in flags,
            deterministic_id="--deterministic-id" in flags,
        )
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
