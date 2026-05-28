"use client";

import { useMemo, useState, type ReactNode } from "react";
import type { Route } from "next";
import Link from "next/link";
import {
  alpha,
  Box,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SegmentIcon from "@mui/icons-material/Segment";
import { levelLabel } from "@/lib/utils";
import { brandIndigo, accentPurple } from "@/lib/theme";

type Lesson = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  sections: number;
  minutes: number;
};

type Filter = "all" | "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

const ACTIVE_PILL = "#7c5cff";
const ACTIVE_PILL_HOVER = "#6d4eef";

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "BEGINNER", label: "Beginner" },
  { value: "INTERMEDIATE", label: "Intermediate" },
  { value: "ADVANCED", label: "Advanced" },
];

const LEVEL_ORDER: Lesson["level"][] = [
  "BEGINNER",
  "INTERMEDIATE",
  "ADVANCED",
];

function levelTint(level: Lesson["level"], isDark: boolean) {
  switch (level) {
    case "BEGINNER":
      return {
        text: isDark ? "#4ade80" : "#16a34a",
        bg: isDark ? alpha("#4ade80", 0.12) : alpha("#16a34a", 0.1),
      };
    case "INTERMEDIATE":
      return {
        text: isDark ? "#60a5fa" : "#2563eb",
        bg: isDark ? alpha("#60a5fa", 0.12) : alpha("#2563eb", 0.1),
      };
    case "ADVANCED":
      return {
        text: isDark ? "#fbbf24" : "#d97706",
        bg: isDark ? alpha("#fbbf24", 0.12) : alpha("#d97706", 0.1),
      };
  }
}

export default function GrammarListClient({ lessons }: { lessons: Lesson[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const counts = useMemo(() => {
    const c: Record<Filter, number> = {
      all: lessons.length,
      BEGINNER: 0,
      INTERMEDIATE: 0,
      ADVANCED: 0,
    };
    for (const l of lessons) c[l.level]++;
    return c;
  }, [lessons]);

  const grouped = useMemo(() => {
    const g: Record<Lesson["level"], Lesson[]> = {
      BEGINNER: [],
      INTERMEDIATE: [],
      ADVANCED: [],
    };
    for (const l of lessons) g[l.level].push(l);
    return g;
  }, [lessons]);

  const showAll = filter === "all";
  const flatVisible = showAll
    ? []
    : lessons.filter((l) => l.level === filter);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minHeight: 0,
      }}
    >
      {/* Page header */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={1.75}
        sx={{ mb: 1, flexShrink: 0 }}
      >
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: 2,
            background: `linear-gradient(135deg, ${brandIndigo} 0%, ${accentPurple} 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            flexShrink: 0,
          }}
        >
          <MenuBookOutlinedIcon sx={{ fontSize: 22 }} />
        </Box>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 800,
            letterSpacing: "-0.02em",
            fontSize: { xs: "1.5rem", md: "1.75rem" },
          }}
        >
          Grammar
        </Typography>
      </Stack>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 2.5, fontSize: "0.875rem", ml: 7.5 }}
      >
        Short, focused lessons grouped by level.
      </Typography>

      {/* Filter pills */}
      <Stack
        direction="row"
        spacing={1}
        flexWrap="wrap"
        useFlexGap
        sx={{ mb: 3, flexShrink: 0 }}
      >
        {FILTERS.map((f) => (
          <FilterPill
            key={f.value}
            active={filter === f.value}
            onClick={() => setFilter(f.value)}
          >
            <span>{f.label}</span>
            <PillCount active={filter === f.value}>{counts[f.value]}</PillCount>
          </FilterPill>
        ))}
      </Stack>

      {showAll ? (
        <Stack spacing={4}>
          {LEVEL_ORDER.map((lvl) =>
            grouped[lvl].length === 0 ? null : (
              <LevelSection
                key={lvl}
                level={lvl}
                count={grouped[lvl].length}
                lessons={grouped[lvl]}
              />
            ),
          )}
        </Stack>
      ) : (
        <CardGrid lessons={flatVisible} />
      )}
    </Box>
  );
}

function LevelSection({
  level,
  count,
  lessons,
}: {
  level: Lesson["level"];
  count: number;
  lessons: Lesson[];
}) {
  const theme = useTheme();
  const tint = levelTint(level, theme.palette.mode === "dark");
  return (
    <Box>
      <Stack
        direction="row"
        alignItems="center"
        spacing={1.25}
        sx={{ mb: 1.75 }}
      >
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            bgcolor: tint.text,
          }}
        />
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "0.9375rem",
            letterSpacing: "-0.01em",
          }}
        >
          {levelLabel(level)}
        </Typography>
        <Typography
          sx={{
            fontSize: "0.8125rem",
            color: "text.disabled",
            fontWeight: 600,
          }}
        >
          · {count} {count === 1 ? "lesson" : "lessons"}
        </Typography>
      </Stack>
      <CardGrid lessons={lessons} />
    </Box>
  );
}

function CardGrid({ lessons }: { lessons: Lesson[] }) {
  if (lessons.length === 0) {
    return (
      <Box
        sx={{
          py: 6,
          px: 3,
          textAlign: "center",
          bgcolor: "background.paper",
          borderRadius: 2.5,
          border: 1,
          borderColor: "divider",
        }}
      >
        <Typography color="text.secondary">
          No lessons at this level yet.
        </Typography>
      </Box>
    );
  }
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "1fr 1fr",
          lg: "repeat(3, 1fr)",
        },
        gap: 2,
        alignItems: "stretch",
      }}
    >
      {lessons.map((lesson) => (
        <GrammarCard key={lesson.id} lesson={lesson} />
      ))}
    </Box>
  );
}

function GrammarCard({ lesson }: { lesson: Lesson }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const tint = levelTint(lesson.level, isDark);

  return (
    <Box
      component={Link}
      href={`/grammar/${lesson.slug}` as Route}
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        bgcolor: "background.paper",
        borderRadius: 3,
        border: 1,
        borderColor: "divider",
        textDecoration: "none",
        color: "inherit",
        p: 2.5,
        overflow: "hidden",
        transition:
          "border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease",
        "&::before": {
          content: '""',
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 3,
          background: `linear-gradient(180deg, ${brandIndigo}, ${accentPurple})`,
          opacity: 0,
          transition: "opacity 0.2s ease",
        },
        "&:hover": {
          borderColor: alpha(brandIndigo, isDark ? 0.4 : 0.28),
          boxShadow: isDark ? "none" : `0 6px 22px ${alpha("#0f172a", 0.06)}`,
          transform: "translateY(-1px)",
          "&::before": { opacity: 1 },
          "& .grammar-arrow": {
            opacity: 1,
            transform: "translateX(2px)",
          },
        },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 1.5 }}
      >
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 0.5,
            px: 1.25,
            py: 0.375,
            borderRadius: 999,
            bgcolor: tint.bg,
            color: tint.text,
            fontSize: "0.6875rem",
            fontWeight: 700,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          {levelLabel(lesson.level)}
        </Box>
        <ArrowForwardIcon
          className="grammar-arrow"
          sx={{
            fontSize: 18,
            color: brandIndigo,
            opacity: 0.4,
            transform: "translateX(0)",
            transition: "opacity 0.2s, transform 0.2s",
          }}
        />
      </Stack>

      <Typography
        sx={{
          fontWeight: 700,
          fontSize: "1.0625rem",
          lineHeight: 1.3,
          color: "text.primary",
          letterSpacing: "-0.01em",
          mb: 0.75,
        }}
      >
        {lesson.title}
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          lineHeight: 1.55,
          fontSize: "0.8125rem",
          mb: 2,
        }}
      >
        {lesson.summary}
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        spacing={1.5}
        sx={{
          mt: "auto",
          pt: 1.5,
          borderTop: 1,
          borderColor: "divider",
          color: "text.disabled",
          fontSize: "0.75rem",
          fontWeight: 600,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <SegmentIcon sx={{ fontSize: 14 }} />
          <span>
            {lesson.sections} {lesson.sections === 1 ? "section" : "sections"}
          </span>
        </Stack>
        <Box
          sx={{
            width: 3,
            height: 3,
            borderRadius: "50%",
            bgcolor: "text.disabled",
          }}
        />
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <AccessTimeIcon sx={{ fontSize: 14 }} />
          <span>{lesson.minutes} min read</span>
        </Stack>
      </Stack>
    </Box>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  return (
    <Box
      component="button"
      type="button"
      onClick={onClick}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.75,
        px: 2,
        py: 0.875,
        borderRadius: 999,
        fontSize: "0.875rem",
        fontWeight: 600,
        cursor: "pointer",
        border: 0,
        fontFamily: "inherit",
        transition: "background-color 0.15s, color 0.15s",
        whiteSpace: "nowrap",
        ...(active
          ? {
              bgcolor: ACTIVE_PILL,
              color: "#fff",
              boxShadow: `0 8px 18px -8px ${alpha(ACTIVE_PILL, 0.65)}`,
              "&:hover": { bgcolor: ACTIVE_PILL_HOVER },
            }
          : {
              bgcolor: isDark ? alpha("#fff", 0.04) : alpha("#0f172a", 0.04),
              color: "text.secondary",
              "&:hover": {
                bgcolor: isDark
                  ? alpha("#fff", 0.08)
                  : alpha("#0f172a", 0.07),
                color: "text.primary",
              },
            }),
      }}
    >
      {children}
    </Box>
  );
}

function PillCount({
  active,
  children,
}: {
  active: boolean;
  children: ReactNode;
}) {
  return (
    <Box
      component="span"
      sx={{
        fontSize: "0.8125rem",
        fontWeight: 700,
        color: active ? "rgba(255, 255, 255, 0.85)" : "text.disabled",
      }}
    >
      {children}
    </Box>
  );
}
