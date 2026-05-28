import Grid from "@mui/material/Grid2";
import { prisma } from "@/lib/prisma";
import LessonCard from "@/components/LessonCard";
import PageHeader from "@/components/PageHeader";
import PageLayout from "@/components/PageLayout";

export const metadata = { title: "Listening" };

export default async function ListeningPage() {
  const lessons = await prisma.lesson.findMany({
    where: { type: "LISTENING" },
    orderBy: [{ level: "asc" }, { createdAt: "asc" }],
  });

  return (
    <PageLayout>
      <PageHeader
        title="Listening"
        subtitle="Audio dialogues with transcripts and listening quizzes."
      />
      <Grid container spacing={2.5}>
        {lessons.map((l) => (
          <Grid key={l.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <LessonCard
              href={`/listening/${l.slug}`}
              title={l.title}
              summary={l.summary}
              level={l.level}
              tag="Audio"
            />
          </Grid>
        ))}
      </Grid>
    </PageLayout>
  );
}
