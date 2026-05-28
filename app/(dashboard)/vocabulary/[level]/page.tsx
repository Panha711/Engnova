import { notFound } from "next/navigation";
import type { Level } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";
import PageLayout from "@/components/PageLayout";
import VocabularyClient from "@/components/VocabularyClient";
import { levelLabel, vocabularyLevelFromSlug } from "@/lib/utils";

/** Matches Prisma Vocabulary fields used on this page (includes meaningKh). */
type VocabularyWord = {
  id: string;
  word: string;
  meaning: string;
  meaningKh: string | null;
  example: string | null;
  pronunciation: string | null;
  partOfSpeech: string | null;
  level: Level;
};

type PageProps = { params: Promise<{ level: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { level: slug } = await params;
  const dbLevel = vocabularyLevelFromSlug(slug);
  const title = dbLevel ? `${levelLabel(dbLevel)} vocabulary` : "Vocabulary";
  return { title };
}

export default async function VocabularyLevelPage({ params }: PageProps) {
  const { level: slug } = await params;
  const dbLevel = vocabularyLevelFromSlug(slug);
  if (!dbLevel) notFound();

  const user = await getSessionUser();

  const [rawWords, savedWordsRaw, quiz, rawCounts] = await Promise.all([
    // Raw query ensures meaningKh is returned even if the generated client is stale.
    prisma.$queryRaw<VocabularyWord[]>`
      SELECT id, word, meaning, meaningKh, example, pronunciation, partOfSpeech, level
      FROM Vocabulary
      WHERE level = ${dbLevel}
      ORDER BY word ASC
    `,
    prisma.$queryRaw<VocabularyWord[]>`
      SELECT v.id, v.word, v.meaning, v.meaningKh, v.example, v.pronunciation, v.partOfSpeech, v.level
      FROM Vocabulary v
      INNER JOIN SavedWord s ON s.vocabularyId = v.id
      WHERE s.userId = ${user.id}
      ORDER BY v.word ASC
    `,
    prisma.quiz.findMany({
      where: { skill: "VOCABULARY" },
      orderBy: { createdAt: "asc" },
      include: {
        questions: { include: { answers: true }, orderBy: { position: "asc" } },
      },
    }),
    prisma.vocabulary.groupBy({
      by: ["level"],
      _count: { _all: true },
    }),
  ]);

  const levelCounts: Record<Level, number> = {
    BEGINNER: 0,
    INTERMEDIATE: 0,
    ADVANCED: 0,
  };
  for (const row of rawCounts) {
    levelCounts[row.level] = row._count._all;
  }

  function toWord(w: VocabularyWord) {
    return {
      id: w.id,
      word: w.word,
      meaning: w.meaning,
      meaningKh: w.meaningKh ?? null,
      example: w.example,
      pronunciation: w.pronunciation,
      partOfSpeech: w.partOfSpeech,
      level: w.level,
    };
  }

  const words = rawWords.map(toWord);
  const savedWords = savedWordsRaw.map(toWord);

  const quizzesByLevel: Partial<Record<Level, {
    id: string;
    title: string;
    description: string | null;
    questions: { id: string; prompt: string; context: string | null; answers: { id: string; text: string }[] }[];
  }>> = {};
  for (const q of quiz) {
    if (quizzesByLevel[q.level]) continue;
    quizzesByLevel[q.level] = {
      id: q.id,
      title: q.title,
      description: q.description,
      questions: q.questions.map((qq) => ({
        id: qq.id,
        prompt: qq.prompt,
        context: qq.context,
        answers: qq.answers.map((a) => ({ id: a.id, text: a.text })),
      })),
    };
  }

  return (
    <PageLayout maxWidth="xl" fillHeight>
      <VocabularyClient
        level={dbLevel}
        levelCounts={levelCounts}
        words={words}
        savedWords={savedWords}
        savedIds={savedWordsRaw.map((w) => w.id)}
        quizzesByLevel={quizzesByLevel}
      />
    </PageLayout>
  );
}
