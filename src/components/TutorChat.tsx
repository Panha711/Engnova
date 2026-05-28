"use client";

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import {
  alpha,
  Box,
  IconButton,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import SendIcon from "@mui/icons-material/Send";
import { brandIndigo, accentPurple } from "@/lib/theme";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const STARTERS = [
  "What's the difference between 'a' and 'the'?",
  "Help me practice ordering food at a restaurant.",
  "Correct this: I am go to school yesterday.",
  "Teach me 5 new words about weather.",
];

function makeId() {
  return `m-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**")) {
      return (
        <Box
          key={i}
          component="strong"
          sx={{ fontWeight: 700, color: "primary.main" }}
        >
          {p.slice(2, -2)}
        </Box>
      );
    }
    return <span key={i}>{p}</span>;
  });
}

export default function TutorChat() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, pending]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || pending) return;
    setInput("");

    const userMsg: Message = { id: makeId(), role: "user", content: trimmed };
    const assistantId = makeId();
    const nextMessages = [...messages, userMsg];
    setMessages([
      ...nextMessages,
      { id: assistantId, role: "assistant", content: "" },
    ]);
    setPending(true);

    try {
      const res = await fetch("/api/tutor/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.ok || !res.body) {
        const errText = await res.text();
        setMessages((curr) =>
          curr.map((m) =>
            m.id === assistantId
              ? { ...m, content: `Sorry — ${errText || "something went wrong."}` }
              : m,
          ),
        );
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((curr) =>
          curr.map((m) => (m.id === assistantId ? { ...m, content: acc } : m)),
        );
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Network error";
      setMessages((curr) =>
        curr.map((m) =>
          m.id === assistantId
            ? { ...m, content: `Sorry — ${message}` }
            : m,
        ),
      );
    } finally {
      setPending(false);
    }
  }

  function handleKey(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minHeight: 0,
      }}
    >
      {/* Page header */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={1.75}
        sx={{ mb: 1, flexShrink: 0 }}
      >
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: 2,
            background: `linear-gradient(135deg, ${brandIndigo} 0%, ${accentPurple} 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
          }}
        >
          <AutoAwesomeOutlinedIcon sx={{ fontSize: 22 }} />
        </Box>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 800,
            letterSpacing: "-0.02em",
            fontSize: { xs: "1.5rem", md: "1.75rem" },
          }}
        >
          AI Tutor
        </Typography>
      </Stack>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 2.5, fontSize: "0.875rem", ml: 7.5 }}
      >
        Practice English with a patient AI tutor. Ask anything in English or Khmer.
      </Typography>

      {/* Chat area */}
      <Box
        ref={scrollRef}
        sx={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          pr: 1,
          mb: 2,
        }}
      >
        {messages.length === 0 ? (
          <EmptyState onPick={(t) => send(t)} disabled={pending} />
        ) : (
          <Stack spacing={2}>
            {messages.map((m) => (
              <Bubble key={m.id} role={m.role}>
                {m.content ? (
                  renderInline(m.content)
                ) : (
                  <TypingDots />
                )}
              </Bubble>
            ))}
          </Stack>
        )}
      </Box>

      {/* Composer */}
      <Box
        sx={{
          flexShrink: 0,
          display: "flex",
          alignItems: "flex-end",
          gap: 1,
          p: 1,
          borderRadius: 3,
          border: 1,
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <TextField
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Ask your tutor in English or Khmer…"
          multiline
          maxRows={5}
          fullWidth
          variant="standard"
          slotProps={{ input: { disableUnderline: true } }}
          sx={{
            px: 1.5,
            py: 1,
            "& .MuiInputBase-root": { fontSize: "0.9375rem" },
          }}
          disabled={pending}
        />
        <IconButton
          onClick={() => send(input)}
          disabled={pending || !input.trim()}
          aria-label="Send"
          sx={{
            color: "#fff",
            background: `linear-gradient(135deg, ${brandIndigo}, ${accentPurple})`,
            width: 40,
            height: 40,
            "&:hover": { opacity: 0.9 },
            "&.Mui-disabled": {
              background: isDark
                ? alpha("#fff", 0.08)
                : alpha("#0f172a", 0.08),
              color: "text.disabled",
            },
          }}
        >
          <SendIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>
    </Box>
  );
}

function Bubble({
  role,
  children,
}: {
  role: "user" | "assistant";
  children: ReactNode;
}) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const isUser = role === "user";
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
      }}
    >
      <Box
        sx={{
          maxWidth: "85%",
          px: 2,
          py: 1.25,
          borderRadius: 2.5,
          ...(isUser
            ? {
                background: `linear-gradient(135deg, ${brandIndigo}, ${accentPurple})`,
                color: "#fff",
                borderTopRightRadius: 6,
              }
            : {
                bgcolor: "background.paper",
                color: "text.primary",
                border: 1,
                borderColor: "divider",
                borderTopLeftRadius: 6,
              }),
        }}
      >
        <Typography
          component="div"
          sx={{
            fontSize: "0.9375rem",
            lineHeight: 1.6,
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            "& strong": isUser ? { color: "#fff" } : undefined,
          }}
        >
          {children}
        </Typography>
      </Box>
    </Box>
  );
}

function TypingDots() {
  return (
    <Box
      component="span"
      sx={{
        display: "inline-flex",
        gap: 0.5,
        "& > span": {
          width: 6,
          height: 6,
          borderRadius: "50%",
          bgcolor: "text.disabled",
          animation: "tutor-dot 1.2s infinite ease-in-out",
        },
        "& > span:nth-of-type(2)": { animationDelay: "0.15s" },
        "& > span:nth-of-type(3)": { animationDelay: "0.3s" },
        "@keyframes tutor-dot": {
          "0%, 60%, 100%": { opacity: 0.3 },
          "30%": { opacity: 1 },
        },
      }}
    >
      <span />
      <span />
      <span />
    </Box>
  );
}

function EmptyState({
  onPick,
  disabled,
}: {
  onPick: (text: string) => void;
  disabled: boolean;
}) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 320,
        textAlign: "center",
        px: 2,
      }}
    >
      <Box
        sx={{
          width: 60,
          height: 60,
          borderRadius: 2.5,
          background: `linear-gradient(135deg, ${brandIndigo}, ${accentPurple})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          mb: 2,
        }}
      >
        <AutoAwesomeOutlinedIcon sx={{ fontSize: 28 }} />
      </Box>
      <Typography
        variant="h6"
        sx={{ fontWeight: 700, mb: 0.75, letterSpacing: "-0.01em" }}
      >
        Practice with your tutor
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 3, maxWidth: 380, fontSize: "0.875rem" }}
      >
        Try a starter below, or type any question.
      </Typography>
      <Stack spacing={1.25} sx={{ width: "100%", maxWidth: 520 }}>
        {STARTERS.map((s) => (
          <Box
            key={s}
            component="button"
            onClick={() => onPick(s)}
            disabled={disabled}
            sx={{
              textAlign: "left",
              cursor: "pointer",
              border: 1,
              borderColor: "divider",
              bgcolor: "background.paper",
              borderRadius: 2,
              px: 2,
              py: 1.25,
              fontFamily: "inherit",
              fontSize: "0.875rem",
              color: "text.primary",
              transition: "border-color 0.15s, background-color 0.15s",
              "&:hover": {
                borderColor: alpha(brandIndigo, isDark ? 0.4 : 0.3),
                bgcolor: isDark
                  ? alpha(brandIndigo, 0.06)
                  : alpha(brandIndigo, 0.04),
              },
              "&:disabled": { opacity: 0.5, cursor: "not-allowed" },
            }}
          >
            {s}
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
