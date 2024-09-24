// src/validation/rechargementValidation.ts
import { z } from 'zod';
const validateDecimal = (value: number | undefined): value is number => {
    return value !== undefined && /^-?\d+(\.\d{1,2})?$/.test(value.toString());
};


export const createRechargementSchema = z.object({
    // date: z.date().optional(),
    description: z.string().min(1), // Description, doit être une chaîne non vide
    amount: z.number().min(0).refine(validateDecimal, {message: "Amount must have at most 2 decimal places",}),
    paymentMethod: z.string().min(1), // Méthode de paiement, doit être une chaîne non vide
    status: z.string().min(1), // Statut, doit être une chaîne non vide
    // wallet_id: z.string().uuid(), // ID du portefeuille
    utilisateur_id: z.string().uuid(), // ID de l'utilisateur
});
