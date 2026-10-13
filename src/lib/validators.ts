import { z } from "zod";

const email = z.string().trim().toLowerCase().email("Format email belum benar.");

export const loginSchema = z.object({
    email,
    password: z.string().min(1, "Password wajib diisi."),
});

// Maks 72 karena bcrypt hanya membaca 72 byte pertama
export const registerSchema = z
    .object({
        email,
        password: z
            .string()
            .min(8, "Password minimal 8 karakter.")
            .max(72, "Password maksimal 72 karakter."),
        confirmPassword: z.string(),
    })
    .refine((d) => d.password === d.confirmPassword, {
        message: "Konfirmasi password tidak sama.",
        path: ["confirmPassword"],
    });

export const nicknameSchema = z
    .string()
    .trim()
    .min(3, "Nama panggilan minimal 3 karakter.")
    .max(20, "Nama panggilan maksimal 20 karakter.")
    .regex(
        /^[\p{L}\p{N} _.-]+$/u,
        "Gunakan huruf, angka, spasi, titik, strip, atau garis bawah saja."
    );