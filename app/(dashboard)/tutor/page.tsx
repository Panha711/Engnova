import PageLayout from "@/components/PageLayout";
import TutorChat from "@/components/TutorChat";

export const metadata = { title: "AI Tutor" };

export default function TutorPage() {
  return (
    <PageLayout maxWidth="md" fillHeight>
      <TutorChat />
    </PageLayout>
  );
}
