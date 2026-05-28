"use client";

import { useState, useTransition } from "react";
import {
  alpha,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  LinearProgress,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { accentPurple, brandIndigo } from "@/lib/theme";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { levelColor, levelLabel } from "@/lib/utils";
import { recordFlashcardSession } from "@/actions/vocabulary";

export type FlashcardItem = {
  id: string;
  word: string;
  meaning: string;
  meaningKh?: string | null;
  example?: string | null;
  pronunciation?: string | null;
  partOfSpeech?: string | null;
  level: string;
};

export default function Flashcard({ items }: { items: FlashcardItem[] }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [done, setDone] = useState(0);
  const [finished, setFinished] = useState(false);
  const [pending, startTransition] = useTransition();

  if (items.length === 0) {
    return (
      <Typography color="text.secondary">No flashcards available.</Typography>
    );
  }

  const current = items[index];
  const progress = (done / items.length) * 100;

  function speak(text: string) {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    window.speechSynthesis.speak(utter);
  }

  function next() {
    setFlipped(false);
    setDone((d) => d + 1);
    if (index + 1 >= items.length) {
      setFinished(true);
      startTransition(() => {
        recordFlashcardSession(items.length).catch(() => undefined);
      });
    } else {
      setIndex((i) => i + 1);
    }
  }

  function reset() {
    setIndex(0);
    setDone(0);
    setFlipped(false);
    setFinished(false);
  }

  if (finished) {
    return (
      <Card sx={{ borderRadius: 2.5, textAlign: "center" }}>
        <CardContent sx={{ py: 5 }}>
          <Stack spacing={2} alignItems="center">
            <Typography variant="h5" fontWeight={800}>
              Session complete
            </Typography>
            <Typography color="text.secondary">
              You reviewed {items.length} words.
              {pending ? " Saving progress…" : " Progress saved."}
            </Typography>
            <Button
              variant="contained"
              startIcon={<RestartAltIcon />}
              onClick={reset}
              sx={{ mt: 1 }}
            >
              Practice again
            </Button>
          </Stack>
        </CardContent>
      </Card>
    );
  }

  return (
    <Stack spacing={2.5}>
      <Box>
        <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.75 }}>
          <Typography variant="caption" fontWeight={600} color="text.secondary">
            Progress
          </Typography>
          <Typography variant="caption" fontWeight={700}>
            {index + 1} / {items.length}
          </Typography>
        </Stack>
        <LinearProgress variant="determinate" value={progress} />
      </Box>

      <Card
        sx={{
          cursor: "pointer",
          userSelect: "none",
          minHeight: 320,
          borderRadius: 2.5,
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          background: flipped
            ? isDark
              ? `linear-gradient(160deg, ${alpha(brandIndigo, 0.25)} 0%, ${theme.palette.background.paper} 55%)`
              : `linear-gradient(160deg, ${alpha(accentPurple, 0.12)} 0%, ${theme.palette.background.paper} 55%)`
            : theme.palette.background.paper,
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: `0 12px 32px ${alpha(brandIndigo, isDark ? 0.2 : 0.12)}`,
          },
        }}
        onClick={() => setFlipped((f) => !f)}
      >
        <CardContent sx={{ py: 4, px: 3.5 }}>
          <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
            <Chip
              size="small"
              color={levelColor(current.level)}
              label={levelLabel(current.level)}
            />
          </Stack>

          <Box sx={{ textAlign: "center", py: 3 }}>
            {!flipped ? (
              <Stack alignItems="center" spacing={1.25}>
                <Typography
                  variant="h3"
                  sx={{ fontWeight: 800, letterSpacing: "-0.03em" }}
                >
                  {current.word}
                </Typography>
                {current.pronunciation && (
                  <Typography color="text.secondary">
                    {current.pronunciation}
                  </Typography>
                )}
                {current.partOfSpeech && (
                  <Chip
                    size="small"
                    label={current.partOfSpeech}
                    variant="outlined"
                  />
                )}
                <Tooltip title="Pronounce">
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      speak(current.word);
                    }}
                    sx={{ color: "primary.main" }}
                  >
                    <VolumeUpIcon />
                  </IconButton>
                </Tooltip>
                <Typography
                  variant="caption"
                  color="text.disabled"
                  fontWeight={600}
                >
                  Tap to reveal meaning
                </Typography>
              </Stack>
            ) : (
              <Stack spacing={2} alignItems="center">
                {current.meaningKh && (
                  <Typography
                    variant="h4"
                    fontWeight={700}
                    sx={{
                      fontFamily:
                        "var(--font-khmer), var(--font-app), sans-serif",
                      color: isDark ? accentPurple : brandIndigo,
                    }}
                  >
                    {current.meaningKh}
                  </Typography>
                )}
                <Typography
                  variant={current.meaningKh ? "body1" : "h5"}
                  fontWeight={current.meaningKh ? 500 : 700}
                  color={current.meaningKh ? "text.secondary" : "text.primary"}
                >
                  {current.meaning}
                </Typography>
                {current.example && (
                  <Typography
                    color="text.secondary"
                    sx={{ fontStyle: "italic", maxWidth: 400 }}
                  >
                    “{current.example}”
                  </Typography>
                )}
                <Typography
                  variant="caption"
                  color="text.disabled"
                  fontWeight={600}
                >
                  Tap to flip back
                </Typography>
              </Stack>
            )}
          </Box>
        </CardContent>
      </Card>

      <Stack direction="row" spacing={1.5} justifyContent="flex-end">
        <Button variant="outlined" onClick={() => setFlipped((f) => !f)}>
          {flipped ? "Show word" : "Show meaning"}
        </Button>
        <Button variant="contained" onClick={next}>
          {index + 1 >= items.length ? "Finish" : "Next"}
        </Button>
      </Stack>
    </Stack>
  );
}
