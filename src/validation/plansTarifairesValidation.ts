// src/validations/plansTarifairesValidation.ts
import { z } from 'zod';

export const createPlansTarifairesSchema = z.object({
    nom: z.string().min(1, 'Le nom du plan est requis'),
    description: z.string().min(1, 'La description est requise'),
    prix: z.number().min(0, 'Le prix doit être un nombre positif'),
    products: z.string().optional(),
    subscribers: z.string().optional(),
    basicAnalytics: z.boolean(),
});

export const updatePlansTarifairesSchema = z.object({
    nom: z.string().min(1, 'Le nom du plan est requis').optional(),
    description: z.string().min(1, 'La description est requise').optional(),
    prix: z.number().min(0, 'Le prix doit être un nombre positif').optional(),
    products: z.string().optional(),
    subscribers: z.string().optional(),
    basicAnalytics: z.boolean().optional(),
});
