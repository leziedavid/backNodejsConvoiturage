"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArretByIdSchema = exports.updateArretSchema = exports.createArretSchema = void 0;
// src/validation/arretValidation.ts
const zod_1 = require("zod");
exports.createArretSchema = zod_1.z.object({
    trajet_id: zod_1.z.string().uuid(),
    nom: zod_1.z.string().min(1, "Le nom de l'arrêt est requis"),
    date_creation: zod_1.z.date().optional(), // Peut-être rempli automatiquement dans le service
    date_modification: zod_1.z.date().optional(), // Peut-être rempli automatiquement dans le service
});
exports.updateArretSchema = zod_1.z.object({
    nom: zod_1.z.string().min(1, "Le nom de l'arrêt est requis").optional(),
    date_modification: zod_1.z.date().optional(), // Peut-être rempli automatiquement dans le service
});
exports.getArretByIdSchema = zod_1.z.object({
    id: zod_1.z.string().uuid("L'identifiant de l'arrêt doit être un UUID valide"),
});
//# sourceMappingURL=arretValidation.js.map