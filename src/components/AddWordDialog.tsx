"use client";

import { useState, useTransition } from "react";
import type { Level } from "@prisma/client";
import {
  alpha,
  Box,
  Dialog,
  DialogContent,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import { createWord, generateWordDetails } from "@/actions/vocabulary";
import { brandIndigo, accentPurple } from "@/lib/theme";

type Props = {
  open: boolean;
  onClose: () => void;
  defaultLevel: Level;
};

const POS_OPTIONS = [
  "noun",
  "verb",
  "adjective",
  "adverb",
  "preposition",
  "phrase",
  "interjection",
];

const LEVELS: { value: Level; label: string }[] = [
  { value: "BEGINNER", label: "Beginner" },
  { value: "INTERMEDIATE", label: "Intermediate" },
  { value: "ADVANCED", label: "Advanced" },
];

export default function AddWordDialog({ open, onClose, defaultLevel }: Props) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [meaningKh, setMeaningKh] = useState("");
  const [example, setExample] = useState("");
  const [partOfSpeech, setPartOfSpeech] = useState("noun");
  const [level, setLevel] = useState<Level>(defaultLevel);

  const [generating, setGenerating] = useState(false);
  const [saving, startSaving] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function reset() {
    setWord("");
    setMeaning("");
    setMeaningKh("");
    setExample("");
    setPartOfSpeech("noun");
    setLevel(defaultLevel);
    setError(null);
  }

  async function handleGenerate() {
    setError(null);
    if (!word.trim()) {
      setError("Type the English word first.");
      return;
    }
    setGenerating(true);
    try {
      const res = await generateWordDetails(word);
      if (!res.ok) {
        setError(res.error);
        return;
      }
      setMeaning(res.data.meaning);
      setMeaningKh(res.data.meaningKh);
      setExample(res.data.example);
      if (POS_OPTIONS.includes(res.data.partOfSpeech)) {
        setPartOfSpeech(res.data.partOfSpeech);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "AI generation failed.");
    } finally {
      setGenerating(false);
    }
  }

  function handleSave() {
    setError(null);
    if (!word.trim()) return setError("Word is required.");
    if (!meaning.trim()) return setError("English meaning is required.");

    startSaving(async () => {
      const res = await createWord({
        word,
        meaning,
        meaningKh,
        example,
        partOfSpeech,
        level,
      });
      if (!res.ok) {
        setError(res.error);
        return;
      }
      reset();
      onClose();
    });
  }

  function handleClose() {
    if (saving || generating) return;
    reset();
    onClose();
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: { sx: { borderRadius: 3, overflow: "hidden" } },
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 3,
            pt: 2.5,
            pb: 2,
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1.25}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: 1.5,
                background: `linear-gradient(135deg, ${brandIndigo}, ${accentPurple})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
              }}
            >
              <AutoAwesomeOutlinedIcon sx={{ fontSize: 18 }} />
            </Box>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "1.0625rem",
                letterSpacing: "-0.01em",
              }}
            >
              Add new word
            </Typography>
          </Stack>
          <IconButton
            onClick={handleClose}
            size="small"
            disabled={saving || generating}
            aria-label="Close"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Form */}
        <Box sx={{ p: 3 }}>
          <Stack spacing={2}>
            {/* English word + Generate button row */}
            <Box>
              <FieldLabel>English word</FieldLabel>
              <Stack direction="row" spacing={1}>
                <TextField
                  value={word}
                  onChange={(e) => setWord(e.target.value)}
                  placeholder="e.g. abundant"
                  fullWidth
                  size="small"
                  disabled={saving}
                  autoFocus
                />
                <Box
                  component="button"
                  type="button"
                  onClick={handleGenerate}
                  disabled={generating || saving || !word.trim()}
                  sx={{
                    flexShrink: 0,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.75,
                    px: 1.75,
                    borderRadius: 1.5,
                    border: 0,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                    color: "#fff",
                    background: `linear-gradient(135deg, ${brandIndigo}, ${accentPurple})`,
                    transition: "opacity 0.15s",
                    "&:hover": { opacity: 0.92 },
                    "&:disabled": {
                      cursor: "not-allowed",
                      background: isDark
                        ? alpha("#fff", 0.08)
                        : alpha("#0f172a", 0.08),
                      color: "text.disabled",
                    },
                  }}
                >
                  <AutoAwesomeOutlinedIcon sx={{ fontSize: 16 }} />
                  {generating ? "Generating…" : "AI fill"}
                </Box>
              </Stack>
              <Typography
                variant="caption"
                color="text.disabled"
                sx={{ display: "block", mt: 0.5, fontSize: "0.6875rem" }}
              >
                Click <strong>AI fill</strong> to let Claude write the meaning,
                Khmer translation, and example for you.
              </Typography>
            </Box>

            {/* Khmer translation */}
            <Box>
              <FieldLabel>Khmer translation</FieldLabel>
              <TextField
                value={meaningKh}
                onChange={(e) => setMeaningKh(e.target.value)}
                placeholder="e.g. ច្រើន"
                fullWidth
                size="small"
                lang="km"
                disabled={saving}
              />
            </Box>

            {/* English meaning */}
            <Box>
              <FieldLabel>English meaning</FieldLabel>
              <TextField
                value={meaning}
                onChange={(e) => setMeaning(e.target.value)}
                placeholder="A short, simple definition"
                fullWidth
                size="small"
                multiline
                minRows={2}
                disabled={saving}
              />
            </Box>

            {/* Example */}
            <Box>
              <FieldLabel>Example sentence (optional)</FieldLabel>
              <TextField
                value={example}
                onChange={(e) => setExample(e.target.value)}
                placeholder="A short sentence using the word"
                fullWidth
                size="small"
                multiline
                minRows={2}
                disabled={saving}
              />
            </Box>

            {/* Part of speech + level */}
            <Stack direction="row" spacing={2}>
              <Box sx={{ flex: 1 }}>
                <FieldLabel>Part of speech</FieldLabel>
                <TextField
                  select
                  value={partOfSpeech}
                  onChange={(e) => setPartOfSpeech(e.target.value)}
                  fullWidth
                  size="small"
                  disabled={saving}
                >
                  {POS_OPTIONS.map((p) => (
                    <MenuItem key={p} value={p}>
                      {p}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
              <Box sx={{ flex: 1 }}>
                <FieldLabel>Level</FieldLabel>
                <TextField
                  select
                  value={level}
                  onChange={(e) => setLevel(e.target.value as Level)}
                  fullWidth
                  size="small"
                  disabled={saving}
                >
                  {LEVELS.map((l) => (
                    <MenuItem key={l.value} value={l.value}>
                      {l.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Stack>

            {error && (
              <Box
                sx={{
                  px: 1.5,
                  py: 1,
                  borderRadius: 1.5,
                  bgcolor: alpha("#ef4444", isDark ? 0.15 : 0.08),
                  color: isDark ? "#fca5a5" : "#b91c1c",
                  fontSize: "0.8125rem",
                  lineHeight: 1.5,
                }}
              >
                {error}
              </Box>
            )}

            {/* Footer */}
            <Stack direction="row" spacing={1} justifyContent="flex-end">
              <Box
                component="button"
                type="button"
                onClick={handleClose}
                disabled={saving || generating}
                sx={{
                  px: 2,
                  py: 0.875,
                  borderRadius: 999,
                  border: 0,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  bgcolor: "transparent",
                  color: "text.secondary",
                  transition: "color 0.15s",
                  "&:hover": { color: "text.primary" },
                  "&:disabled": { cursor: "not-allowed", opacity: 0.5 },
                }}
              >
                Cancel
              </Box>
              <Box
                component="button"
                type="button"
                onClick={handleSave}
                disabled={saving || generating || !word.trim() || !meaning.trim()}
                sx={{
                  px: 2.25,
                  py: 0.875,
                  borderRadius: 999,
                  border: 0,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  color: "#fff",
                  background: `linear-gradient(135deg, ${brandIndigo}, ${accentPurple})`,
                  boxShadow: `0 8px 18px -8px ${alpha(brandIndigo, 0.6)}`,
                  transition: "opacity 0.15s",
                  "&:hover": { opacity: 0.92 },
                  "&:disabled": {
                    cursor: "not-allowed",
                    background: isDark
                      ? alpha("#fff", 0.08)
                      : alpha("#0f172a", 0.08),
                    color: "text.disabled",
                    boxShadow: "none",
                  },
                }}
              >
                {saving ? "Saving…" : "Save word"}
              </Box>
            </Stack>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      variant="caption"
      sx={{
        display: "block",
        fontWeight: 700,
        fontSize: "0.6875rem",
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        color: "text.disabled",
        mb: 0.625,
      }}
    >
      {children}
    </Typography>
  );
}
