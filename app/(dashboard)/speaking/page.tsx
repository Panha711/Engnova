import PageHeader from "@/components/PageHeader";
import PageLayout from "@/components/PageLayout";
import SpeakingPractice, { type SpeakingPrompt } from "@/components/SpeakingPractice";

export const metadata = { title: "Speaking" };

const PROMPTS: SpeakingPrompt[] = [
  {
    id: "intro",
    level: "BEGINNER",
    prompt: "Introduce yourself in 4–5 sentences.",
    hint: "Talk about your name, where you live, and one hobby you enjoy.",
  },
  {
    id: "weekend",
    level: "BEGINNER",
    prompt: "Describe what you usually do on weekends.",
    hint: "Use the present simple and connect ideas with 'and', 'but', 'or'.",
  },
  {
    id: "pros-cons-remote",
    level: "INTERMEDIATE",
    prompt:
      "What are the pros and cons of working from home? Give one example for each.",
    hint: "Try linking words like 'however', 'on the other hand', or 'for example'.",
  },
  {
    id: "ai-future",
    level: "ADVANCED",
    prompt:
      "How do you think AI will change the way people learn languages in the next 10 years?",
    hint: "Make a clear prediction and support it with at least two reasons.",
  },
];

export default function SpeakingPage() {
  return (
    <PageLayout maxWidth="md">
      <PageHeader
        title="Speaking"
        subtitle="Practice with prompts. Record yourself with the mic or type your answer, then get instant feedback."
      />
      <SpeakingPractice prompts={PROMPTS} />
    </PageLayout>
  );
}
