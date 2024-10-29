"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVehiculeSchema = exports.createVehiculeSchema = void 0;
// src/validations/vehiculeValidation.ts
const zod_1 = require("zod");
exports.createVehiculeSchema = zod_1.z.object({
    utilisateur_id: zod_1.z.string().min(1, 'ID utilisateur est requis'),
    marque: zod_1.z.string().min(1, 'Marque est requise'),
    modele: zod_1.z.string().min(1, 'Modèle est requis'),
    annee: zod_1.z.number().int().min(1900, 'Année doit être un nombre valide').max(new Date().getFullYear(), 'Année ne peut pas être dans le futur'),
    plaque: zod_1.z.string().min(1, 'Plaque est requise'),
    couleur: zod_1.z.string().optional(),
    permis: zod_1.z.string().optional(),
    carte_grise: zod_1.z.string().optional(),
    vehicule_id: zod_1.z.string().optional(), // Nouveau champ pour la relation avec Vehicule
});
exports.updateVehiculeSchema = zod_1.z.object({
    utilisateur_id: zod_1.z.string().min(1, 'ID utilisateur est requis').optional(),
    marque: zod_1.z.string().min(1, 'Marque est requise').optional(),
    modele: zod_1.z.string().min(1, 'Modèle est requis').optional(),
    annee: zod_1.z.number().int().min(1900, 'Année doit être un nombre valide').max(new Date().getFullYear(), 'Année ne peut pas être dans le futur').optional(),
    plaque: zod_1.z.string().min(1, 'Plaque est requise').optional(),
    couleur: zod_1.z.string().optional(),
    permis: zod_1.z.string().optional(),
    carte_grise: zod_1.z.string().optional(),
    vehicule_id: zod_1.z.string().optional(), // Nouveau champ pour la relation avec Vehicule
});
//# sourceMappingURL=vehiculeValidation.js.map