import Link from "next/link";
import { redirect } from "next/navigation";
import RegisterForm from "@/components/auth/register-form";
import { getCurrentUser } from "@/lib/session";

export const instant = false; // Membolehkan blocking route / render dinamis

export default async function DaftarPage() {
  if (await getCurrentUser()) redirect("/peta");

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-extrabold">Mulai Petualanganmu</h1>
        <p className="mt-2 text-forest/80">
          Sudah punya akun?{" "}
          <Link href="/masuk" className="font-semibold text-ocean underline">
            Masuk
          </Link>
        </p>
        <RegisterForm />
      </div>
    </main>
  );
}
