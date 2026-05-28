import DashboardShell from "@/components/DashboardShell";
import { getSessionUser } from "@/lib/session";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUser();
  return <DashboardShell user={user}>{children}</DashboardShell>;
}
