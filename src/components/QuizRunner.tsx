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
import { submitQuiz } from "@/actions/quiz";

export type QuizAnswer = { id: string; text: string };
export type QuizQuestion = {
  id: string;
  prompt: string;
  context?: string | null;
  answers: QuizAnswer[];
};

type Props = {
  quizId: string;
  title: string;
  description?: string | null;
  questions: QuizQuestion[];
};

type Result = Awaited<ReturnType<typeof submitQuiz>>;

function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function QuizRunner({ quizId, title, description, questions }: Props) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [shuffleKey, setShuffleKey] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState(questions);

  // Shuffle only on the client to avoid SSR/hydration mismatch.
  useEffect(() => {
    setShuffledQuestions(
      shuffle(questions).map((q) => ({
        ...q,
        answers: shuffle(q.answers),
      })),
    );
  }, [questions, shuffleKey]);

  const answered = Object.keys(answers).length;
  const progress = (answered / Math.max(shuffledQuestions.length, 1)) * 100;

  function selectAnswer(questionId: string, answerId: string) {
    setAnswers((a) => ({ ...a, [questionId]: answerId }));
  }

  function submit() {
    setError(null);
    if (answered < shuffledQuestions.length) {
      setError("Please answer every question before submitting.");
      return;
    }
    startTransition(async () => {
      try {
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

      <Stack spacing={2}>
        {shuffledQuestions.map((q, i) => (
          <Card
            key={q.id}
            sx={{
              border: `1px solid ${alpha("#0f172a", 0.08)}`,
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="overline" color="primary">
                Question {i + 1} of {shuffledQuestions.length}
              </Typography>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, lineHeight: 1.35 }}>
                {q.prompt}
              </Typography>
              {q.context && (
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
                  {q.context}
                </Typography>
              )}
              <FormControl>
                <RadioGroup
                  value={answers[q.id] ?? ""}
                  onChange={(e) => selectAnswer(q.id, e.target.value)}
                >
                  {q.answers.map((a) => (
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
        ))}
      </Stack>

      <Stack direction="row" justifyContent="flex-end">
        <Button
          variant="contained"
          size="large"
          disabled={pending}
          onClick={submit}
        >
          {pending ? "Submitting…" : "Submit quiz"}
        </Button>
      </Stack>
    </Stack>
  );
}
