import { prisma } from "@/lib/prisma";

export async function GET() {
    const regions = await prisma.region.count();
    return Response.json({ ok: true, regions });
}