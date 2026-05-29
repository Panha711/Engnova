import { notFound } from "next/navigation";
import { alpha, Box, Stack, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SegmentIcon from "@mui/icons-material/Segment";
import BackLink from "@/components/BackLink";
import GrammarReader from "@/components/GrammarReader";
import LessonContent from "@/components/LessonContent";
import LessonNav from "@/components/LessonNav";
import PageLayout from "@/components/PageLayout";
import { prisma } from "@/lib/prisma";
import { extractHeadings } from "@/lib/lessonHeadings";
import { levelLabel } from "@/lib/utils";

type PageProps = { params: Promise<{ slug: string }> };

const LEVEL_RANK: Record<string, number> = {
  BEGINNER: 0,
  INTERMEDIATE: 1,
  ADVANCED: 2,
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

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const lesson = await prisma.lesson.findUnique({ where: { slug } });
  return { title: lesson?.title ?? "Grammar lesson" };
}

export default async function GrammarLessonPage({ params }: PageProps) {
  const { slug } = await params;
  const lesson = await prisma.lesson.findUnique({ where: { slug } });
  if (!lesson || lesson.type !== "GRAMMAR") notFound();

  const allLessons = await prisma.lesson.findMany({
    where: { type: "GRAMMAR" },
    select: { slug: true, title: true, level: true, createdAt: true },
  });

  const ordered = [...allLessons].sort((a, b) => {
    const lr = LEVEL_RANK[a.level] - LEVEL_RANK[b.level];
    if (lr !== 0) return lr;
    return a.createdAt.getTime() - b.createdAt.getTime();
  });
  const index = ordered.findIndex((l) => l.slug === slug);
  const prev = index > 0 ? ordered[index - 1] : null;
  const next =
    index >= 0 && index < ordered.length - 1 ? ordered[index + 1] : null;

  const headings = extractHeadings(lesson.content);
  const wordCount = lesson.content.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(wordCount / 200));
  const tint = levelTint(lesson.level);

  const header = (
    <Box>
      <Stack
        direction="row"
        alignItems="baseline"
        flexWrap="wrap"
        useFlexGap
        sx={{ gap: 1.5, mb: 1 }}
      >
   
        <Typography
          component="h1"
          sx={{
            fontWeight: 800,
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            fontSize: { xs: "1.5rem", md: "1.875rem" },
            flex: 1,
            minWidth: 0,
          }}
        >
          {lesson.title}
        </Typography>
      </Stack>

      {/* Row 2: summary + meta inline */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "flex-start", sm: "flex-end" }}
        sx={{ gap: { xs: 0.75, sm: 2 } }}
      >
        <Typography
          color="text.secondary"
          sx={{
            fontSize: "0.9375rem",
            lineHeight: 1.55,
            flex: 1,
            minWidth: 0,
          }}
        >
          {lesson.summary}
        </Typography>
        <Stack
          direction="row"
          spacing={1.75}
          sx={{
            color: "text.disabled",
            fontSize: "0.75rem",
            fontWeight: 600,
            flexShrink: 0,
            whiteSpace: "nowrap",
          }}
        >
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <AccessTimeIcon sx={{ fontSize: 13 }} />
            <span>{minutes} min</span>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <SegmentIcon sx={{ fontSize: 13 }} />
            <span>
              {headings.length}{" "}
              {headings.length === 1 ? "section" : "sections"}
            </span>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );

  return (
    <PageLayout maxWidth="lg" fillHeight>
      <Box sx={{ flexShrink: 0, mb: 2 }}>
        <BackLink href="/grammar" label="Grammar" />
      </Box>

      <GrammarReader header={header} headings={headings}>
        <Box sx={{ borderTop: 1, borderColor: "divider", pt: 4 }}>
          <LessonContent content={lesson.content} />
        </Box>
        <LessonNav prev={prev} next={next} basePath="/grammar" />
      </GrammarReader>
    </PageLayout>
  );
}
