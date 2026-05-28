import { notFound } from "next/navigation";
import { Box } from "@mui/material";
import BackLink from "@/components/BackLink";
import LessonContent from "@/components/LessonContent";
import LessonDetailHeader from "@/components/LessonDetailHeader";
import PageLayout from "@/components/PageLayout";
import { prisma } from "@/lib/prisma";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const lesson = await prisma.lesson.findUnique({ where: { slug } });
  return { title: lesson?.title ?? "Grammar lesson" };
}

export default async function GrammarLessonPage({ params }: PageProps) {
  const { slug } = await params;
  const lesson = await prisma.lesson.findUnique({ where: { slug } });
  if (!lesson || lesson.type !== "GRAMMAR") notFound();

  return (
    <PageLayout maxWidth="md">
      <BackLink href="/grammar" label="All grammar lessons" />

      <Box sx={{ mb: 4 }}>
        <LessonDetailHeader
          title={lesson.title}
          summary={lesson.summary}
          level={lesson.level}
          tag="Grammar"
        />
      </Box>

      <Box
        sx={{
          borderTop: 1,
          borderColor: "divider",
          pt: 4,
          pb: 2,
        }}
      >
        <LessonContent content={lesson.content} />
      </Box>
    </PageLayout>
  );
}
