import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const PLACEHOLDER = "Akan diisi setelah materi dan sumbernya diverifikasi.";

const chapters = [
    { slug: "sumatra", name: "Sumatra" },
    { slug: "jawa-bali", name: "Jawa & Bali" },
    { slug: "timur-nusantara", name: "Timur Nusantara" },
];

// Urutan = urutan perjalanan. mapX/mapY hanya posisi sementara, kita rapikan di Langkah 4.
const regions = [
    { slug: "aceh", name: "Aceh", chapter: "sumatra", mapX: 8, mapY: 14, food: ["mie-aceh", "Mie Aceh"] },
    { slug: "sumatera-barat", name: "Sumatera Barat", chapter: "sumatra", mapX: 14, mapY: 38, food: ["rendang", "Rendang"] },
    { slug: "sumatera-selatan", name: "Sumatera Selatan", chapter: "sumatra", mapX: 24, mapY: 52, food: ["pempek", "Pempek"] },
    { slug: "yogyakarta", name: "DI Yogyakarta", chapter: "jawa-bali", mapX: 38, mapY: 72, food: ["gudeg", "Gudeg"] },
    { slug: "jawa-timur", name: "Jawa Timur", chapter: "jawa-bali", mapX: 46, mapY: 70, food: ["rawon", "Rawon"] },
    { slug: "bali", name: "Bali", chapter: "jawa-bali", mapX: 54, mapY: 74, food: ["sate-lilit", "Sate Lilit"] },
    { slug: "sulawesi-selatan", name: "Sulawesi Selatan", chapter: "timur-nusantara", mapX: 62, mapY: 55, food: ["coto-makassar", "Coto Makassar"] },
    { slug: "papua-selatan", name: "Papua Selatan (Merauke)", chapter: "timur-nusantara", mapX: 92, mapY: 70, food: ["papeda", "Papeda"] },
];

const achievements = [
    { code: "FIRST_STEP", name: "Langkah Pertama", description: "Selesaikan checkpoint pertamamu." },
    { code: "CHAPTER_CLEAR", name: "Penakluk Chapter", description: "Selesaikan satu chapter penuh." },
    { code: "COLLECTOR_HALF", name: "Kolektor Rasa", description: "Kumpulkan setengah dari semua kartu kuliner." },
    { code: "EXPLORER", name: "Penjelajah Rasa Nusantara", description: "Selesaikan final challenge dan tamatkan perjalanan." },
];

async function main() {
    for (const [i, c] of chapters.entries()) {
        await prisma.chapter.upsert({
            where: { slug: c.slug },
            update: { name: c.name, order: i + 1 },
            create: { ...c, order: i + 1, status: "PUBLISHED" },
        });
    }

    for (const [i, r] of regions.entries()) {
        await prisma.region.upsert({
            where: { slug: r.slug },
            update: { name: r.name, order: i + 1, mapX: r.mapX, mapY: r.mapY },
            create: {
                slug: r.slug,
                name: r.name,
                order: i + 1,
                intro: PLACEHOLDER,
                mapX: r.mapX,
                mapY: r.mapY,
                status: "PUBLISHED",
                chapter: { connect: { slug: r.chapter } },
            },
        });

        await prisma.food.upsert({
            where: { slug: r.food[0] },
            update: { name: r.food[1] },
            create: {
                slug: r.food[0],
                name: r.food[1],
                summary: PLACEHOLDER,
                status: "PUBLISHED",
                region: { connect: { slug: r.slug } },
            },
        });
    }

    for (const a of achievements) {
        await prisma.achievement.upsert({ where: { code: a.code }, update: a, create: a });
    }

    console.log("Seed selesai.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());