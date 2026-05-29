import { notFound } from "next/navigation";
import PageLayout from "@/components/PageLayout";
import QuizClient from "@/components/QuizClient";
import { generateRandomVocabQuiz } from "@/actions/quiz";
import { levelLabel, vocabularyLevelFromSlug } from "@/lib/utils";

type PageProps = { params: Promise<{ level: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { level: slug } = await params;
  const dbLevel = vocabularyLevelFromSlug(slug);
  const title = dbLevel ? `${levelLabel(dbLevel)} quiz` : "Quiz";
  return { title };
}

export default async function QuizLevelPage({ params }: PageProps) {
  const { level: slug } = await params;
  const dbLevel = vocabularyLevelFromSlug(slug);
  if (!dbLevel) notFound();

  const quiz = await generateRandomVocabQuiz(dbLevel, 10);

  return (
    <PageLayout maxWidth="xl" fillHeight>
      <QuizClient level={dbLevel} initialQuiz={quiz} />
    </PageLayout>
  );
}
