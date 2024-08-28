import { z } from 'zod';

export const reponseConducteurSchema = z.object({
    commande_id: z.string().min(1, 'Commande ID is required'),
    conducteur_id: z.string().min(1, 'Conducteur ID is required'),
    statut_reponse: z.string().min(1, 'Response status is required'),
    commentaires: z.string().optional(),
    // temps_reponse est omis ici car il est automatiquement défini par Prisma
});
