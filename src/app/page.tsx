import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="text-sm font-semibold tracking-widest text-ocean uppercase">
        Petualangan Rasa Nusantara
      </p>
      <h1 className="text-4xl md:text-6xl font-extrabold text-forest max-w-2xl">
        Satu Nusantara. Seribu Cerita Rasa.
      </h1>
      <p className="max-w-xl text-forest/80">
        Jelajahi Indonesia dari Sabang sampai Merauke, satu rasa dalam satu
        waktu.
      </p>
      <Link
        href="/daftar"
        className="rounded-full bg-sunshine px-8 py-3 font-bold text-forest shadow-md transition hover:scale-105"
      >
        Mulai Petualangan
      </Link>
      <Link
        href="/masuk"
        className="text-sm font-semibold text-ocean underline"
      >
        Sudah punya akun? Masuk
      </Link>
    </main>
  );
}
