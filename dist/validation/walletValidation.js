"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateWalletSchema = exports.createWalletSchema = void 0;
// src/validation/walletValidation.ts
const zod_1 = require("zod");
// Fonction pour vérifier la précision des décimales
const decimalSchema = zod_1.z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: "Value must have at most 2 decimal places",
});
exports.createWalletSchema = zod_1.z.object({
    user_id: zod_1.z.string().uuid(), // ID de l'utilisateur
    balance: zod_1.z.string().transform(val => parseFloat(val)).refine(val => decimalSchema.safeParse(val).success, {
        message: "Balance must have at most 2 decimal places",
    }), // Solde, doit être un nombre >= 0 avec au plus 2 décimales
    currency_id: zod_1.z.string().uuid(), // ID de la devise
});
exports.updateWalletSchema = zod_1.z.object({
    balance: zod_1.z.string().transform(val => parseFloat(val)).optional().refine(val => decimalSchema.safeParse(val).success, {
        message: "Balance must have at most 2 decimal places",
    }), // Solde, peut être omis ou un nombre >= 0 avec au plus 2 décimales
    currency_id: zod_1.z.string().uuid().optional(), // ID de la devise, peut être omis
});
//# sourceMappingURL=walletValidation.js.map