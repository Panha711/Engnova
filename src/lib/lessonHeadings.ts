export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/\*\*/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

export type LessonHeading = { id: string; label: string };

/** Strip a leading "1. " / "12. " so the slug matches what LessonContent uses. */
function stripLeadingNumber(text: string): string {
  const m = text.match(/^\d+\.\s+(.+)$/);
  return m ? m[1] : text;
}

export function extractHeadings(content: string): LessonHeading[] {
  const lines = content.split(/\r?\n/);
  const used = new Map<string, number>();
  const out: LessonHeading[] = [];
  for (const raw of lines) {
    const line = raw.trim();
    if (!line.startsWith("## ")) continue;
    const label = line.slice(3).replace(/\*\*/g, "").trim();
    if (!label) continue;
    const slugSource = stripLeadingNumber(label);
    const base = slugifyHeading(slugSource);
    const seen = used.get(base) ?? 0;
    const id = seen === 0 ? base : `${base}-${seen}`;
    used.set(base, seen + 1);
    out.push({ id, label });
  }
  return out;
}

/** Pull "Lesson 7" or "B1 Lesson 7" out of a title; return number + cleaned rest. */
export function parseLessonNumber(title: string): {
  number: string | null;
  rest: string;
} {
  const m = title.match(/^(?:[A-Z]\d+\s+)?Lesson\s+(\d+)\s*:\s*(.+)$/i);
  if (m) {
    const n = parseInt(m[1], 10);
    return { number: String(n).padStart(2, "0"), rest: m[2].trim() };
  }
  return { number: null, rest: title };
}
