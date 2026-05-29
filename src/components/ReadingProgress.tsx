"use client";

import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { brandIndigo, accentPurple } from "@/lib/theme";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const tick = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const max = (doc.scrollHeight || 0) - window.innerHeight;
      const value = max > 0 ? Math.min(1, Math.max(0, scrollTop / max)) : 0;
      setProgress(value);
      frame = 0;
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", tick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", tick);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <Box
      aria-hidden
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        zIndex: (t) => t.zIndex.appBar + 2,
        pointerEvents: "none",
      }}
    >
      <Box
        sx={{
          height: "100%",
          width: `${progress * 100}%`,
          background: `linear-gradient(90deg, ${brandIndigo}, ${accentPurple})`,
          transition: "width 0.08s linear",
        }}
      />
    </Box>
  );
}
