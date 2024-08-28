// src/validations/vehiculeValidation.ts
import { z } from 'zod';

export const createVehiculeSchema = z.object({
    utilisateur_id: z.string().min(1, 'ID utilisateur est requis'),
    marque: z.string().min(1, 'Marque est requise'),
    modele: z.string().min(1, 'Modèle est requis'),
    annee: z.number().int().min(1900, 'Année doit être un nombre valide').max(new Date().getFullYear(), 'Année ne peut pas être dans le futur'),
    plaque: z.string().min(1, 'Plaque est requise'),
    couleur: z.string().optional(),
    permis: z.string().optional(),
    carte_grise: z.string().optional(),
    vehicule_id: z.string().optional(), // Nouveau champ pour la relation avec Vehicule
});

export const updateVehiculeSchema = z.object({
    utilisateur_id: z.string().min(1, 'ID utilisateur est requis').optional(),
    marque: z.string().min(1, 'Marque est requise').optional(),
    modele: z.string().min(1, 'Modèle est requis').optional(),
    annee: z.number().int().min(1900, 'Année doit être un nombre valide').max(new Date().getFullYear(), 'Année ne peut pas être dans le futur').optional(),
    plaque: z.string().min(1, 'Plaque est requise').optional(),
    couleur: z.string().optional(),
    permis: z.string().optional(),
    carte_grise: z.string().optional(),
    vehicule_id: z.string().optional(), // Nouveau champ pour la relation avec Vehicule
});
