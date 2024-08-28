import { z } from 'zod';

// Validation pour la création d'un contact
export const createContactSchema = z.object({
    nom: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address').min(1, 'Email is required'),
    sujet: z.string().min(1, 'Subject is required'),
    message: z.string().min(1, 'Message is required'),
});

// Validation pour la mise à jour d'un contact
export const updateContactSchema = z.object({
    nom: z.string().min(1, 'Name is required').optional(),
    email: z.string().email('Invalid email address').min(1, 'Email is required').optional(),
    sujet: z.string().min(1, 'Subject is required').optional(),
    message: z.string().min(1, 'Message is required').optional(),
});
