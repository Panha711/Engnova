"use client";

import { IconButton, Tooltip } from "@mui/material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { useThemeMode } from "./ThemeModeProvider";

type Props = {
  size?: "small" | "medium";
};

export default function ThemeToggle({ size = "medium" }: Props) {
  const { mode, toggleMode } = useThemeMode();
  const isDark = mode === "dark";

  return (
    <Tooltip title={isDark ? "Light mode" : "Dark mode"}>
      <IconButton
        onClick={toggleMode}
        size={size}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        sx={{
          color: "text.secondary",
          "&:hover": {
            bgcolor: "action.hover",
            color: "text.primary",
          },
        }}
      >
        {isDark ? (
          <LightModeOutlinedIcon fontSize={size} />
        ) : (
          <DarkModeOutlinedIcon fontSize={size} />
        )}
      </IconButton>
    </Tooltip>
  );
}
