"use client";

import { useEffect, useState, type RefObject } from "react";
import { alpha, Box, Stack, Typography, useTheme } from "@mui/material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import type { LessonHeading } from "@/lib/lessonHeadings";

type Props = {
  headings: LessonHeading[];
  /** If provided, anchor clicks and the scroll-spy observer operate on this container instead of the window. */
  scrollRoot?: RefObject<HTMLElement | null>;
};

export default function LessonTOC({ headings, scrollRoot }: Props) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [active, setActive] = useState<string | null>(
    headings[0]?.id ?? null,
  );

  useEffect(() => {
    if (headings.length === 0) return;
    const root = scrollRoot?.current ?? null;
    const target: HTMLElement | Window = root ?? window;
    const offset = root ? 24 : 100;

    function updateActive() {
      const containerTop = root ? root.getBoundingClientRect().top : 0;
      let current: string | null = headings[0]?.id ?? null;
      for (const h of headings) {
        const el = document.getElementById(h.id);
        if (!el) continue;
        const relativeTop = el.getBoundingClientRect().top - containerTop;
        if (relativeTop - offset <= 0) {
          current = h.id;
        } else {
          break;
        }
      }
      if (current) setActive(current);
    }

    target.addEventListener("scroll", updateActive, { passive: true });
    updateActive();
    return () => target.removeEventListener("scroll", updateActive);
  }, [headings, scrollRoot]);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    setActive(id);
    if (history.replaceState) history.replaceState(null, "", `#${id}`);

    const root = scrollRoot?.current;
    if (root) {
      const containerTop = root.getBoundingClientRect().top;
      const targetTop = target.getBoundingClientRect().top;
      const top = root.scrollTop + (targetTop - containerTop) - 8;
      root.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  if (headings.length === 0) return null;

  return (
    <Box
      component="aside"
      sx={{
        position: "sticky",
        top: 24,
        alignSelf: "flex-start",
        pl: 2,
        borderLeft: 1,
        borderColor: "divider",
      }}
    >
      <Stack direction="row" alignItems="center" spacing={0.75} sx={{ mb: 1.5 }}>
        <ListAltIcon sx={{ fontSize: 14, color: "text.disabled" }} />
        <Typography
          sx={{
            fontSize: "0.6875rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "text.disabled",
          }}
        >
          On this page
        </Typography>
      </Stack>
      <Stack component="ul" spacing={0.5} sx={{ listStyle: "none", p: 0, m: 0 }}>
        {headings.map((h) => {
          const isActive = h.id === active;
          return (
            <li key={h.id}>
              <Box
                component="a"
                href={`#${h.id}`}
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) =>
                  handleClick(e, h.id)
                }
                sx={{
                  display: "block",
                  textDecoration: "none",
                  fontSize: "0.8125rem",
                  lineHeight: 1.5,
                  py: 0.625,
                  pl: 1.25,
                  borderLeft: 2,
                  borderColor: isActive ? "primary.main" : "transparent",
                  marginLeft: "-1.125rem",
                  color: isActive ? "primary.main" : "text.secondary",
                  fontWeight: isActive ? 700 : 500,
                  transition: "color 0.15s, border-color 0.15s",
                  "&:hover": {
                    color: isActive
                      ? "primary.main"
                      : isDark
                        ? alpha("#fff", 0.92)
                        : "text.primary",
                  },
                }}
              >
                {h.label}
              </Box>
            </li>
          );
        })}
      </Stack>
    </Box>
  );
}
