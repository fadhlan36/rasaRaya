import { redirect } from "next/navigation";
import { logoutAction } from "@/app/actions/auth";
import { requireUser } from "@/lib/session";

export const instant = false;

export default async function PetaPage() {
  const user = await requireUser();
  if (!user.onboardedAt) redirect("/onboarding");

  return (
    <main className="min-h-screen p-6">
      <header className="flex items-center justify-between">
        <span className="text-xl font-extrabold">RasaRaya</span>
        <div className="flex items-center gap-4">
          <span className="rounded-full bg-jungle px-3 py-1 text-sm font-bold text-white">
            {user.xp} XP
          </span>
          <form action={logoutAction}>
            <button className="underline">Keluar</button>
          </form>
        </div>
      </header>
      <h1 className="mt-10 text-3xl font-extrabold">
        Ayo, lanjutkan perjalananmu, {user.nickname}!
      </h1>
      <p className="mt-2 text-forest/80">
        Peta interaktif akan hadir di langkah berikutnya.
      </p>
    </main>
  );
}
