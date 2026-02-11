import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authConfig } from "@/lib/auth/auth.config";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authConfig);

  if (!session) {
    redirect("/login");
  }

  return <>{children}</>;
}
