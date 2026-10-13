"use client";

import { useActionState } from "react";
import { registerAction, type FormState } from "@/app/actions/auth";
import { Field } from "./field";

const initial: FormState = {};

export default function RegisterForm() {
  const [state, formAction, pending] = useActionState(registerAction, initial);
  const fe = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="mt-6 space-y-4">
      <Field
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        defaultValue={state.email}
        errors={fe.email}
      />
      <Field
        label="Password"
        name="password"
        type="password"
        autoComplete="new-password"
        errors={fe.password}
      />
      <Field
        label="Ulangi password"
        name="confirmPassword"
        type="password"
        autoComplete="new-password"
        errors={fe.confirmPassword}
      />
      <button
        disabled={pending}
        className="w-full rounded-full bg-sunshine py-3 font-bold text-forest shadow-md transition hover:scale-[1.02] disabled:opacity-60"
      >
        {pending ? "Memproses..." : "Daftar & Mulai"}
      </button>
    </form>
  );
}
