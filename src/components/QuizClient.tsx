"use client";

import { useState, useTransition, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import type { Route } from "next";
import {
  alpha,
  Box,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import type { Level } from "@prisma/client";
import QuizRunner, { type QuizQuestion } from "./QuizRunner";
import { generateRandomVocabQuiz, type RandomQuiz } from "@/actions/quiz";
import { VOCABULARY_LEVELS, vocabularySlugFromLevel } from "@/lib/utils";
import { brandIndigo, accentPurple } from "@/lib/theme";

type Props = {
  level: Level;
  initialQuiz: RandomQuiz;
};

const ACTIVE_PILL = "#7c5cff";
const ACTIVE_PILL_HOVER = "#6d4eef";

function toQuizQuestions(quiz: RandomQuiz): QuizQuestion[] {
  return quiz.questions.map((q) => ({
    id: q.id,
    prompt: q.prompt,
    context: q.context,
    correctAnswerId: q.correctAnswerId,
    answers: q.answers,
  }));
}

export default function QuizClient({ level, initialQuiz }: Props) {
  const router = useRouter();
  const [quiz, setQuiz] = useState<RandomQuiz>(initialQuiz);
  const [runnerKey, setRunnerKey] = useState(0);
  const [pending, startTransition] = useTransition();

  function regenerate() {
    startTransition(async () => {
      const fresh = await generateRandomVocabQuiz(level, 10);
      setQuiz(fresh);
      setRunnerKey((k) => k + 1);
    });
  }

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
          <QuizOutlinedIcon sx={{ fontSize: 22 }} />
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
          Quiz
        </Typography>
      </Stack>

      {/* Level pills */}
      <Stack
        direction="row"
        spacing={1}
        flexWrap="wrap"
        useFlexGap
        alignItems="center"
        sx={{ mb: 2.5, flexShrink: 0 }}
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
            active={level === lvl.level}
            onClick={() =>
              router.push(
                `/quiz/${vocabularySlugFromLevel(lvl.level)}` as Route,
              )
            }
          >
            <span>{lvl.label}</span>
          </FilterPillButton>
        ))}
      </Stack>

      {/* Quiz */}
      <Box className="vocabulary-scroll" sx={{ flex: 1, minHeight: 0, mr: -1, pr: 1 }}>
        <Panel>
          {quiz.questions.length > 0 ? (
            <QuizRunner
              key={runnerKey}
              title={quiz.title}
              description={
                pending ? "Loading a new random quiz…" : quiz.description
              }
              questions={toQuizQuestions(quiz)}
              onRegenerate={regenerate}
            />
          ) : (
            <Typography color="text.secondary" textAlign="center" py={4}>
              {quiz.description}
            </Typography>
          )}
        </Panel>
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
