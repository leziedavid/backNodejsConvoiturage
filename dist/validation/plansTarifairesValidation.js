"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePlansTarifairesSchema = exports.createPlansTarifairesSchema = void 0;
// src/validations/plansTarifairesValidation.ts
const zod_1 = require("zod");
exports.createPlansTarifairesSchema = zod_1.z.object({
    nom: zod_1.z.string().min(1, 'Le nom du plan est requis'),
    description: zod_1.z.string().min(1, 'La description est requise'),
    prix: zod_1.z.number().min(0, 'Le prix doit être un nombre positif'),
    products: zod_1.z.string().optional(),
    subscribers: zod_1.z.string().optional(),
    basicAnalytics: zod_1.z.boolean(),
});
exports.updatePlansTarifairesSchema = zod_1.z.object({
    nom: zod_1.z.string().min(1, 'Le nom du plan est requis').optional(),
    description: zod_1.z.string().min(1, 'La description est requise').optional(),
    prix: zod_1.z.number().min(0, 'Le prix doit être un nombre positif').optional(),
    products: zod_1.z.string().optional(),
    subscribers: zod_1.z.string().optional(),
    basicAnalytics: zod_1.z.boolean().optional(),
});
//# sourceMappingURL=plansTarifairesValidation.js.map