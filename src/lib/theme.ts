"use client";

import { createTheme, alpha, type PaletteMode } from "@mui/material/styles";
import LinkBehavior from "@/components/LinkBehavior";

/** Brand indigo — primary actions, active nav */
export const brandIndigo = "#6366f1";
export const brandIndigoLight = "#818cf8";
/** Violet — Khmer text, accents */
export const accentPurple = "#7c5cff";
/** Teal — saved words, success highlights */
export const accentTeal = "#14b8a6";

export function createAppTheme(mode: PaletteMode) {
  const isDark = mode === "dark";
  const ink = isDark ? "#f1f5f9" : "#0f172a";
  const muted = isDark ? "#94a3b8" : "#64748b";
  const border = alpha(ink, isDark ? 0.12 : 0.08);
  const surface = isDark ? "#161b26" : "#ffffff";
  const canvas = isDark ? "#0c0f14" : "#f4f5f7";
  const subtle = isDark ? alpha("#f8fafc", 0.05) : alpha("#0f172a", 0.04);
  const primaryMain = isDark ? brandIndigoLight : brandIndigo;

  return createTheme({
    cssVariables: true,
    palette: {
      mode,
      primary: {
        main: primaryMain,
        light: isDark ? "#a5b4fc" : "#818cf8",
        dark: isDark ? "#6366f1" : "#4f46e5",
        contrastText: "#ffffff",
      },
      secondary: {
        main: accentPurple,
        contrastText: "#ffffff",
      },
      background: {
        default: canvas,
        paper: surface,
      },
      text: {
        primary: ink,
        secondary: muted,
      },
      divider: border,
      success: { main: accentTeal },
      warning: { main: "#f59e0b" },
      error: { main: "#ef4444" },
      info: { main: isDark ? "#38bdf8" : "#3b82f6" },
    },
    typography: {
      fontFamily:
        'var(--font-app), "Segoe UI", system-ui, -apple-system, sans-serif',
      h1: { fontWeight: 700, letterSpacing: "-0.03em" },
      h2: { fontWeight: 700, letterSpacing: "-0.025em" },
      h3: { fontWeight: 600, letterSpacing: "-0.02em" },
      h4: { fontWeight: 600, letterSpacing: "-0.02em" },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600, letterSpacing: "-0.01em" },
      button: { textTransform: "none", fontWeight: 600 },
      overline: {
        fontWeight: 700,
        letterSpacing: "0.08em",
        fontSize: "0.6875rem",
      },
    },
    shape: { borderRadius: 12 },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            WebkitFontSmoothing: "antialiased",
            backgroundColor: canvas,
          },
        },
      },
      MuiButtonBase: {
        defaultProps: { LinkComponent: LinkBehavior },
      },
      MuiLink: {
        defaultProps: { component: LinkBehavior },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            borderRadius: 10,
            paddingInline: 18,
            paddingBlock: 9,
            fontWeight: 600,
          },
          containedPrimary: {
            background: `linear-gradient(135deg, ${brandIndigo} 0%, ${accentPurple} 100%)`,
            "&:hover": {
              background: `linear-gradient(135deg, ${isDark ? brandIndigoLight : "#4f46e5"} 0%, ${accentPurple} 100%)`,
            },
          },
        },
      },
      MuiCard: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          root: {
            border: `1px solid ${border}`,
            boxShadow: isDark ? "none" : `0 1px 3px ${alpha(ink, 0.04)}`,
            transition:
              "border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease",
            "&:hover": {
              borderColor: alpha(primaryMain, isDark ? 0.35 : 0.25),
              boxShadow: isDark
                ? `0 4px 20px ${alpha("#000", 0.35)}`
                : `0 8px 24px ${alpha(ink, 0.08)}`,
            },
          },
        },
      },
      MuiPaper: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          root: { backgroundImage: "none" },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { fontWeight: 600, borderRadius: 8 },
          sizeSmall: { height: 26 },
        },
      },
      MuiTabs: {
        styleOverrides: {
          indicator: {
            height: 3,
            borderRadius: 3,
            backgroundColor: primaryMain,
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 600,
            minHeight: 44,
          },
        },
      },
      MuiTextField: {
        defaultProps: { variant: "outlined" },
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: 10,
              backgroundColor: isDark ? alpha("#0c0f14", 0.5) : "#ffffff",
            },
          },
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            height: 6,
            backgroundColor: subtle,
          },
          bar: {
            borderRadius: 6,
            background: `linear-gradient(90deg, ${brandIndigo}, ${accentPurple})`,
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            borderRight: `1px solid ${border}`,
            bgcolor: isDark ? "#11151c" : "#ffffff",
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: { borderRadius: 10 },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: { boxShadow: "none" },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: { borderColor: border },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: { borderRadius: 10 },
        },
      },
    },
  });
}

/** @deprecated Use createAppTheme via ThemeModeProvider */
export default createAppTheme("light");
