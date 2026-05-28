import type { Level } from "@prisma/client";

export const VOCABULARY_LEVELS = [
  { slug: "beginner", level: "BEGINNER" as const, label: "Beginner" },
  { slug: "intermediate", level: "INTERMEDIATE" as const, label: "Intermediate" },
  { slug: "advanced", level: "ADVANCED" as const, label: "Advanced" },
] as const;

export type VocabularyLevelSlug = (typeof VOCABULARY_LEVELS)[number]["slug"];

export function vocabularyLevelFromSlug(slug: string): Level | null {
  const match = VOCABULARY_LEVELS.find((item) => item.slug === slug);
  return match?.level ?? null;
}

export function vocabularySlugFromLevel(level: Level): VocabularyLevelSlug {
  const match = VOCABULARY_LEVELS.find((item) => item.level === level);
  return match?.slug ?? "beginner";
}

export function levelLabel(level: Level | string): string {
  switch (level) {
    case "BEGINNER":
      return "Beginner";
    case "INTERMEDIATE":
      return "Intermediate";
    case "ADVANCED":
      return "Advanced";
    default:
      return String(level);
  }
}

export function levelColor(
  level: Level | string,
): "default" | "primary" | "success" | "warning" | "info" {
  switch (level) {
    case "BEGINNER":
      return "success";
    case "INTERMEDIATE":
      return "info";
    case "ADVANCED":
      return "warning";
    default:
      return "default";
  }
}

export function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

export function skillLabel(skill: string): string {
  return skill.charAt(0).toUpperCase() + skill.slice(1).toLowerCase();
}

export function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

export function lastNDays(n: number): Date[] {
  const today = startOfDay(new Date());
  const out: Date[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    out.push(d);
  }
  return out;
}

export function formatDayShort(d: Date): string {
  return d.toLocaleDateString(undefined, { weekday: "short" });
}
