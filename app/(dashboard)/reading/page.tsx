import Grid from "@mui/material/Grid2";
import { prisma } from "@/lib/prisma";
import LessonCard from "@/components/LessonCard";
import PageHeader from "@/components/PageHeader";
import PageLayout from "@/components/PageLayout";

export const metadata = { title: "Reading" };

export default async function ReadingPage() {
  const lessons = await prisma.lesson.findMany({
    where: { type: "READING" },
    orderBy: [{ level: "asc" }, { createdAt: "asc" }],
  });

  return (
    <PageLayout>
      <PageHeader
        title="Reading"
        subtitle="Short articles with highlighted vocabulary and comprehension questions."
      />
      <Grid container spacing={2.5}>
        {lessons.map((l) => (
          <Grid key={l.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <LessonCard
              href={`/reading/${l.slug}`}
              title={l.title}
              summary={l.summary}
              level={l.level}
              tag="Article"
            />
          </Grid>
        ))}
      </Grid>
    </PageLayout>
  );
}
