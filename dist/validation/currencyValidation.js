"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCurrencySchema = exports.createCurrencySchema = void 0;
// src/validation/currencyValidation.ts
const zod_1 = require("zod");
exports.createCurrencySchema = zod_1.z.object({
    code: zod_1.z.string().min(1), // Code de la devise, e.g., USD, EUR
    name: zod_1.z.string().min(1), // Nom de la devise, e.g., US Dollar, Euro
    symbol: zod_1.z.string().min(1), // Symbole de la devise, e.g., $, €, CFA
});
exports.updateCurrencySchema = zod_1.z.object({
    code: zod_1.z.string().min(1).optional(), // Code de la devise, peut être omis
    name: zod_1.z.string().min(1).optional(), // Nom de la devise, peut être omis
    symbol: zod_1.z.string().min(1).optional(), // Symbole de la devise, peut être omis
});
//# sourceMappingURL=currencyValidation.js.map