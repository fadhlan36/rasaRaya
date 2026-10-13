import type { NextAuthConfig } from "next-auth";
import { Role } from "@prisma/client";

const PROTECTED = ["/peta", "/koleksi", "/prestasi", "/profil", "/onboarding", "/admin"];

export const authConfig = {
    pages: { signIn: "/masuk" },
    session: { strategy: "jwt" },
    providers: [], // Diisi di auth.ts
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isProtected = PROTECTED.some((p) => nextUrl.pathname.startsWith(p));
            return isProtected ? !!auth?.user : true;
        },
        jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.role = (token.role as Role) ?? Role.PLAYER;
            }
            return session;
        },
    },
} satisfies NextAuthConfig;