"use client";

import { useState } from "react";
import { Alert, alpha, Box, Button, Stack, Typography } from "@mui/material";
import HeadphonesIcon from "@mui/icons-material/Headphones";

type Props = {
  audioUrl: string | null;
  transcript: string | null;
};

export default function ListeningPlayer({ audioUrl, transcript }: Props) {
  const [show, setShow] = useState(false);

  return (
    <Stack spacing={2.5}>
      {audioUrl ? (
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            bgcolor: alpha("#0d9488", 0.06),
            border: `1px solid ${alpha("#0d9488", 0.15)}`,
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
            <HeadphonesIcon color="primary" fontSize="small" />
            <Typography variant="subtitle2" color="primary.dark">
              Listen to the dialogue
            </Typography>
          </Stack>
          <Box
            component="audio"
            controls
            src={audioUrl}
            sx={{ width: "100%", height: 40 }}
          />
        </Box>
      ) : (
        <Alert severity="info" variant="outlined">
          No audio file is attached. Place an MP3 in <code>/public/audio</code>
          {" "}and update the lesson&apos;s <code>audioUrl</code>.
        </Alert>
      )}

      <Button
        variant="outlined"
        onClick={() => setShow((s) => !s)}
        disabled={!transcript}
        sx={{ alignSelf: "flex-start" }}
      >
        {show ? "Hide transcript" : "Show transcript"}
      </Button>

      {show && transcript && (
        <Box
          sx={{
            p: 2.5,
            borderRadius: 2,
            bgcolor: alpha("#0f172a", 0.03),
            border: `1px solid ${alpha("#0f172a", 0.08)}`,
          }}
        >
          {transcript.split(/\r?\n/).map((line, i) => (
            <Typography key={i} variant="body1" sx={{ my: 0.75, lineHeight: 1.7 }}>
              {line}
            </Typography>
          ))}
        </Box>
      )}
    </Stack>
  );
}
