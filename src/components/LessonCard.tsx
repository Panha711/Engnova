import {
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { levelColor, levelLabel } from "@/lib/utils";

type Props = {
  href: string;
  title: string;
  summary?: string | null;
  level: string;
  tag?: string;
};

export default function LessonCard({ href, title, summary, level, tag }: Props) {
  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: 2.5,
        "&:hover .lesson-arrow": { opacity: 1, transform: "translateX(0)" },
      }}
    >
      <CardActionArea href={href} sx={{ height: "100%", p: 0 }}>
        <CardContent sx={{ p: 2.75 }}>
          <Stack spacing={1.75}>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Chip size="small" color={levelColor(level)} label={levelLabel(level)} />
              {tag && (
                <Chip
                  size="small"
                  variant="outlined"
                  label={tag}
                  sx={{ borderColor: "divider", fontWeight: 600 }}
                />
              )}
            </Stack>
            <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.3, letterSpacing: "-0.01em" }}>
              {title}
            </Typography>
            {summary && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  lineHeight: 1.6,
                }}
              >
                {summary}
              </Typography>
            )}
            <Stack
              direction="row"
              alignItems="center"
              spacing={0.5}
              className="lesson-arrow"
              sx={{
                pt: 0.5,
                color: "primary.main",
                opacity: 0.55,
                transform: "translateX(-4px)",
                transition: "opacity 0.2s, transform 0.2s",
              }}
            >
              <Typography variant="body2" fontWeight={700}>
                Open lesson
              </Typography>
              <ArrowForwardIcon sx={{ fontSize: 18 }} />
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
