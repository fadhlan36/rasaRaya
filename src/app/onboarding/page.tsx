import { redirect } from "next/navigation";
import OnboardingFlow from "@/components/onboarding-flow";
import { requireUser } from "@/lib/session";

export const instant = false;

export default async function OnboardingPage() {
  const user = await requireUser();
  if (user.onboardedAt) redirect("/peta");

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <OnboardingFlow />
    </main>
  );
}
