import { alpha, Box, Stack, Typography } from "@mui/material";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import { levelLabel } from "@/lib/utils";

type Props = {
  title: string;
  summary: string;
  level: string;
  tag: string;
};

function levelTint(level: string) {
  switch (level) {
    case "BEGINNER":
      return { text: "#16a34a", bg: alpha("#16a34a", 0.1) };
    case "INTERMEDIATE":
      return { text: "#2563eb", bg: alpha("#2563eb", 0.1) };
    case "ADVANCED":
      return { text: "#d97706", bg: alpha("#d97706", 0.1) };
    default:
      return { text: "#64748b", bg: alpha("#64748b", 0.1) };
  }
}

export default function LessonDetailHeader({
  title,
  summary,
  level,
  tag,
}: Props) {
  const tint = levelTint(level);
  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={1.25} alignItems="center" flexWrap="wrap" useFlexGap>
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 0.5,
            px: 1.25,
            py: 0.375,
            borderRadius: 999,
            bgcolor: tint.bg,
            color: tint.text,
            fontSize: "0.6875rem",
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          <Box
            sx={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              bgcolor: tint.text,
            }}
          />
          {levelLabel(level)}
        </Box>
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 0.5,
            px: 1.25,
            py: 0.375,
            borderRadius: 999,
            color: "text.secondary",
            fontSize: "0.6875rem",
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          <MenuBookOutlinedIcon sx={{ fontSize: 14 }} />
          {tag}
        </Box>
      </Stack>
      <Typography
        variant="h3"
        component="h1"
        sx={{
          fontWeight: 800,
          letterSpacing: "-0.025em",
          lineHeight: 1.15,
          fontSize: { xs: "1.875rem", md: "2.25rem" },
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{
          lineHeight: 1.65,
          fontSize: "1.0625rem",
          maxWidth: 640,
        }}
      >
        {summary}
      </Typography>
    </Stack>
  );
}
