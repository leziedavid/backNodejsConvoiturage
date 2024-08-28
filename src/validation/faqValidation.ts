import { z } from 'zod';

// Validation pour la création d'une FAQ
export const createFAQSchema = z.object({
    question: z.string().min(1, 'Question is required'),
    reponse: z.string().min(1, 'Answer is required'),
});

// Validation pour la mise à jour d'une FAQ
export const updateFAQSchema = z.object({
    question: z.string().min(1, 'Question is required').optional(),
    reponse: z.string().min(1, 'Answer is required').optional(),
});
