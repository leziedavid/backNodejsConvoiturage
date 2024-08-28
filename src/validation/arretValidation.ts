// src/validation/arretValidation.ts
import { z } from 'zod';

export const createArretSchema = z.object({
    trajet_id: z.string().uuid(),
    nom: z.string().min(1, "Le nom de l'arrêt est requis"),
    date_creation: z.date().optional(), // Peut-être rempli automatiquement dans le service
    date_modification: z.date().optional(), // Peut-être rempli automatiquement dans le service
});

export const updateArretSchema = z.object({
    nom: z.string().min(1, "Le nom de l'arrêt est requis").optional(),
    date_modification: z.date().optional(), // Peut-être rempli automatiquement dans le service
});

export const getArretByIdSchema = z.object({
    id: z.string().uuid("L'identifiant de l'arrêt doit être un UUID valide"),
});
