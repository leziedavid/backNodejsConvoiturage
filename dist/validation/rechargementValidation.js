"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRechargementSchema = void 0;
// src/validation/rechargementValidation.ts
const zod_1 = require("zod");
const validateDecimal = (value) => {
    return value !== undefined && /^-?\d+(\.\d{1,2})?$/.test(value.toString());
};
exports.createRechargementSchema = zod_1.z.object({
    // date: z.date().optional(),
    description: zod_1.z.string().min(1), // Description, doit être une chaîne non vide
    amount: zod_1.z.number().min(0).refine(validateDecimal, { message: "Amount must have at most 2 decimal places", }),
    paymentMethod: zod_1.z.string().min(1), // Méthode de paiement, doit être une chaîne non vide
    status: zod_1.z.string().min(1), // Statut, doit être une chaîne non vide
    // wallet_id: z.string().uuid(), // ID du portefeuille
    utilisateur_id: zod_1.z.string().uuid(), // ID de l'utilisateur
});
//# sourceMappingURL=rechargementValidation.js.map