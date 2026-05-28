"use client";

import { useState, useTransition } from "react";
import { alpha, IconButton, Tooltip, useTheme } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { toggleSaveWord } from "@/actions/vocabulary";
import { accentPurple } from "@/lib/theme";

type Props = {
  vocabularyId: string;
  initialSaved?: boolean;
  /** heart = soft outline in card corner; bookmark = default */
  variant?: "bookmark" | "heart";
};

export default function SaveWordButton({
  vocabularyId,
  initialSaved,
  variant = "bookmark",
}: Props) {
  const theme = useTheme();
  const [saved, setSaved] = useState(!!initialSaved);
  const [pending, startTransition] = useTransition();

  function onClick() {
    setSaved((s) => !s);
    startTransition(async () => {
      try {
        const res = await toggleSaveWord(vocabularyId);
        setSaved(res.saved);
      } catch {
        setSaved((s) => !s);
      }
    });
  }

  const isHeart = variant === "heart";
  const savedColor = "#ef4444";

  return (
    <Tooltip title={saved ? "Remove from saved" : "Save word"}>
      <IconButton
        onClick={onClick}
        disabled={pending}
        size="small"
        sx={
          isHeart
            ? {
                color: saved ? savedColor : "text.disabled",
                p: 0.5,
                "&:hover": {
                  bgcolor: alpha(savedColor, 0.1),
                  color: savedColor,
                },
              }
            : {
                color: saved ? theme.palette.primary.main : "text.secondary",
              }
        }
      >
        {isHeart ? (
          saved ? (
            <FavoriteIcon sx={{ fontSize: 22, color: savedColor }} />
          ) : (
            <FavoriteBorderIcon sx={{ fontSize: 22 }} />
          )
        ) : saved ? (
          <BookmarkIcon sx={{ color: accentPurple }} />
        ) : (
          <BookmarkBorderIcon />
        )}
      </IconButton>
    </Tooltip>
  );
}
