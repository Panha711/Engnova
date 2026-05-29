"use server";

import { revalidatePath } from "next/cache";
import { GoogleGenAI, Type } from "@google/genai";
import type { Level } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";

async function requireUserId() {
  return (await getSessionUser()).id;
}

type CreateWordInput = {
  word: string;
  meaning: string;
  meaningKh?: string;
  example?: string;
  partOfSpeech?: string;
  level: Level;
};

export async function createWord(
  input: CreateWordInput,
): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  await requireUserId();

  const word = input.word.trim();
  const meaning = input.meaning.trim();
  if (!word) return { ok: false, error: "Word is required." };
  if (!meaning) return { ok: false, error: "English meaning is required." };

  const existing = await prisma.vocabulary.findUnique({ where: { word } });
  if (existing) {
    return { ok: false, error: `"${word}" is already in the vocabulary.` };
  }

  const created = await prisma.vocabulary.create({
    data: {
      word,
      meaning,
      meaningKh: input.meaningKh?.trim() || null,
      example: input.example?.trim() || null,
      partOfSpeech: input.partOfSpeech?.trim() || null,
      level: input.level,
    },
    select: { id: true },
  });

  revalidatePath("/vocabulary", "layout");
  return { ok: true, id: created.id };
}

type UpdateWordInput = CreateWordInput & { id: string };

export async function updateWord(
  input: UpdateWordInput,
): Promise<{ ok: true } | { ok: false; error: string }> {
  await requireUserId();

  const word = input.word.trim();
  const meaning = input.meaning.trim();
  if (!word) return { ok: false, error: "Word is required." };
  if (!meaning) return { ok: false, error: "English meaning is required." };

  // If the word string changed, make sure the new one isn't a duplicate.
  const duplicate = await prisma.vocabulary.findFirst({
    where: { word, NOT: { id: input.id } },
    select: { id: true },
  });
  if (duplicate) {
    return { ok: false, error: `"${word}" is already in the vocabulary.` };
  }

  await prisma.vocabulary.update({
    where: { id: input.id },
    data: {
      word,
      meaning,
      meaningKh: input.meaningKh?.trim() || null,
      example: input.example?.trim() || null,
      partOfSpeech: input.partOfSpeech?.trim() || null,
      level: input.level,
    },
  });

  revalidatePath("/vocabulary", "layout");
  return { ok: true };
}

type Generated = {
  meaning: string;
  meaningKh: string;
  example: string;
  partOfSpeech: string;
};

const GEN_SYSTEM = `You write vocabulary entries for an English-learning app used by Khmer speakers.
Given an English word or phrase, return JSON with these fields:
- meaning: a short, simple English definition (max 90 chars)
- meaningKh: the Khmer translation, in Khmer script (1–5 words)
- example: one short example sentence using the word naturally (max 100 chars)
- partOfSpeech: one of "noun", "verb", "adjective", "adverb", "preposition", "phrase", "interjection"

Rules:
- Keep the meaning beginner-friendly.
- The example must include the original word.
- If the input is a verb phrase like "get up", use "verb" as the part of speech.`;

export async function generateWordDetails(
  word: string,
): Promise<{ ok: true; data: Generated } | { ok: false; error: string }> {
  await requireUserId();

  const trimmed = word.trim();
  if (!trimmed) return { ok: false, error: "Enter a word first." };
  if (!process.env.GEMINI_API_KEY) {
    return {
      ok: false,
      error: "AI is not configured. Add GEMINI_API_KEY to .env.",
    };
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Word: "${trimmed}"`,
      config: {
        systemInstruction: GEN_SYSTEM,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            meaning: { type: Type.STRING },
            meaningKh: { type: Type.STRING },
            example: { type: Type.STRING },
            partOfSpeech: { type: Type.STRING },
          },
          required: ["meaning", "meaningKh", "example", "partOfSpeech"],
        },
      },
    });

    const raw = response.text;
    if (!raw) return { ok: false, error: "AI returned no text." };

    const parsed = JSON.parse(raw) as Partial<Generated>;
    if (
      typeof parsed.meaning !== "string" ||
      typeof parsed.meaningKh !== "string" ||
      typeof parsed.example !== "string" ||
      typeof parsed.partOfSpeech !== "string"
    ) {
      return { ok: false, error: "AI response was missing fields." };
    }

    return {
      ok: true,
      data: {
        meaning: parsed.meaning.trim(),
        meaningKh: parsed.meaningKh.trim(),
        example: parsed.example.trim(),
        partOfSpeech: parsed.partOfSpeech.trim().toLowerCase(),
      },
    };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to generate word details.";
    return { ok: false, error: message };
  }
}

export async function toggleSaveWord(vocabularyId: string) {
  const userId = await requireUserId();
  const existing = await prisma.savedWord.findUnique({
    where: { userId_vocabularyId: { userId, vocabularyId } },
  });
  if (existing) {
    await prisma.savedWord.delete({ where: { id: existing.id } });
  } else {
    await prisma.savedWord.create({ data: { userId, vocabularyId } });
  }
  revalidatePath("/vocabulary", "layout");
  return { saved: !existing };
}

export async function recordFlashcardSession(reviewed: number) {
  const userId = await requireUserId();
  if (reviewed <= 0) return;
  await prisma.userProgress.create({
    data: {
      userId,
      skill: "VOCABULARY",
      score: Math.min(100, reviewed * 10),
      minutes: Math.max(1, Math.round(reviewed / 4)),
    },
  });
  await bumpStreak(userId);
  revalidatePath("/vocabulary", "layout");
}

export async function bumpStreak(userId: string) {
  const profile = await prisma.profile.findUnique({ where: { userId } });
  if (!profile) return;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const last = profile.lastActiveOn ? new Date(profile.lastActiveOn) : null;
  if (last) last.setHours(0, 0, 0, 0);

  let streak = profile.currentStreak;
  if (!last) {
    streak = 1;
  } else {
    const diff = Math.floor((today.getTime() - last.getTime()) / 86400000);
    if (diff === 0) {
      // already counted today
    } else if (diff === 1) {
      streak += 1;
    } else {
      streak = 1;
    }
  }
  await prisma.profile.update({
    where: { userId },
    data: {
      currentStreak: streak,
      longestStreak: Math.max(profile.longestStreak, streak),
      lastActiveOn: new Date(),
    },
  });
}
