"use server";

import { revalidatePath } from "next/cache";
import type { Level } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";
import { bumpStreak } from "./vocabulary";

type Submission = {
  quizId: string;
  // answerId per questionId
  answers: Record<string, string>;
};

export type RandomQuizQuestion = {
  id: string;
  prompt: string;
  context: string | null;
  correctAnswerId: string;
  answers: { id: string; text: string }[];
};

export type RandomQuiz = {
  title: string;
  description: string;
  questions: RandomQuizQuestion[];
};

function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Generate a random multiple-choice quiz from vocabulary at the given level. */
export async function generateRandomVocabQuiz(
  level: Level,
  count = 10,
): Promise<RandomQuiz> {
  await getSessionUser();

  type Row = { id: string; word: string; meaning: string };
  // Pull a generous random sample so we have enough distractors.
  const pool: Row[] = await prisma.$queryRaw`
    SELECT id, word, meaning
    FROM Vocabulary
    WHERE level = ${level} AND meaning != ''
    ORDER BY RANDOM()
    LIMIT ${count * 5}
  `;

  if (pool.length < 4) {
    return {
      title: `${level.charAt(0)}${level.slice(1).toLowerCase()} Vocabulary Quiz`,
      description: "Not enough words at this level for a quiz yet.",
      questions: [],
    };
  }

  // Deduplicate meanings so distractors aren't identical to the correct one.
  const uniqueByMeaning = Array.from(
    new Map(pool.map((r) => [r.meaning.trim().toLowerCase(), r])).values(),
  );

  const targets = uniqueByMeaning.slice(0, Math.min(count, uniqueByMeaning.length));

  const questions: RandomQuizQuestion[] = targets.map((target, qIdx) => {
    const correctId = `q${qIdx}-c`;
    const distractors = shuffle(
      uniqueByMeaning.filter((r) => r.id !== target.id),
    ).slice(0, 3);

    const answers = shuffle([
      { id: correctId, text: target.meaning },
      ...distractors.map((d, dIdx) => ({
        id: `q${qIdx}-d${dIdx}`,
        text: d.meaning,
      })),
    ]);

    return {
      id: `q${qIdx}`,
      prompt: `What does "${target.word}" mean?`,
      context: null,
      correctAnswerId: correctId,
      answers,
    };
  });

  return {
    title: `${level.charAt(0)}${level.slice(1).toLowerCase()} Vocabulary Quiz`,
    description: `${questions.length} random words. A new quiz each time.`,
    questions,
  };
}

/** Record a finished random quiz attempt for progress tracking. */
export async function recordRandomQuizAttempt({
  score,
  total,
}: {
  score: number;
  total: number;
}) {
  const userId = (await getSessionUser()).id;
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

  await prisma.userProgress.create({
    data: {
      userId,
      skill: "VOCABULARY",
      score: percentage,
      minutes: Math.max(2, total),
    },
  });
  await bumpStreak(userId);

  revalidatePath("/quiz");
  return { score, total, percentage };
}

export async function submitQuiz({ quizId, answers }: Submission) {
  const userId = (await getSessionUser()).id;

  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    include: { questions: { include: { answers: true } } },
  });
  if (!quiz) throw new Error("Quiz not found");

  let correct = 0;
  const breakdown = quiz.questions.map((q) => {
    const selectedId = answers[q.id];
    const correctAnswer = q.answers.find((a) => a.isCorrect);
    const isCorrect = !!correctAnswer && correctAnswer.id === selectedId;
    if (isCorrect) correct++;
    return {
      questionId: q.id,
      selectedId: selectedId ?? null,
      correctAnswerId: correctAnswer?.id ?? null,
      isCorrect,
    };
  });

  const total = quiz.questions.length;
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

  await prisma.quizAttempt.create({
    data: { userId, quizId, score: correct, total, percentage },
  });
  await prisma.userProgress.create({
    data: {
      userId,
      skill: quiz.skill,
      score: percentage,
      minutes: Math.max(2, total),
    },
  });
  await bumpStreak(userId);

  revalidatePath("/vocabulary");
  return { score: correct, total, percentage, breakdown };
}
