import { z } from 'zod';

// Validation pour la création d'une page About
export const createAboutSchema = z.object({
    libelle: z.string().optional(),
    name: z.string().optional(),
    description: z.string().optional(),
    image: z.string().url().optional(),
});

// Validation pour la mise à jour d'une page About
export const updateAboutSchema = z.object({
    libelle: z.string().optional(),
    name: z.string().optional(),
    description: z.string().optional(),
    image: z.string().url().optional(),
});
