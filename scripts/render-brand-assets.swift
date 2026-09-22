// Optional macOS asset authoring tool: swift scripts/render-brand-assets.swift
// PNGs are committed; website builds do not require Swift or macOS.
import AppKit

func render(_ source: String, to output: String, width: Int, height: Int, inset: CGFloat = 0) throws {
    let image = NSImage(contentsOfFile: source)!
    let bitmap = NSBitmapImageRep(bitmapDataPlanes: nil, pixelsWide: width, pixelsHigh: height, bitsPerSample: 8, samplesPerPixel: 4, hasAlpha: true, isPlanar: false, colorSpaceName: .deviceRGB, bytesPerRow: 0, bitsPerPixel: 0)!
    NSGraphicsContext.saveGraphicsState()
    NSGraphicsContext.current = NSGraphicsContext(bitmapImageRep: bitmap)
    NSColor(red: 30 / 255, green: 51 / 255, blue: 96 / 255, alpha: 1).setFill()
    NSRect(x: 0, y: 0, width: width, height: height).fill()
    let scale = min((CGFloat(width) - inset * 2) / image.size.width, (CGFloat(height) - inset * 2) / image.size.height)
    let size = NSSize(width: image.size.width * scale, height: image.size.height * scale)
    image.draw(in: NSRect(x: (CGFloat(width) - size.width) / 2, y: (CGFloat(height) - size.height) / 2, width: size.width, height: size.height), from: .zero, operation: .sourceOver, fraction: 1)
    NSGraphicsContext.restoreGraphicsState()
    try bitmap.representation(using: .png, properties: [:])!.write(to: URL(fileURLWithPath: output))
}

try render("scripts/social-preview.svg", to: "public/social-preview.png", width: 1200, height: 630)
try render("public/ais-logo-white.svg", to: "public/apple-touch-icon.png", width: 180, height: 180, inset: 20)
try render("public/ais-logo-white.svg", to: "public/favicon.png", width: 192, height: 192, inset: 21)
