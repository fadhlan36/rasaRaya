import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);

// Next.js 16: nama export harus "proxy". Di Next.js 15: file middleware.ts, export "middleware".
export { auth as proxy };

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};