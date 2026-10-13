"use server";

import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";
import { signIn, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";
import { loginSchema, nicknameSchema, registerSchema } from "@/lib/validators";

export type FormState = {
    error?: string;
    fieldErrors?: Record<string, string[]>;
    email?: string; // dikembalikan supaya input tidak kosong setelah error
};

function toFieldErrors(issues: { path: PropertyKey[]; message: string }[]) {
    const out: Record<string, string[]> = {};
    for (const issue of issues) {
        const key = String(issue.path[0] ?? "form");
        (out[key] ??= []).push(issue.message);
    }
    return out;
}

export async function registerAction(_prev: FormState, formData: FormData): Promise<FormState> {
    const raw = Object.fromEntries(formData);
    const parsed = registerSchema.safeParse(raw);
    if (!parsed.success) {
        return {
            fieldErrors: toFieldErrors(parsed.error.issues),
            email: typeof raw.email === "string" ? raw.email : undefined,
        };
    }

    const { email, password } = parsed.data;
    const passwordHash = await bcrypt.hash(password, 12);

    try {
        await prisma.user.create({ data: { email, passwordHash } });
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
            return { fieldErrors: { email: ["Email ini sudah terdaftar."] }, email };
        }
        throw e;
    }

    await signIn("credentials", { email, password, redirectTo: "/peta" });
    return {};
}

export async function loginAction(_prev: FormState, formData: FormData): Promise<FormState> {
    const raw = Object.fromEntries(formData);
    const parsed = loginSchema.safeParse(raw);
    const email = typeof raw.email === "string" ? raw.email : undefined;
    if (!parsed.success) return { error: "Email atau password tidak valid.", email };

    try {
        await signIn("credentials", { ...parsed.data, redirectTo: "/peta" });
    } catch (e) {
        if (e instanceof AuthError) return { error: "Email atau password salah.", email };
        throw e; // redirect sukses juga berupa error internal, jangan ditelan
    }
    return {};
}

export async function logoutAction() {
    await signOut({ redirectTo: "/" });
}

export async function onboardingAction(_prev: FormState, formData: FormData): Promise<FormState> {
    const user = await requireUser();
    const parsed = nicknameSchema.safeParse(formData.get("nickname"));
    if (!parsed.success) return { error: parsed.error.issues[0].message };

    await prisma.user.update({
        where: { id: user.id },
        data: { nickname: parsed.data, onboardedAt: user.onboardedAt ?? new Date() },
    });

    redirect("/peta");
}