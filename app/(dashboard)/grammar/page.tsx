import { prisma } from "@/lib/prisma";
import PageLayout from "@/components/PageLayout";
import GrammarListClient from "@/components/GrammarListClient";

export const metadata = { title: "Grammar" };

const LEVEL_RANK: Record<string, number> = {
  BEGINNER: 0,
  INTERMEDIATE: 1,
  ADVANCED: 2,
};

export default async function GrammarPage() {
  const lessonsRaw = await prisma.lesson.findMany({
    where: { type: "GRAMMAR" },
    orderBy: [{ createdAt: "asc" }],
    select: {
      id: true,
      slug: true,
      title: true,
      summary: true,
      level: true,
      content: true,
    },
  });

  const lessons = lessonsRaw
    .map((l) => {
      const sections = (l.content.match(/^##\s/gm) ?? []).length;
      const wordCount = l.content.split(/\s+/).filter(Boolean).length;
      const minutes = Math.max(1, Math.round(wordCount / 200));
      return {
        id: l.id,
        slug: l.slug,
        title: l.title,
        summary: l.summary,
        level: l.level,
        sections,
        minutes,
      };
    })
    .sort((a, b) => LEVEL_RANK[a.level] - LEVEL_RANK[b.level]);

  return (
    <PageLayout maxWidth="xl">
      <GrammarListClient lessons={lessons} />
    </PageLayout>
  );
}
