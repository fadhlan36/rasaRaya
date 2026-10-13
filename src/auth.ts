import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/validators";
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(raw) {
                const parsed = loginSchema.safeParse(raw);
                if (!parsed.success) return null;

                const user = await prisma.user.findUnique({
                    where: { email: parsed.data.email },
                });
                if (!user) return null;

                const ok = await bcrypt.compare(parsed.data.password, user.passwordHash);
                if (!ok) return null;

                return { id: user.id, email: user.email, name: user.nickname, role: user.role };
            },
        }),
    ],
});