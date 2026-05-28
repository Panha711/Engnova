"use client";

import Link from "next/link";
import type { Route } from "next";
import { Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

type Props = {
  href: string;
  label?: string;
};

export default function BackLink({ href, label = "Back" }: Props) {
  return (
    <Box
      component={Link}
      href={href as Route}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.75,
        mb: 2.5,
        color: "text.secondary",
        textDecoration: "none",
        fontSize: "0.8125rem",
        fontWeight: 600,
        transition: "color 0.15s",
        "&:hover": { color: "primary.main" },
      }}
    >
      <ArrowBackIcon sx={{ fontSize: 16 }} />
      <span>{label}</span>
    </Box>
  );
}
