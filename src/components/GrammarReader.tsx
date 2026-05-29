"use client";

import { useRef, type ReactNode } from "react";
import { Box } from "@mui/material";
import LessonTOC from "./LessonTOC";
import type { LessonHeading } from "@/lib/lessonHeadings";

type Props = {
  header: ReactNode;
  children: ReactNode;
  headings: LessonHeading[];
};

export default function GrammarReader({ header, children, headings }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <Box
      sx={{
        flex: 1,
        minHeight: 0,
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          lg: "minmax(0, 1fr) 220px",
        },
        gap: { xs: 0, lg: 6 },
        alignItems: "start",
      }}
    >
      {/* Main column: fixed header + scrollable content */}
      <Box
        sx={{
          minWidth: 0,
          maxWidth: 720,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
        }}
      >
        <Box sx={{ flexShrink: 0, pb: 3 }}>{header}</Box>
        <Box
          ref={scrollRef}
          sx={{
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            pr: { xs: 0, md: 1 },
            // subtle scrollbar
            "&::-webkit-scrollbar": { width: 8 },
            "&::-webkit-scrollbar-thumb": {
              bgcolor: (t) =>
                t.palette.mode === "dark"
                  ? "rgba(255,255,255,0.08)"
                  : "rgba(15,23,42,0.12)",
              borderRadius: 4,
            },
            "&::-webkit-scrollbar-thumb:hover": {
              bgcolor: (t) =>
                t.palette.mode === "dark"
                  ? "rgba(255,255,255,0.14)"
                  : "rgba(15,23,42,0.2)",
            },
          }}
        >
          {children}
        </Box>
      </Box>

      {/* Right rail TOC — desktop only */}
      {headings.length > 0 && (
        <Box
          sx={{
            display: { xs: "none", lg: "block" },
            position: "sticky",
            top: 0,
          }}
        >
          <LessonTOC headings={headings} scrollRoot={scrollRef} />
        </Box>
      )}
    </Box>
  );
}
