import { z } from 'zod';

// Validation pour la création d'un utilisateur
export const createUserSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    email: z.string().email('Invalid email address').min(1, 'Email is required'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    role: z.string().min(1, 'Role is required'),
    photo_url: z.string().url().optional(),
    contact_number: z.string().optional(),
    address: z.string().optional(),
    bio: z.string().optional(),
    date_of_birth: z.date().optional(),
});

export const updateUserSchema = createUserSchema
    .omit({ password: true })  // On ne met pas à jour le mot de passe ici
    .partial(); // Toutes les propriétés sont maintenant optionnelles

export const getUserByIdSchema = z.object({
    id: z.string().uuid('Invalid user ID'),
});
