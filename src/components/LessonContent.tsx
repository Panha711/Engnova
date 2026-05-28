import { Box, Typography } from "@mui/material";

// Tiny markdown subset: headings (## / ###), **bold**, *italic*,
// paragraphs, lists, tables, and blockquotes (lines starting with "> ").
function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**")) {
      return (
        <Box
          key={i}
          component="strong"
          sx={{
            fontWeight: 700,
            color: "primary.main",
          }}
        >
          {p.slice(2, -2)}
        </Box>
      );
    }
    if (p.startsWith("*") && p.endsWith("*") && p.length > 2) {
      return (
        <Box key={i} component="em" sx={{ fontStyle: "italic" }}>
          {p.slice(1, -1)}
        </Box>
      );
    }
    return <span key={i}>{p}</span>;
  });
}

function parseTableRow(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((c) => c.trim());
}

function isTableSeparator(line: string): boolean {
  return /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line.trim());
}

// "1. Conditional Simple" → { num: "1", rest: "Conditional Simple" }
function splitNumberedHeading(text: string): { num?: string; rest: string } {
  const m = text.match(/^(\d+)\.\s+(.+)$/);
  if (m) return { num: m[1], rest: m[2] };
  return { rest: text };
}

export default function LessonContent({ content }: { content: string }) {
  const lines = content.split(/\r?\n/);
  const out: React.ReactNode[] = [];
  let list: string[] | null = null;
  let table: { header: string[]; rows: string[][] } | null = null;
  let quote: string[] | null = null;

  const flushList = () => {
    if (list && list.length) {
      out.push(
        <Box
          component="ul"
          key={`ul-${out.length}`}
          sx={{
            listStyle: "none",
            pl: 0,
            my: 1.5,
            "& li": {
              position: "relative",
              pl: 2.5,
              mb: 0.75,
              "&::before": {
                content: '""',
                position: "absolute",
                left: 6,
                top: "0.65em",
                width: 6,
                height: 6,
                borderRadius: "50%",
                bgcolor: "primary.main",
                opacity: 0.4,
              },
            },
          }}
        >
          {list.map((it, i) => (
            <li key={i}>
              <Typography
                component="span"
                sx={{ lineHeight: 1.75, fontSize: "1rem" }}
              >
                {renderInline(it)}
              </Typography>
            </li>
          ))}
        </Box>,
      );
    }
    list = null;
  };

  const flushQuote = () => {
    if (!quote || !quote.length) {
      quote = null;
      return;
    }
    const text = quote.join(" ");
    out.push(
      <Box
        key={`q-${out.length}`}
        sx={{
          my: 2.5,
          pl: 2,
          borderLeft: 3,
          borderColor: "primary.main",
          opacity: 0.85,
        }}
      >
        <Typography
          sx={{
            lineHeight: 1.7,
            fontSize: "0.9375rem",
            color: "text.secondary",
            fontStyle: "italic",
          }}
        >
          {renderInline(text)}
        </Typography>
      </Box>,
    );
    quote = null;
  };

  const flushTable = () => {
    if (!table) return;
    const t = table;
    out.push(
      <Box
        key={`tbl-${out.length}`}
        sx={{
          my: 2.5,
          overflowX: "auto",
          border: 1,
          borderColor: "divider",
          borderRadius: 2,
        }}
      >
        <Box
          component="table"
          sx={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "0.875rem",
            "& th, & td": {
              p: 1.5,
              textAlign: "left",
              verticalAlign: "top",
              borderBottom: 1,
              borderColor: "divider",
            },
            "& tbody tr:last-of-type td": { borderBottom: 0 },
            "& th": {
              fontWeight: 700,
              bgcolor: "rgba(124, 92, 255, 0.08)",
              color: "primary.main",
              fontSize: "0.75rem",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            },
            "& tbody tr": {
              transition: "background-color 0.15s",
            },
            "& tbody tr:hover": {
              bgcolor: "rgba(127, 127, 127, 0.04)",
            },
          }}
        >
          <thead>
            <tr>
              {t.header.map((h, i) => (
                <th key={i}>{renderInline(h)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {t.rows.map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={ci}>{renderInline(cell)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Box>
      </Box>,
    );
    table = null;
  };

  const flushAll = () => {
    flushList();
    flushTable();
    flushQuote();
  };

  lines.forEach((raw, i) => {
    const line = raw.trimEnd();

    // Blockquote
    if (line.startsWith("> ")) {
      flushList();
      flushTable();
      if (!quote) quote = [];
      quote.push(line.slice(2));
      return;
    }
    if (quote && line.trim() === "") {
      flushQuote();
      return;
    }
    if (quote) flushQuote();

    // Table
    const looksLikeTableRow = /^\s*\|.+\|\s*$/.test(line);
    if (looksLikeTableRow) {
      flushList();
      const cells = parseTableRow(line);
      const next = lines[i + 1] ?? "";
      if (!table && isTableSeparator(next)) {
        table = { header: cells, rows: [] };
        return;
      }
      if (table) {
        if (isTableSeparator(line)) return;
        table.rows.push(cells);
        return;
      }
    } else if (table) {
      flushTable();
    }

    if (line.startsWith("## ")) {
      flushAll();
      const { num, rest } = splitNumberedHeading(line.slice(3));
      out.push(
        <Box
          key={i}
          sx={{
            display: "flex",
            alignItems: "baseline",
            gap: 1.5,
            mt: 5,
            mb: 2,
            pb: 1.25,
            borderBottom: 1,
            borderColor: "divider",
            scrollMarginTop: 24,
          }}
        >
          {num && (
            <Box
              sx={{
                flexShrink: 0,
                width: 32,
                height: 32,
                borderRadius: 1.5,
                background:
                  "linear-gradient(135deg, #6366f1 0%, #7c5cff 100%)",
                color: "#fff",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: "0.875rem",
                alignSelf: "center",
              }}
            >
              {num}
            </Box>
          )}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              letterSpacing: "-0.015em",
              flex: 1,
            }}
          >
            {renderInline(rest)}
          </Typography>
        </Box>,
      );
    } else if (line.startsWith("### ")) {
      flushAll();
      out.push(
        <Typography
          key={i}
          variant="h6"
          sx={{
            mt: 3.5,
            mb: 1.25,
            fontWeight: 700,
            fontSize: "1.0625rem",
            letterSpacing: "-0.01em",
            color: "text.primary",
          }}
        >
          {renderInline(line.slice(4))}
        </Typography>,
      );
    } else if (line.startsWith("- ")) {
      if (!list) list = [];
      list.push(line.slice(2));
    } else if (line.trim() === "") {
      flushList();
    } else {
      flushList();
      out.push(
        <Typography
          key={i}
          variant="body1"
          sx={{
            my: 1.25,
            lineHeight: 1.75,
            fontSize: "1rem",
          }}
        >
          {renderInline(line)}
        </Typography>,
      );
    }
  });
  flushAll();

  return (
    <Box
      sx={{
        color: "text.primary",
        "& > :first-of-type": { mt: 0 },
      }}
    >
      {out}
    </Box>
  );
}
