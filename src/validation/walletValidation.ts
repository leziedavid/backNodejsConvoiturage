// src/validation/walletValidation.ts
import { z } from 'zod';

// Fonction pour vérifier la précision des décimales
const decimalSchema = z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: "Value must have at most 2 decimal places",
});

export const createWalletSchema = z.object({
    user_id: z.string().uuid(), // ID de l'utilisateur
    balance: z.string().transform(val => parseFloat(val)).refine(val => decimalSchema.safeParse(val).success, {
        message: "Balance must have at most 2 decimal places",
    }), // Solde, doit être un nombre >= 0 avec au plus 2 décimales
    currency_id: z.string().uuid(), // ID de la devise
});

export const updateWalletSchema = z.object({
    balance: z.string().transform(val => parseFloat(val)).optional().refine(val => decimalSchema.safeParse(val).success, {
        message: "Balance must have at most 2 decimal places",
    }), // Solde, peut être omis ou un nombre >= 0 avec au plus 2 décimales
    currency_id: z.string().uuid().optional(), // ID de la devise, peut être omis
});
