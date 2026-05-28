import { notFound } from "next/navigation";
import { Divider, Typography } from "@mui/material";
import BackLink from "@/components/BackLink";
import ContentCard from "@/components/ContentCard";
import LessonDetailHeader from "@/components/LessonDetailHeader";
import ListeningPlayer from "@/components/ListeningPlayer";
import PageLayout from "@/components/PageLayout";
import QuizRunner from "@/components/QuizRunner";
import { prisma } from "@/lib/prisma";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const lesson = await prisma.lesson.findUnique({ where: { slug } });
  return { title: lesson?.title ?? "Listening" };
}

export default async function ListeningLessonPage({ params }: PageProps) {
  const { slug } = await params;
  const lesson = await prisma.lesson.findUnique({
    where: { slug },
    include: {
      quizzes: {
        include: { questions: { include: { answers: true }, orderBy: { position: "asc" } } },
      },
    },
  });
  if (!lesson || lesson.type !== "LISTENING") notFound();
  const quiz = lesson.quizzes[0];

  return (
    <PageLayout maxWidth="md">
      <BackLink href="/listening" label="All listening lessons" />
      <ContentCard>
        <LessonDetailHeader
          title={lesson.title}
          summary={lesson.summary}
          level={lesson.level}
          tag="Listening"
        />
        <Divider sx={{ my: 3 }} />
        <ListeningPlayer audioUrl={lesson.audioUrl} transcript={lesson.transcript} />
      </ContentCard>

      {quiz && (
        <>
          <Typography variant="h5" sx={{ mt: 4, mb: 2, fontWeight: 700 }}>
            Listening quiz
          </Typography>
          <QuizRunner
            quizId={quiz.id}
            title={quiz.title}
            description={quiz.description}
            questions={quiz.questions.map((q) => ({
              id: q.id,
              prompt: q.prompt,
              context: q.context,
              answers: q.answers.map((a) => ({ id: a.id, text: a.text })),
            }))}
          />
        </>
      )}
    </PageLayout>
  );
}
