"use client";

import { useMemo, useState } from "react";
import { alpha, Box, Popover, Stack, Typography } from "@mui/material";

type Props = {
  text: string;
  highlight: string[];
};

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$1");
}

export default function ReadingViewer({ text, highlight }: Props) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const [active, setActive] = useState<string | null>(null);

  const regex = useMemo(() => {
    if (highlight.length === 0) return null;
    return new RegExp(`\\b(${highlight.map(escapeRegex).join("|")})\\b`, "gi");
  }, [highlight]);

  function renderParagraph(p: string, key: number) {
    if (!regex) {
      return (
        <Typography key={key} sx={{ my: 1.75, lineHeight: 1.85, fontSize: "1.05rem" }}>
          {p}
        </Typography>
      );
    }

    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    p.replace(regex, (match, _g, offset: number) => {
      if (offset > lastIndex) parts.push(p.slice(lastIndex, offset));
      parts.push(
        <Box
          key={`${key}-${offset}`}
          component="mark"
          onClick={(e) => {
            setActive(match.toLowerCase());
            setAnchor(e.currentTarget);
          }}
          sx={{
            cursor: "pointer",
            px: 0.5,
            borderRadius: 0.5,
            bgcolor: alpha("#0d9488", 0.2),
            color: "primary.dark",
            fontWeight: 600,
          }}
        >
          {match}
        </Box>,
      );
      lastIndex = offset + match.length;
      return match;
    });
    if (lastIndex < p.length) parts.push(p.slice(lastIndex));

    return (
      <Typography key={key} sx={{ my: 1.75, lineHeight: 1.85, fontSize: "1.05rem" }}>
        {parts}
      </Typography>
    );
  }

  const paragraphs = text.split(/\n\s*\n/).filter(Boolean);

  return (
    <Box>
      {paragraphs.map((p, i) => renderParagraph(p.trim(), i))}
      <Popover
        open={!!anchor}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Stack sx={{ p: 2, maxWidth: 260 }}>
          <Typography variant="subtitle2">{active}</Typography>
          <Typography variant="caption" color="text.secondary">
            Highlighted vocabulary — save it from the Vocabulary page.
          </Typography>
        </Stack>
      </Popover>
    </Box>
  );
}
