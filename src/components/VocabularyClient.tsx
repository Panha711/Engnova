"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { Level } from "@prisma/client";
import type { Route } from "next";
import Link from "next/link";
import {
  alpha,
  Box,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";
import AddIcon from "@mui/icons-material/Add";
import Flashcard, { type FlashcardItem } from "./Flashcard";
import QuizRunner, { type QuizQuestion } from "./QuizRunner";
import SaveWordButton from "./SaveWordButton";
import AddWordDialog from "./AddWordDialog";
import { VOCABULARY_LEVELS } from "@/lib/utils";
import { brandIndigo, accentPurple } from "@/lib/theme";

type Word = FlashcardItem & { example?: string | null };

type Quiz = {
  id: string;
  title: string;
  description?: string | null;
  questions: QuizQuestion[];
};

type Mode = "words" | "flashcards" | "quiz" | "saved";

type Props = {
  level: Level;
  levelCounts: Record<Level, number>;
  words: Word[];
  savedWords: Word[];
  savedIds: string[];
  quizzesByLevel: Partial<Record<Level, Quiz>>;
};

const ACTIVE_PILL = "#7c5cff";
const ACTIVE_PILL_HOVER = "#6d4eef";

const khmerFont =
  'var(--font-khmer), var(--font-app), "Noto Sans Khmer", sans-serif';

export default function VocabularyClient({
  level,
  levelCounts,
  words,
  savedWords,
  savedIds,
  quizzesByLevel,
}: Props) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const primary = theme.palette.primary.main;
  const [mode, setMode] = useState<Mode>("words");
  const [quizLevel, setQuizLevel] = useState<Level>(level);
  const [search, setSearch] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const quiz = quizzesByLevel[quizLevel] ?? null;

  const sourceWords = mode === "saved" ? savedWords : words;

  const filtered = useMemo(() => {
    if (!search.trim()) return sourceWords;
    const q = search.toLowerCase();
    return sourceWords.filter(
      (w) =>
        w.word.toLowerCase().includes(q) ||
        w.meaning.toLowerCase().includes(q) ||
        (w.meaningKh?.toLowerCase().includes(q) ?? false),
    );
  }, [sourceWords, search]);

  const savedSet = new Set(savedIds);
  const listWords = filtered;
  const showSearch = mode === "words" || mode === "saved";

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
        sx={{ mb: 2.5, flexShrink: 0 }}
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
          Vocabulary
        </Typography>
      </Stack>

      {/* Filter pills + search */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems={{ xs: "stretch", md: "center" }}
        justifyContent="space-between"
        spacing={1.5}
        sx={{ mb: 2.5, flexShrink: 0 }}
      >
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {VOCABULARY_LEVELS.map((lvl) => {
            const isActiveLevel = mode === "words" && lvl.level === level;
            return (
              <FilterPillLink
                key={lvl.slug}
                href={`/vocabulary/${lvl.slug}` as Route}
                active={isActiveLevel}
                onClick={() => setMode("words")}
              >
                <span>{lvl.label}</span>
                <PillCount active={isActiveLevel}>
                  {levelCounts[lvl.level] ?? 0}
                </PillCount>
              </FilterPillLink>
            );
          })}
          <FilterPillButton
            active={mode === "saved"}
            onClick={() => setMode("saved")}
          >
            <span>Saved</span>
            <PillCount active={mode === "saved"}>{savedWords.length}</PillCount>
          </FilterPillButton>
          <FilterPillButton
            active={mode === "flashcards"}
            onClick={() => setMode("flashcards")}
          >
            <span>Cards</span>
          </FilterPillButton>
          <FilterPillButton
            active={mode === "quiz"}
            onClick={() => setMode("quiz")}
          >
            <span>Quiz</span>
          </FilterPillButton>
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ flexShrink: 0 }}
        >
          {showSearch && (
            <TextField
              placeholder="Search English · Khmer"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              size="small"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon
                        sx={{ fontSize: 18, color: "text.disabled" }}
                      />
                    </InputAdornment>
                  ),
                  endAdornment: search ? (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        aria-label="Clear search"
                        onClick={() => setSearch("")}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ) : null,
                },
              }}
              sx={{
                width: { xs: "100%", md: 240 },
                flexShrink: 0,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 10,
                  bgcolor: isDark
                    ? alpha("#fff", 0.04)
                    : alpha("#0f172a", 0.04),
                  fontSize: "0.875rem",
                  "& fieldset": { border: "none" },
                  "&:hover fieldset": { border: "none" },
                  "&.Mui-focused": {
                    bgcolor: isDark
                      ? alpha("#fff", 0.06)
                      : alpha("#0f172a", 0.06),
                    "& fieldset": {
                      border: `1px solid ${alpha(primary, 0.4)}`,
                    },
                  },
                },
              }}
            />
          )}
          <Box
            component="button"
            type="button"
            onClick={() => setAddOpen(true)}
            sx={{
              flexShrink: 0,
              display: "inline-flex",
              alignItems: "center",
              gap: 0.5,
              px: 2,
              py: 0.875,
              borderRadius: 999,
              border: 0,
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: "0.875rem",
              fontWeight: 700,
              color: "#fff",
              background: `linear-gradient(135deg, ${brandIndigo}, ${accentPurple})`,
              boxShadow: `0 8px 18px -8px ${alpha(ACTIVE_PILL, 0.65)}`,
              whiteSpace: "nowrap",
              transition: "opacity 0.15s",
              "&:hover": { opacity: 0.92 },
            }}
          >
            <AddIcon sx={{ fontSize: 18 }} />
            Add word
          </Box>
        </Stack>
      </Stack>

      <AddWordDialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
        defaultLevel={level}
      />

      {/* Content */}
      <Box className="vocabulary-scroll" sx={{ flex: 1, minHeight: 0 }}>
        {(mode === "words" || mode === "saved") &&
          (listWords.length === 0 ? (
            <EmptyState
              message={
                mode === "saved"
                  ? "No saved words yet. Tap the heart on a card to save one."
                  : search.trim()
                    ? `No words match “${search.trim()}”.`
                    : "No words at this level yet."
              }
            />
          ) : (
            <VocabularyWordGrid listWords={listWords} savedSet={savedSet} />
          ))}

        {mode === "flashcards" && (
          <Panel>
            <Flashcard items={filtered.length ? filtered : words} />
          </Panel>
        )}

        {mode === "quiz" && (
          <Stack spacing={2}>
            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              useFlexGap
              alignItems="center"
            >
              <Typography
                variant="body2"
                sx={{
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  color: "text.secondary",
                  mr: 0.5,
                }}
              >
                Choose level:
              </Typography>
              {VOCABULARY_LEVELS.map((lvl) => (
                <FilterPillButton
                  key={lvl.slug}
                  active={quizLevel === lvl.level}
                  onClick={() => setQuizLevel(lvl.level)}
                >
                  <span>{lvl.label}</span>
                </FilterPillButton>
              ))}
            </Stack>
            <Panel>
              {quiz ? (
                <QuizRunner
                  key={quiz.id}
                  quizId={quiz.id}
                  title={quiz.title}
                  description={quiz.description}
                  questions={quiz.questions}
                />
              ) : (
                <Typography color="text.secondary" textAlign="center" py={4}>
                  No quiz for this level yet.
                </Typography>
              )}
            </Panel>
          </Stack>
        )}
      </Box>
    </Box>
  );
}

function pillStyles(active: boolean, isDark: boolean) {
  return {
    display: "inline-flex",
    alignItems: "center",
    gap: 0.75,
    px: 2,
    py: 0.875,
    borderRadius: 50,
    fontSize: "0.875rem",
    fontWeight: 600,
    cursor: "pointer",
    textDecoration: "none",
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
            bgcolor: isDark ? alpha("#fff", 0.08) : alpha("#0f172a", 0.07),
            color: "text.primary",
          },
        }),
  } as const;
}

function FilterPillLink({
  href,
  active,
  onClick,
  children,
}: {
  href: Route;
  active: boolean;
  onClick?: () => void;
  children: ReactNode;
}) {
  const theme = useTheme();
  return (
    <Box
      component={Link}
      href={href}
      onClick={onClick}
      sx={pillStyles(active, theme.palette.mode === "dark")}
    >
      {children}
    </Box>
  );
}

function FilterPillButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  const theme = useTheme();
  return (
    <Box
      component="button"
      type="button"
      onClick={onClick}
      sx={pillStyles(active, theme.palette.mode === "dark")}
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

function Panel({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        p: { xs: 2, md: 3 },
        bgcolor: "background.paper",
        borderRadius: 1,
        border: 1,
        borderColor: "divider",
        boxShadow: (t) =>
          t.palette.mode === "dark"
            ? "none"
            : `0 4px 20px ${alpha("#0f172a", 0.05)}`,
      }}
    >
      {children}
    </Box>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <Box
      sx={{
        py: 8,
        px: 3,
        textAlign: "center",
        bgcolor: "background.paper",
        borderRadius: 1,
        border: 1,
        borderColor: "divider",
      }}
    >
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ maxWidth: 360, mx: "auto" }}
      >
        {message}
      </Typography>
    </Box>
  );
}

const wordGridSx = {
  display: "grid",
  gridTemplateColumns: {
    xs: "1fr",
    sm: "2fr 1fr",
    md: "repeat(3, 1fr)",
    lg: "repeat(3, 1fr)",
  },
  gap: 1.75,
  pb: 2,
  alignItems: "stretch",
} as const;

function VocabularyWordGrid({
  listWords,
  savedSet,
}: {
  listWords: Word[];
  savedSet: Set<string>;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Box sx={wordGridSx} aria-busy="true" aria-label="Loading vocabulary">
        {listWords.slice(0, 12).map((w) => (
          <Box
            key={w.id}
            className="vocabulary-word-skeleton"
            sx={{
              height: 140,
              bgcolor: "background.paper",
              borderRadius: 1,
              border: 1,
              borderColor: "divider",
            }}
          />
        ))}
      </Box>
    );
  }

  return (
    <Box sx={wordGridSx}>
      {listWords.map((w, index) => (
        <WordCard
          key={w.id}
          word={w}
          index={index + 1}
          saved={savedSet.has(w.id)}
        />
      ))}
    </Box>
  );
}

function WordCard({
  word,
  index,
  saved,
}: {
  word: Word;
  index: number;
  saved: boolean;
}) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const coral = isDark ? "#fca5a5" : "#dc2626";
  const meaningColor = isDark ? "#cbd5e1" : "#475569";
  const badgeBg = isDark ? alpha("#fff", 0.07) : alpha("#0f172a", 0.05);
  const badgeText = isDark ? "#cbd5e1" : "#475569";

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        bgcolor: "background.paper",
        borderRadius: 1,
        border: 1,
        borderColor: "divider",
        px: 2.5,
        py: 2,
        transition:
          "border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease",
        "&:hover": {
          borderColor: alpha(brandIndigo, isDark ? 0.4 : 0.28),
          boxShadow: isDark ? "none" : `0 6px 22px ${alpha("#0f172a", 0.06)}`,
          transform: "translateY(-1px)",
        },
      }}
    >
      <Stack direction="row" alignItems="flex-start" spacing={1.5}>
        <Box
          sx={{
            width: 28,
            height: 28,
            borderRadius: 1,
            bgcolor: badgeBg,
            color: badgeText,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.75rem",
            fontWeight: 700,
            fontVariantNumeric: "tabular-nums",
            flexShrink: 0,
            mt: 0.25,
          }}
        >
          {index}
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            component="p"
            sx={{
              m: 0,
              fontWeight: 700,
              fontSize: "1.25rem",
              lineHeight: 1.2,
              color: "text.primary",
              letterSpacing: "-0.02em",
              wordBreak: "break-word",
              "&::first-letter": { textTransform: "uppercase" },
            }}
          >
            {word.word}
          </Typography>

          {word.meaningKh?.trim() ? (
            <Typography
              lang="km"
              component="p"
              className="vocabulary-kh"
              sx={{
                mt: 0.75,
                mb: 0,
                fontFamily: khmerFont,
                fontSize: "1rem",
                fontWeight: 500,
                lineHeight: 1.6,
                color: coral,
                wordBreak: "break-word",
              }}
            >
              {word.meaningKh}
            </Typography>
          ) : null}

          {word.meaning?.trim() ? (
            <Typography
              component="p"
              sx={{
                mt: 1,
                mb: 0,
                fontSize: "0.875rem",
                lineHeight: 1.6,
                color: meaningColor,
                wordBreak: "break-word",
              }}
            >
              {word.meaning}
            </Typography>
          ) : null}
        </Box>

        <Stack
          direction="row"
          alignItems="center"
          spacing={0.25}
          sx={{ flexShrink: 0, mt: -0.5, mr: -0.5 }}
        >
          <SpeakButton text={word.word} />
          <SaveWordButton
            vocabularyId={word.id}
            initialSaved={saved}
            variant="heart"
          />
        </Stack>
      </Stack>
    </Box>
  );
}

function SpeakButton({ text }: { text: string }) {
  function speak() {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }

  return (
    <Tooltip title="Listen">
      <IconButton
        onClick={speak}
        size="small"
        aria-label={`Pronounce ${text}`}
        sx={{
          color: "text.disabled",
          p: 0.5,
          "&:hover": {
            color: "primary.main",
            bgcolor: (t) => alpha(t.palette.primary.main, 0.08),
          },
        }}
      >
        <VolumeUpOutlinedIcon sx={{ fontSize: 20 }} />
      </IconButton>
    </Tooltip>
  );
}
