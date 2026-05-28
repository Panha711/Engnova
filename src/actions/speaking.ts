"use server";

import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";
import { bumpStreak } from "./vocabulary";

export async function saveSpeakingResponse(promptId: string, answer: string) {
  const userId = (await getSessionUser()).id;
  await prisma.userProgress.create({
    data: {
      userId,
      skill: "SPEAKING",
      score: Math.min(100, Math.max(20, answer.split(/\s+/).length * 5)),
      minutes: 2,
    },
  });
  await bumpStreak(userId);
  return { promptId, length: answer.length };
}
