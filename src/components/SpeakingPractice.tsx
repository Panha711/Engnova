"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import {
  Alert,
  alpha,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import RefreshIcon from "@mui/icons-material/Refresh";
import { saveSpeakingResponse } from "@/actions/speaking";
import { levelColor, levelLabel } from "@/lib/utils";

export type SpeakingPrompt = {
  id: string;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  prompt: string;
  hint?: string;
};

type Feedback = {
  score: number;
  good: string[];
  improve: string[];
};

// Lightweight client-only heuristic that simulates AI feedback.
function generateFeedback(answer: string): Feedback {
  const words = answer.trim().split(/\s+/).filter(Boolean);
  const sentences = answer.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const avgLen = words.length / Math.max(sentences.length, 1);

  const good: string[] = [];
  const improve: string[] = [];

  if (words.length >= 25) good.push("Good length — you developed your answer.");
  else improve.push("Try to extend your answer to at least 25 words.");

  if (sentences.length >= 2) good.push("Nice — you used multiple sentences.");
  else improve.push("Use 2–3 sentences instead of one long thought.");

  if (avgLen >= 6 && avgLen <= 18)
    good.push("Your sentence length feels natural.");
  else if (avgLen < 6) improve.push("Sentences feel a bit short. Add detail or examples.");
  else improve.push("Some sentences may be long — try to break them up.");

  if (/\b(because|so|although|however|while)\b/i.test(answer))
    good.push("You used a linking word to connect ideas.");
  else improve.push("Try linking ideas with 'because', 'so', or 'however'.");

  const score = Math.min(100, 40 + good.length * 15 + Math.min(20, words.length));
  return { score, good, improve };
}

type SpeechRecognitionLike = {
  start: () => void;
  stop: () => void;
  abort: () => void;
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: { results: ArrayLike<{ 0: { transcript: string } }> }) => void) | null;
  onerror: ((event: unknown) => void) | null;
  onend: (() => void) | null;
};

export default function SpeakingPractice({ prompts }: { prompts: SpeakingPrompt[] }) {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [recording, setRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const [pending, startTransition] = useTransition();

  const current = prompts[index];

  useEffect(() => {
    return () => {
      recognitionRef.current?.abort();
    };
  }, []);

  function speak() {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const u = new SpeechSynthesisUtterance(current.prompt);
    u.lang = "en-US";
    window.speechSynthesis.speak(u);
  }

  function toggleRecord() {
    setError(null);
    const w = window as unknown as {
      SpeechRecognition?: new () => SpeechRecognitionLike;
      webkitSpeechRecognition?: new () => SpeechRecognitionLike;
    };
    const Ctor = w.SpeechRecognition ?? w.webkitSpeechRecognition;
    if (!Ctor) {
      setError(
        "Voice recording isn't supported in this browser. Please type your answer instead.",
      );
      return;
    }
    if (recording) {
      recognitionRef.current?.stop();
      setRecording(false);
      return;
    }
    const r = new Ctor();
    r.continuous = false;
    r.interimResults = false;
    r.lang = "en-US";
    r.onresult = (event) => {
      const transcript = Array.from({ length: event.results.length })
        .map((_, i) => event.results[i][0].transcript)
        .join(" ");
      setAnswer((a) => (a ? a + " " : "") + transcript);
    };
    r.onerror = () => {
      setError("We couldn't capture your voice. Please try again.");
      setRecording(false);
    };
    r.onend = () => setRecording(false);
    recognitionRef.current = r;
    r.start();
    setRecording(true);
  }

  function getFeedback() {
    if (!answer.trim()) {
      setError("Type or record your answer first.");
      return;
    }
    setError(null);
    setFeedback(generateFeedback(answer));
    startTransition(async () => {
      try {
        await saveSpeakingResponse(current.id, answer.trim());
      } catch {
        // non-blocking
      }
    });
  }

  function nextPrompt() {
    setAnswer("");
    setFeedback(null);
    setError(null);
    setIndex((i) => (i + 1) % prompts.length);
  }

  return (
    <Card>
      <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
        <Stack spacing={3}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <Stack spacing={1}>
              <Chip size="small" color={levelColor(current.level)} label={levelLabel(current.level)} />
              <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: 1.35 }}>
                {current.prompt}
              </Typography>
              {current.hint && (
                <Typography variant="body2" color="text.secondary">
                  {current.hint}
                </Typography>
              )}
            </Stack>
            <Stack direction="row" spacing={0.5}>
              <Tooltip title="Hear the prompt">
                <IconButton onClick={speak}>
                  <VolumeUpIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Next prompt">
                <IconButton onClick={nextPrompt}>
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>

          {error && <Alert severity="warning">{error}</Alert>}

          <TextField
            label="Your answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            multiline
            minRows={4}
            placeholder="Speak using the mic button or type your answer here."
          />

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
            <Button
              variant={recording ? "contained" : "outlined"}
              color={recording ? "error" : "primary"}
              startIcon={recording ? <StopIcon /> : <MicIcon />}
              onClick={toggleRecord}
            >
              {recording ? "Stop recording" : "Record"}
            </Button>
            <Button variant="contained" onClick={getFeedback} disabled={pending}>
              {pending ? "Saving…" : "Get feedback"}
            </Button>
          </Stack>

          {feedback && (
            <Card
              sx={{
                bgcolor: alpha("#0d9488", 0.04),
                border: `1px solid ${alpha("#0d9488", 0.2)}`,
              }}
            >
              <CardContent>
                <Stack spacing={1.5}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">AI-style feedback</Typography>
                    <Chip
                      color={feedback.score >= 80 ? "success" : feedback.score >= 50 ? "info" : "warning"}
                      label={`Score: ${feedback.score}/100`}
                    />
                  </Stack>
                  {feedback.good.length > 0 && (
                    <Box>
                      <Typography variant="subtitle2" color="success.main">
                        What worked well
                      </Typography>
                      <ul style={{ marginTop: 4, paddingLeft: 20 }}>
                        {feedback.good.map((g, i) => (
                          <li key={i}>{g}</li>
                        ))}
                      </ul>
                    </Box>
                  )}
                  {feedback.improve.length > 0 && (
                    <Box>
                      <Typography variant="subtitle2" color="warning.main">
                        Try next time
                      </Typography>
                      <ul style={{ marginTop: 4, paddingLeft: 20 }}>
                        {feedback.improve.map((g, i) => (
                          <li key={i}>{g}</li>
                        ))}
                      </ul>
                    </Box>
                  )}
                  <Typography variant="caption" color="text.disabled">
                    Heuristic feedback — replace with a real model in production.
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
