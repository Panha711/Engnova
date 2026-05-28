"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";
import { bumpStreak } from "./vocabulary";

type Submission = {
  quizId: string;
  // answerId per questionId
  answers: Record<string, string>;
};

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
