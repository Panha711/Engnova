"use client";

import { useEffect, useState, useTransition } from "react";
import {
  Alert,
  alpha,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
  LinearProgress,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { recordRandomQuizAttempt, submitQuiz } from "@/actions/quiz";

export type QuizAnswer = { id: string; text: string };
export type QuizQuestion = {
  id: string;
  prompt: string;
  context?: string | null;
  /** When present, scoring is done client-side and no Quiz row is required. */
  correctAnswerId?: string;
  answers: QuizAnswer[];
};

type Props = {
  /** Stored Quiz id (omit for client-scored random quizzes). */
  quizId?: string;
  title: string;
  description?: string | null;
  questions: QuizQuestion[];
  /** Called when the user wants a fresh quiz (random mode only). */
  onRegenerate?: () => void;
};

type ResultBreakdownItem = {
  questionId: string;
  selectedId: string | null;
  correctAnswerId: string | null;
  isCorrect: boolean;
};

type Result = {
  score: number;
  total: number;
  percentage: number;
  breakdown: ResultBreakdownItem[];
};

function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function QuizRunner({
  quizId,
  title,
  description,
  questions,
  onRegenerate,
}: Props) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [shuffleKey, setShuffleKey] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState(questions);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Shuffle only on the client to avoid SSR/hydration mismatch.
  useEffect(() => {
    setShuffledQuestions(
      shuffle(questions).map((q) => ({
        ...q,
        answers: shuffle(q.answers),
      })),
    );
    setCurrentIndex(0);
  }, [questions, shuffleKey]);

  const answered = Object.keys(answers).length;
  const progress = (answered / Math.max(shuffledQuestions.length, 1)) * 100;
  const currentQuestion = shuffledQuestions[currentIndex];
  const isLastQuestion = currentIndex === shuffledQuestions.length - 1;
  const isFirstQuestion = currentIndex === 0;
  const currentAnswered =
    currentQuestion && answers[currentQuestion.id] !== undefined;

  function selectAnswer(questionId: string, answerId: string) {
    setAnswers((a) => ({ ...a, [questionId]: answerId }));
  }

  function next() {
    setError(null);
    if (!currentAnswered) {
      setError("Please choose an answer first.");
      return;
    }
    setCurrentIndex((i) => Math.min(i + 1, shuffledQuestions.length - 1));
  }

  function previous() {
    setError(null);
    setCurrentIndex((i) => Math.max(i - 1, 0));
  }

  function submit() {
    setError(null);
    if (answered < shuffledQuestions.length) {
      setError("Please answer every question before submitting.");
      return;
    }
    startTransition(async () => {
      try {
        const isRandom = shuffledQuestions.every(
          (q) => typeof q.correctAnswerId === "string",
        );
        if (isRandom) {
          // Client-side scoring for random quizzes.
          let correct = 0;
          const breakdown: ResultBreakdownItem[] = shuffledQuestions.map((q) => {
            const selectedId = answers[q.id] ?? null;
            const correctAnswerId = q.correctAnswerId ?? null;
            const isCorrect =
              !!correctAnswerId && selectedId === correctAnswerId;
            if (isCorrect) correct++;
            return { questionId: q.id, selectedId, correctAnswerId, isCorrect };
          });
          const total = shuffledQuestions.length;
          const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
          // Record the attempt for streak / progress; ignore failure.
          recordRandomQuizAttempt({ score: correct, total }).catch(() => {});
          setResult({ score: correct, total, percentage, breakdown });
          return;
        }

        if (!quizId) {
          setError("Quiz is misconfigured.");
          return;
        }
        const res = await submitQuiz({ quizId, answers });
        setResult(res);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Could not submit the quiz.");
      }
    });
  }

  function reset() {
    setAnswers({});
    setResult(null);
    setError(null);
    setCurrentIndex(0);
    setShuffleKey((k) => k + 1);
  }

  if (result) {
    return (
      <Card>
        <CardContent>
          <Stack spacing={3}>
            <Stack spacing={1} alignItems="flex-start">
              <Chip
                color={result.percentage >= 80 ? "success" : result.percentage >= 50 ? "info" : "warning"}
                label={`Score: ${result.score}/${result.total} · ${result.percentage}%`}
              />
              <Typography variant="h5">Results</Typography>
            </Stack>
            <Stack spacing={2}>
              {shuffledQuestions.map((q, i) => {
                const b = result.breakdown.find((x) => x.questionId === q.id);
                return (
                  <Card
                    key={q.id}
                    sx={{
                      border: `1px solid ${alpha("#0f172a", 0.08)}`,
                      bgcolor: alpha("#0f172a", 0.02),
                    }}
                  >
                    <CardContent>
                      <Stack direction="row" spacing={1} alignItems="flex-start">
                        {b?.isCorrect ? (
                          <CheckCircleIcon color="success" />
                        ) : (
                          <CancelIcon color="error" />
                        )}
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            Question {i + 1}
                          </Typography>
                          <Typography fontWeight={600}>{q.prompt}</Typography>
                          <Box sx={{ mt: 1 }}>
                            {q.answers.map((a) => {
                              const selected = b?.selectedId === a.id;
                              const correct = b?.correctAnswerId === a.id;
                              return (
                                <Typography
                                  key={a.id}
                                  variant="body2"
                                  sx={{
                                    color: correct
                                      ? "success.main"
                                      : selected
                                        ? "error.main"
                                        : "text.primary",
                                    fontWeight: correct || selected ? 600 : 400,
                                  }}
                                >
                                  {selected ? "•" : " "} {a.text}{" "}
                                  {correct && (
                                    <Typography
                                      component="span"
                                      variant="caption"
                                      color="success.main"
                                    >
                                      (correct)
                                    </Typography>
                                  )}
                                </Typography>
                              );
                            })}
                          </Box>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                );
              })}
            </Stack>
            <Stack direction="row" spacing={1} justifyContent="flex-end">
              {onRegenerate && (
                <Button variant="contained" onClick={onRegenerate}>
                  New random quiz
                </Button>
              )}
              <Button onClick={reset}>Try again</Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    );
  }

  return (
    <Stack spacing={2}>
      <Card>
        <CardContent>
          <Stack spacing={0.5}>
            <Typography variant="h6">{title}</Typography>
            {description && (
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            )}
          </Stack>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{ mt: 2, height: 6, borderRadius: 3 }}
          />
        </CardContent>
      </Card>

      {error && <Alert severity="error">{error}</Alert>}

      {currentQuestion && (
        <Card
          key={currentQuestion.id}
          sx={{
            border: `1px solid ${alpha("#0f172a", 0.08)}`,
          }}
        >
          <CardContent sx={{ p: 2.5 }}>
            <Typography variant="overline" color="primary">
              Question {currentIndex + 1} of {shuffledQuestions.length}
            </Typography>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, lineHeight: 1.35 }}>
              {currentQuestion.prompt}
            </Typography>
            {currentQuestion.context && (
              <Typography
                variant="body2"
                sx={{
                  mb: 2,
                  p: 2,
                  bgcolor: alpha("#0f172a", 0.03),
                  borderRadius: 2,
                  border: `1px solid ${alpha("#0f172a", 0.06)}`,
                  lineHeight: 1.6,
                }}
              >
                {currentQuestion.context}
              </Typography>
            )}
            <FormControl>
              <RadioGroup
                value={answers[currentQuestion.id] ?? ""}
                onChange={(e) => selectAnswer(currentQuestion.id, e.target.value)}
              >
                {currentQuestion.answers.map((a) => (
                  <FormControlLabel
                    key={a.id}
                    value={a.id}
                    control={<Radio />}
                    label={a.text}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </CardContent>
        </Card>
      )}

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Button onClick={previous} disabled={isFirstQuestion || pending}>
          Previous
        </Button>
        {isLastQuestion ? (
          <Button
            variant="contained"
            size="large"
            disabled={pending}
            onClick={submit}
          >
            {pending ? "Submitting…" : "Submit quiz"}
          </Button>
        ) : (
          <Button
            variant="contained"
            size="large"
            disabled={pending}
            onClick={next}
          >
            Next
          </Button>
        )}
      </Stack>
    </Stack>
  );
}
