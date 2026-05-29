"use client";

import Link from "next/link";
import type { Route } from "next";
import { alpha, Box, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { brandIndigo } from "@/lib/theme";

type Neighbor = {
  slug: string;
  title: string;
};

type Props = {
  prev: Neighbor | null;
  next: Neighbor | null;
  basePath: string;
};

export default function LessonNav({ prev, next, basePath }: Props) {
  return (
    <Box
      sx={{
        mt: 6,
        pt: 4,
        borderTop: 1,
        borderColor: "divider",
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
        gap: 2,
      }}
    >
      {prev ? (
        <NavCard
          direction="prev"
          href={`${basePath}/${prev.slug}`}
          title={prev.title}
        />
      ) : (
        <Box />
      )}
      {next ? (
        <NavCard
          direction="next"
          href={`${basePath}/${next.slug}`}
          title={next.title}
        />
      ) : (
        <Box />
      )}
    </Box>
  );
}

function NavCard({
  direction,
  href,
  title,
}: {
  direction: "prev" | "next";
  href: string;
  title: string;
}) {
  const isNext = direction === "next";
  return (
    <Box
      component={Link}
      href={href as Route}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 0.5,
        p: 2.25,
        borderRadius: 2.5,
        border: 1,
        borderColor: "divider",
        textDecoration: "none",
        color: "inherit",
        alignItems: isNext ? "flex-end" : "flex-start",
        textAlign: isNext ? "right" : "left",
        transition: "border-color 0.2s, transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          borderColor: alpha(brandIndigo, 0.4),
          transform: "translateY(-1px)",
          boxShadow: (t) =>
            t.palette.mode === "dark"
              ? "none"
              : `0 6px 22px ${alpha("#0f172a", 0.06)}`,
        },
      }}
    >
      <Stack
        direction={isNext ? "row-reverse" : "row"}
        alignItems="center"
        spacing={0.5}
        sx={{
          color: "text.disabled",
          fontSize: "0.6875rem",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        {isNext ? (
          <ArrowForwardIcon sx={{ fontSize: 14 }} />
        ) : (
          <ArrowBackIcon sx={{ fontSize: 14 }} />
        )}
        <span>{isNext ? "Next lesson" : "Previous lesson"}</span>
      </Stack>
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: "0.9375rem",
          lineHeight: 1.35,
          color: "text.primary",
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </Typography>
    </Box>
  );
}
