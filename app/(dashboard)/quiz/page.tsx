import type { Route } from "next";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/session";
import { vocabularySlugFromLevel } from "@/lib/utils";

export default async function QuizIndexPage() {
  const user = await getSessionUser();
  const slug = vocabularySlugFromLevel(user.level);
  redirect(`/quiz/${slug}` as Route);
}
