import { z } from 'zod';
// Schéma de validation pour l'envoi de l'OTP

export const sendOtpSchema = z.object({
    email: z.string().email('Email invalide'),
});
export const resetPasswordSchema = z.object({
    password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
    email: z.string().email('Email invalide'),
});

