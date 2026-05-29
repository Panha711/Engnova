"use client";

import { useMemo, useState } from "react";
import type { Route } from "next";
import Link from "next/link";
import {
  alpha,
  Box,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { parseLessonNumber } from "@/lib/lessonHeadings";

type Lesson = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  sections: number;
  minutes: number;
};

const LEVEL_ORDER: Lesson["level"][] = [
  "BEGINNER",
  "INTERMEDIATE",
  "ADVANCED",
];

const LEVEL_DOT: Record<Lesson["level"], string> = {
  BEGINNER: "#22c55e",
  INTERMEDIATE: "#3b82f6",
  ADVANCED: "#f59e0b",
};

const LEVEL_DISPLAY: Record<Lesson["level"], string> = {
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate (B1)",
  ADVANCED: "Advanced",
};

export default function GrammarListClient({ lessons }: { lessons: Lesson[] }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<Record<Lesson["level"], boolean>>({
    BEGINNER: true,
    INTERMEDIATE: true,
    ADVANCED: true,
  });

  const grouped = useMemo(() => {
    const q = query.trim().toLowerCase();
    const g: Record<Lesson["level"], Lesson[]> = {
      BEGINNER: [],
      INTERMEDIATE: [],
      ADVANCED: [],
    };
    for (const l of lessons) {
      if (
        q &&
        !l.title.toLowerCase().includes(q) &&
        !l.summary.toLowerCase().includes(q)
      ) {
        continue;
      }
      g[l.level].push(l);
    }
    return g;
  }, [lessons, query]);

  const totalVisible = LEVEL_ORDER.reduce(
    (acc, lvl) => acc + grouped[lvl].length,
    0,
  );

  return (
    <Box sx={{ maxWidth: 820, mx: "auto", width: "100%" }}>
      {/* Quiet, Notion-doc style header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          component="h1"
          sx={{
            fontWeight: 800,
            letterSpacing: "-0.025em",
            fontSize: { xs: "2rem", md: "2.5rem" },
            lineHeight: 1.1,
            mb: 1,
          }}
        >
          Grammar
        </Typography>
        <Typography
          color="text.secondary"
          sx={{ fontSize: "1rem", lineHeight: 1.6, maxWidth: 560 }}
        >
          Short, focused lessons grouped by level. Click a heading to collapse.
        </Typography>
      </Box>

      {/* Search */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search lessons…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: 18, color: "text.disabled" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              fontSize: "0.9375rem",
              borderRadius: 2,
              bgcolor: (t) =>
                t.palette.mode === "dark"
                  ? alpha("#fff", 0.03)
                  : alpha("#0f172a", 0.025),
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "divider",
            },
          }}
        />
      </Box>

      {totalVisible === 0 && query.trim() !== "" && (
        <Typography
          color="text.secondary"
          sx={{ py: 4, textAlign: "center", fontSize: "0.9375rem" }}
        >
          No lessons match &ldquo;{query}&rdquo;.
        </Typography>
      )}

      {/* Collapsible groups */}
      <Stack spacing={2.5}>
        {LEVEL_ORDER.map((lvl) => {
          const items = grouped[lvl];
          if (items.length === 0) return null;
          const isOpen = open[lvl];
          return (
            <Box key={lvl}>
              <Box
                component="button"
                type="button"
                onClick={() => setOpen((o) => ({ ...o, [lvl]: !o[lvl] }))}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.75,
                  width: "100%",
                  border: 0,
                  bgcolor: "transparent",
                  cursor: "pointer",
                  px: 0,
                  py: 1.25,
                  textAlign: "left",
                  color: "text.primary",
                  fontFamily: "inherit",
                  borderBottom: 1,
                  borderColor: "divider",
                }}
              >
                {isOpen ? (
                  <KeyboardArrowDownIcon
                    sx={{ fontSize: 18, color: "text.disabled" }}
                  />
                ) : (
                  <KeyboardArrowRightIcon
                    sx={{ fontSize: 18, color: "text.disabled" }}
                  />
                )}
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: LEVEL_DOT[lvl],
                    flexShrink: 0,
                  }}
                />
                <Typography
                  component="span"
                  sx={{
                    fontWeight: 700,
                    fontSize: "0.9375rem",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {LEVEL_DISPLAY[lvl]}
                </Typography>
                <Typography
                  component="span"
                  sx={{
                    ml: 0.5,
                    fontSize: "0.8125rem",
                    color: "text.disabled",
                    fontWeight: 500,
                  }}
                >
                  ({items.length})
                </Typography>
              </Box>

              {isOpen && (
                <Box sx={{ pt: 0.75 }}>
                  {items.map((l) => (
                    <LessonRow key={l.id} lesson={l} />
                  ))}
                </Box>
              )}
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}

function LessonRow({ lesson }: { lesson: Lesson }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { number, rest } = parseLessonNumber(lesson.title);
  const displayTitle = rest || lesson.title;

  return (
    <Box
      component={Link}
      href={`/grammar/${lesson.slug}` as Route}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        py: 1.125,
        px: 1.25,
        mx: -1.25,
        borderRadius: 1.5,
        textDecoration: "none",
        color: "inherit",
        cursor: "pointer",
        transition: "background-color 0.12s",
        "&:hover": {
          bgcolor: isDark ? alpha("#fff", 0.04) : alpha("#0f172a", 0.035),
          "& .lesson-title": { color: "primary.main" },
        },
      }}
    >
      <Box
        sx={{
          flexShrink: 0,
          minWidth: 28,
          fontSize: "0.75rem",
          fontWeight: 600,
          color: "text.disabled",
          fontVariantNumeric: "tabular-nums",
          letterSpacing: "0.02em",
        }}
      >
        {number ?? "·"}
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          className="lesson-title"
          sx={{
            fontSize: "0.9375rem",
            fontWeight: 600,
            letterSpacing: "-0.005em",
            transition: "color 0.12s",
            lineHeight: 1.45,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {displayTitle}
        </Typography>
        <Typography
          sx={{
            mt: 0.25,
            fontSize: "0.8125rem",
            color: "text.secondary",
            lineHeight: 1.45,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            display: { xs: "none", sm: "block" },
          }}
        >
          {lesson.summary}
        </Typography>
      </Box>
      <Stack
        direction="row"
        alignItems="center"
        spacing={0.5}
        sx={{
          flexShrink: 0,
          color: "text.disabled",
          fontSize: "0.75rem",
          fontWeight: 500,
          display: { xs: "none", md: "flex" },
        }}
      >
        <AccessTimeIcon sx={{ fontSize: 12 }} />
        <span>{lesson.minutes} min</span>
      </Stack>
    </Box>
  );
}
