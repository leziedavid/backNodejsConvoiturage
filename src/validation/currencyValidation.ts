// src/validation/currencyValidation.ts
import { z } from 'zod';

export const createCurrencySchema = z.object({
    code: z.string().min(1), // Code de la devise, e.g., USD, EUR
    name: z.string().min(1), // Nom de la devise, e.g., US Dollar, Euro
    symbol: z.string().min(1), // Symbole de la devise, e.g., $, €, CFA
});

export const updateCurrencySchema = z.object({
    code: z.string().min(1).optional(), // Code de la devise, peut être omis
    name: z.string().min(1).optional(), // Nom de la devise, peut être omis
    symbol: z.string().min(1).optional(), // Symbole de la devise, peut être omis
});
