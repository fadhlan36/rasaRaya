"use client";

import { useActionState, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { onboardingAction, type FormState } from "@/app/actions/auth";

const initial: FormState = {};

export default function OnboardingFlow() {
  const [step, setStep] = useState(1);
  const [nickname, setNickname] = useState("");
  const [state, formAction, pending] = useActionState(
    onboardingAction,
    initial,
  );
  const nicknameOk = nickname.trim().length >= 3;

  return (
    <MotionConfig reducedMotion="user">
      <form
        action={formAction}
        className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg"
      >
        <input type="hidden" name="nickname" value={nickname} />
        <p className="text-sm font-semibold text-ocean">
          Langkah {step} dari 3
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="mt-3 space-y-4"
          >
            {step === 1 && (
              <>
                <h1 className="text-2xl font-extrabold">
                  Siapa nama panggilanmu, Penjelajah?
                </h1>
                <input
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (nicknameOk) setStep(2);
                    }
                  }}
                  maxLength={20}
                  placeholder="Contoh: Si Pelancong"
                  aria-label="Nama panggilan"
                  className="w-full rounded-xl border-2 border-forest/20 px-4 py-3 outline-none focus:border-ocean"
                />
                <button
                  type="button"
                  disabled={!nicknameOk}
                  onClick={() => setStep(2)}
                  className="w-full rounded-full bg-sunshine py-3 font-bold text-forest disabled:opacity-50"
                >
                  Lanjut
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <h1 className="text-2xl font-extrabold">Cara bermain</h1>
                <ul className="list-disc space-y-2 pl-5 text-forest/90">
                  <li>
                    Baca cerita kuliner tiap daerah, lalu kerjakan misinya.
                  </li>
                  <li>
                    Capai skor minimal 60% untuk lulus dan membuka daerah
                    berikutnya.
                  </li>
                  <li>Dapatkan XP dan kartu makanan untuk koleksimu.</li>
                </ul>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="w-full rounded-full bg-sunshine py-3 font-bold text-forest"
                >
                  Lanjut
                </button>
              </>
            )}

            {step === 3 && (
              <>
                <h1 className="text-2xl font-extrabold">
                  Perjalananmu dimulai dari Sabang
                </h1>
                <p className="text-forest/90">
                  Halo, {nickname.trim()}! Peta sudah siap. Setiap pengetahuan
                  membuka jalan menuju daerah berikutnya.
                </p>
                <button
                  disabled={pending}
                  className="w-full rounded-full bg-sunshine py-3 font-bold text-forest disabled:opacity-60"
                >
                  {pending ? "Menyiapkan peta..." : "Berangkat ke Sabang"}
                </button>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {state.error && (
          <p role="alert" className="mt-4 text-sm text-red-700">
            {state.error}
          </p>
        )}

        {step > 1 && (
          <button
            disabled={pending}
            className="mt-4 w-full text-sm text-forest/70 underline"
          >
            Lewati tutorial
          </button>
        )}
      </form>
    </MotionConfig>
  );
}
