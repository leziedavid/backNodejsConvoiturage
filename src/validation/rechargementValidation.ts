// src/validation/rechargementValidation.ts
import { z } from 'zod';

// Fonction pour vérifier la précision des décimales
const validateDecimal = (value: number | undefined): value is number => {
    // Vérifie que la valeur n'est pas undefined et a au plus 2 décimales après la virgule
    return value !== undefined && /^-?\d+(\.\d{1,2})?$/.test(value.toString());
};

export const createRechargementSchema = z.object({
    date: z.date().optional(), // Date, peut être omise car a une valeur par défaut
    description: z.string().min(1), // Description, doit être une chaîne non vide
    amount: z.number().min(0).refine(validateDecimal, {
        message: "Amount must have at most 2 decimal places",
    }), // Montant, doit être un nombre >= 0 avec au plus 2 décimales
    paymentMethod: z.string().min(1), // Méthode de paiement, doit être une chaîne non vide
    status: z.string().min(1), // Statut, doit être une chaîne non vide
    wallet_id: z.string().uuid(), // ID du portefeuille
    utilisateur_id: z.string().uuid(), // ID de l'utilisateur
});
