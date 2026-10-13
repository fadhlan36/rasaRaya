import Link from "next/link";
import { redirect } from "next/navigation";
import LoginForm from "@/components/auth/login-form";
import { getCurrentUser } from "@/lib/session";

export default async function MasukPage() {
  if (await getCurrentUser()) redirect("/peta");

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-extrabold">Masuk ke Petualangan</h1>
        <p className="mt-2 text-forest/80">
          Belum punya akun?{" "}
          <Link href="/daftar" className="font-semibold text-ocean underline">
            Daftar
          </Link>
        </p>
        <LoginForm />
      </div>
    </main>
  );
}
