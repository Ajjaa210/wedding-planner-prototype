import CoreText
import Foundation

struct Block {
    let text: String
    let level: Int
    let isTableRow: Bool
}

func cleanInlineMarkdown(_ source: String) -> String {
    var value = source
    if let expression = try? NSRegularExpression(pattern: #"\[([^\]]+)\]\(([^)]+)\)"#) {
        let range = NSRange(value.startIndex..., in: value)
        value = expression.stringByReplacingMatches(in: value, range: range, withTemplate: "$1 ($2)")
    }
    return value
        .replacingOccurrences(of: "**", with: "")
        .replacingOccurrences(of: "__", with: "")
        .replacingOccurrences(of: "`", with: "")
        .replacingOccurrences(of: "*", with: "")
}

func parseTableCells(_ line: String) -> [String] {
    line.trimmingCharacters(in: .whitespacesAndNewlines)
        .trimmingCharacters(in: CharacterSet(charactersIn: "|"))
        .components(separatedBy: "|")
        .map { cleanInlineMarkdown($0.trimmingCharacters(in: .whitespacesAndNewlines)) }
}

func parseMarkdown(_ markdown: String) -> [Block] {
    let lines = markdown.components(separatedBy: .newlines)
    var blocks: [Block] = []
    var paragraph: [String] = []
    var index = 0

    func flushParagraph() {
        let text = paragraph.joined(separator: " ").trimmingCharacters(in: .whitespacesAndNewlines)
        if !text.isEmpty { blocks.append(Block(text: cleanInlineMarkdown(text), level: 0, isTableRow: false)) }
        paragraph.removeAll()
    }

    while index < lines.count {
        let line = lines[index]
        let trimmed = line.trimmingCharacters(in: .whitespaces)

        if trimmed.hasPrefix("|") {
            flushParagraph()
            var rows: [[String]] = []
            while index < lines.count, lines[index].trimmingCharacters(in: .whitespaces).hasPrefix("|") {
                rows.append(parseTableCells(lines[index]))
                index += 1
            }
            if let headers = rows.first {
                for row in rows.dropFirst() where !row.allSatisfy({ $0.allSatisfy({ $0 == "-" || $0 == ":" || $0.isWhitespace }) }) {
                    let cells = headers.enumerated().compactMap { column, header -> String? in
                        guard column < row.count, !header.isEmpty, !row[column].isEmpty else { return nil }
                        return "\(header): \(row[column])"
                    }
                    if !cells.isEmpty {
                        blocks.append(Block(text: cells.joined(separator: "  ·  "), level: 0, isTableRow: true))
                    }
                }
            }
            continue
        }

        if trimmed.isEmpty || trimmed == "---" {
            flushParagraph()
            index += 1
            continue
        }

        if trimmed.hasPrefix("#") {
            flushParagraph()
            let level = trimmed.prefix(while: { $0 == "#" }).count
            let title = trimmed.drop(while: { $0 == "#" }).trimmingCharacters(in: .whitespaces)
            blocks.append(Block(text: cleanInlineMarkdown(String(title)), level: min(level, 4), isTableRow: false))
        } else if trimmed.hasPrefix(">") {
            flushParagraph()
            var quoteLines: [String] = []
            while index < lines.count, lines[index].trimmingCharacters(in: .whitespaces).hasPrefix(">") {
                let quoteLine = lines[index].trimmingCharacters(in: .whitespaces)
                quoteLines.append(String(quoteLine.dropFirst()).trimmingCharacters(in: .whitespaces))
                index += 1
            }
            let quote = cleanInlineMarkdown(quoteLines.joined(separator: " "))
            let quotedText = quote.hasPrefix("Evidence integrity:") ? "NOTE — \(quote)" : "“\(quote)”"
            blocks.append(Block(text: quotedText, level: 0, isTableRow: false))
            continue
        } else if trimmed.hasPrefix("- ") || trimmed.range(of: #"^\d+\.\s"#, options: .regularExpression) != nil {
            flushParagraph()
            let item = trimmed.hasPrefix("- ") ? String(trimmed.dropFirst(2)) : trimmed
            blocks.append(Block(text: "• \(cleanInlineMarkdown(item))", level: 0, isTableRow: false))
        } else {
            paragraph.append(trimmed)
            if line.hasSuffix("  ") { flushParagraph() }
        }
        index += 1
    }
    flushParagraph()
    return blocks
}

func makeAttributedText(_ blocks: [Block]) -> NSAttributedString {
    let output = NSMutableAttributedString()
    let fontKey = NSAttributedString.Key(kCTFontAttributeName as String)
    let colorKey = NSAttributedString.Key(kCTForegroundColorAttributeName as String)
    let bodyFont = CTFontCreateWithName("HelveticaNeue" as CFString, 10, nil)
    let tableFont = CTFontCreateWithName("HelveticaNeue" as CFString, 8.5, nil)
    let headingFonts = [
        CTFontCreateWithName("Georgia-Bold" as CFString, 23, nil),
        CTFontCreateWithName("Georgia" as CFString, 17, nil),
        CTFontCreateWithName("Georgia" as CFString, 13, nil),
        CTFontCreateWithName("HelveticaNeue-Bold" as CFString, 10.5, nil),
    ]
    let ink = CGColor(srgbRed: 0.20, green: 0.18, blue: 0.17, alpha: 1)
    let muted = CGColor(srgbRed: 0.34, green: 0.31, blue: 0.29, alpha: 1)
    let terracotta = CGColor(srgbRed: 0.59, green: 0.29, blue: 0.22, alpha: 1)

    for block in blocks {
        let font: CTFont
        let color: CGColor
        let spacing: String
        if block.level > 0 {
            font = headingFonts[min(block.level - 1, headingFonts.count - 1)]
            color = block.level <= 2 ? terracotta : ink
            spacing = block.level == 1 ? "\n\n" : "\n"
        } else {
            font = block.isTableRow ? tableFont : bodyFont
            color = block.isTableRow ? muted : ink
            spacing = "\n\n"
        }
        output.append(NSAttributedString(string: block.text + spacing, attributes: [
            fontKey: font,
            colorKey: color,
        ]))
    }
    return output
}

func renderPDF(_ attributedText: NSAttributedString, to outputURL: URL) throws -> Int {
    let pageWidth: CGFloat = 595.28
    let pageHeight: CGFloat = 841.89
    let fontKey = NSAttributedString.Key(kCTFontAttributeName as String)
    let colorKey = NSAttributedString.Key(kCTForegroundColorAttributeName as String)
    var mediaBox = CGRect(x: 0, y: 0, width: pageWidth, height: pageHeight)
    guard
        let consumer = CGDataConsumer(url: outputURL as CFURL),
        let context = CGContext(consumer: consumer, mediaBox: &mediaBox, nil)
    else {
        throw NSError(domain: "EvidencePDF", code: 1, userInfo: [NSLocalizedDescriptionKey: "Could not create the PDF file."])
    }

    let framesetter = CTFramesetterCreateWithAttributedString(attributedText)
    let textRect = CGRect(x: 48, y: 48, width: pageWidth - 96, height: pageHeight - 96)
    var location = 0
    var pageCount = 0
    while location < attributedText.length {
        context.beginPDFPage(nil)
        let path = CGMutablePath()
        path.addRect(textRect)
        let frame = CTFramesetterCreateFrame(
            framesetter,
            CFRange(location: location, length: 0),
            path,
            nil
        )
        CTFrameDraw(frame, context)
        let visibleRange = CTFrameGetVisibleStringRange(frame)
        guard visibleRange.length > 0 else {
            context.endPDFPage()
            throw NSError(domain: "EvidencePDF", code: 2, userInfo: [NSLocalizedDescriptionKey: "Text did not fit on the PDF page."])
        }
        location = visibleRange.location + visibleRange.length
        pageCount += 1

        let footer = NSAttributedString(
            string: "Shaadikipanchayat  ·  Project evidence  ·  \(pageCount)",
            attributes: [
                fontKey: CTFontCreateWithName("HelveticaNeue" as CFString, 8, nil),
                colorKey: CGColor(srgbRed: 0.51, green: 0.48, blue: 0.45, alpha: 1),
            ]
        )
        let footerLine = CTLineCreateWithAttributedString(footer)
        context.textPosition = CGPoint(x: 48, y: 24)
        CTLineDraw(footerLine, context)
        context.endPDFPage()
    }
    context.closePDF()
    return pageCount
}

guard CommandLine.arguments.count == 3 else {
    fputs("Usage: swift render-evidence-pdf.swift input.md output.pdf\n", stderr)
    exit(EXIT_FAILURE)
}

let inputURL = URL(fileURLWithPath: CommandLine.arguments[1]).standardizedFileURL
let outputURL = URL(fileURLWithPath: CommandLine.arguments[2]).standardizedFileURL
do {
    let markdown = try String(contentsOf: inputURL, encoding: .utf8)
    let blocks = parseMarkdown(markdown)
    let pageCount = try renderPDF(makeAttributedText(blocks), to: outputURL)
    print("Wrote \(outputURL.path) (\(pageCount) pages)")
} catch {
    fputs("PDF export failed: \(error)\n", stderr)
    exit(EXIT_FAILURE)
}
