import { cache } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

// Selalu cek ke database: cookie lama dari user yang sudah dihapus tidak dianggap login
export const getCurrentUser = cache(async () => {
    const session = await auth();
    if (!session?.user?.id) return null;
    return prisma.user.findUnique({ where: { id: session.user.id } });
});

export async function requireUser() {
    const user = await getCurrentUser();
    if (!user) redirect("/masuk");
    return user;
}

// Role dibaca dari database, bukan dari token, jadi pencabutan hak admin langsung berlaku
export async function requireAdmin() {
    const user = await requireUser();
    if (user.role !== "ADMIN") redirect("/peta");
    return user;
}