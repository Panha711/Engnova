"use client";

import { ReactNode, useState } from "react";
import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  alpha,
  AppBar,
  Avatar,
  Box,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import SpellcheckOutlinedIcon from "@mui/icons-material/SpellcheckOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import ThemeToggle from "./ThemeToggle";
import { brandIndigo, accentPurple } from "@/lib/theme";

const SIDEBAR_BG = "#0d162a";
const SIDEBAR_TEXT = "#e2e8f0";
const SIDEBAR_MUTED = "#94a3b8";
const SIDEBAR_ACTIVE = "#7c5cff";
const SIDEBAR_BORDER = "rgba(255, 255, 255, 0.06)";
const DRAWER_WIDTH = 240;

type NavItem = {
  label: string;
  href: Route;
  icon: ReactNode;
  match: (path: string) => boolean;
};

const NAV: NavItem[] = [
  {
    label: "Vocabulary",
    href: "/vocabulary" as Route,
    icon: <SpellcheckOutlinedIcon sx={{ fontSize: 20 }} />,
    match: (p) => p === "/vocabulary" || p.startsWith("/vocabulary/"),
  },
  {
    label: "Grammar",
    href: "/grammar" as Route,
    icon: <MenuBookOutlinedIcon sx={{ fontSize: 20 }} />,
    match: (p) => p === "/grammar" || p.startsWith("/grammar/"),
  },
  {
    label: "Quiz",
    href: "/quiz" as Route,
    icon: <QuizOutlinedIcon sx={{ fontSize: 20 }} />,
    match: (p) => p === "/quiz" || p.startsWith("/quiz/"),
  },
];

function pageNameFromPath(p: string): string {
  if (p.startsWith("/vocabulary")) return "Vocabulary";
  if (p.startsWith("/grammar")) return "Grammar";
  if (p.startsWith("/quiz")) return "Quiz";
  if (p.startsWith("/reading")) return "Reading";
  if (p.startsWith("/listening")) return "Listening";
  if (p.startsWith("/speaking")) return "Speaking";
  return "";
}

type Props = {
  user: { name?: string | null; email?: string | null; image?: string | null };
  children: ReactNode;
};

function Logo({ size = 36 }: { size?: number }) {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: 2,
        background: `linear-gradient(135deg, ${brandIndigo} 0%, ${accentPurple} 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <Typography
        component="span"
        sx={{
          color: "#fff",
          fontWeight: 800,
          fontSize: size >= 36 ? "1rem" : "0.875rem",
          lineHeight: 1,
        }}
      >
        E
      </Typography>
    </Box>
  );
}

function NavRow({
  item,
  active,
  onNavigate,
}: {
  item: NavItem;
  active: boolean;
  onNavigate: () => void;
}) {
  return (
    <Stack
      component={Link}
      href={item.href}
      direction="row"
      alignItems="center"
      spacing={1.5}
      onClick={onNavigate}
      sx={{
        px: 1.75,
        py: 1.25,
        borderRadius: 2,
        textDecoration: "none",
        color: active ? "#fff" : SIDEBAR_MUTED,
        bgcolor: active ? SIDEBAR_ACTIVE : "transparent",
        fontWeight: active ? 700 : 500,
        transition: "background-color 0.15s, color 0.15s",
        boxShadow: active
          ? `0 10px 24px -10px ${alpha(SIDEBAR_ACTIVE, 0.7)}`
          : "none",
        "&:hover": {
          bgcolor: active ? SIDEBAR_ACTIVE : alpha("#fff", 0.04),
          color: active ? "#fff" : SIDEBAR_TEXT,
        },
      }}
    >
      <Box sx={{ display: "flex" }}>{item.icon}</Box>
      <Typography
        sx={{
          fontWeight: "inherit",
          fontSize: "0.9375rem",
        }}
      >
        {item.label}
      </Typography>
    </Stack>
  );
}

export default function DashboardShell({ user, children }: Props) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const initial = (user.name ?? user.email ?? "?")
    .trim()
    .charAt(0)
    .toUpperCase();
  const closeMobile = () => setMobileOpen(false);
  const pageName = pageNameFromPath(pathname);

  const drawerContent = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        bgcolor: SIDEBAR_BG,
        color: SIDEBAR_TEXT,
      }}
    >
      {/* Brand */}
      <Box sx={{ px: 2.5, pt: 2.75, pb: 2.5, flexShrink: 0 }}>
        <Stack
          component={Link}
          href={"/vocabulary" as Route}
          direction="row"
          alignItems="center"
          spacing={1.5}
          onClick={closeMobile}
          sx={{ textDecoration: "none", color: "inherit" }}
        >
          <Logo />
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "1.125rem",
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            <Box component="span" sx={{ color: "#a5b4fc" }}>
              Eng
            </Box>
            <Box component="span" sx={{ color: "#fff" }}>
              nova
            </Box>
          </Typography>
        </Stack>
      </Box>

      {/* Nav */}
      <Box
        component="nav"
        aria-label="Main"
        sx={{ px: 1.5, pt: 1.25, flex: 1, minHeight: 0 }}
      >
        <Stack spacing={0.5}>
          {NAV.map((item) => (
            <NavRow
              key={item.href}
              item={item}
              active={item.match(pathname)}
              onNavigate={closeMobile}
            />
          ))}
        </Stack>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          flexShrink: 0,
          borderTop: 1,
          borderColor: SIDEBAR_BORDER,
          px: 2,
          py: 2,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1.25}>
          <Avatar
            src={user.image ?? undefined}
            sx={{
              width: 36,
              height: 36,
              bgcolor: SIDEBAR_ACTIVE,
              fontSize: "0.875rem",
              fontWeight: 700,
            }}
          >
            {initial}
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              fontWeight={700}
              noWrap
              sx={{ color: "#fff", fontSize: "0.875rem", lineHeight: 1.2 }}
            >
              {user.name ?? "Learner"}
            </Typography>
            <Typography
              noWrap
              display="block"
              sx={{
                color: SIDEBAR_MUTED,
                fontSize: "0.75rem",
                lineHeight: 1.3,
              }}
            >
              {user.email}
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      {/* Mobile top bar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          display: { md: "none" },
          bgcolor: SIDEBAR_BG,
          color: "#fff",
        }}
      >
        <Toolbar sx={{ gap: 1, minHeight: 56 }}>
          <IconButton
            edge="start"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            sx={{ color: "#fff" }}
          >
            <MenuIcon />
          </IconButton>
          <Logo size={30} />
          <Typography
            component={Link}
            href={"/vocabulary" as Route}
            sx={{
              fontWeight: 700,
              fontSize: "1rem",
              color: "#fff",
              letterSpacing: "-0.02em",
              flex: 1,
              textDecoration: "none",
            }}
          >
            Engnova
          </Typography>
          <ThemeToggle size="small" />
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Box
        component="nav"
        sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              width: DRAWER_WIDTH,
              boxSizing: "border-box",
              bgcolor: SIDEBAR_BG,
              borderRight: "none",
            },
          }}
        >
          {drawerContent}
        </Drawer>
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              width: DRAWER_WIDTH,
              boxSizing: "border-box",
              bgcolor: SIDEBAR_BG,
              borderRight: "none",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* Main */}
      <Box
        component="main"
        sx={{
          flex: 1,
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          pt: { xs: 7, md: 0 },
          minWidth: 0,
          minHeight: 0,
          height: "100dvh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Desktop top bar */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            justifyContent: "space-between",
            px: { md: 4 },
            py: 1.25,
            borderBottom: 1,
            borderColor: "divider",
            bgcolor: "background.paper",
            flexShrink: 0,
          }}
        >
          <Typography
            variant="body2"
            fontWeight={600}
            color="text.primary"
            sx={{ fontSize: "0.875rem" }}
          >
            {pageName}
          </Typography>
          <ThemeToggle size="small" />
        </Box>

        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
