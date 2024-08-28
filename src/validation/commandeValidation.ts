import { z } from 'zod';

// Validation pour la création d'une commande
export const commandeValidation = {
    createSchema: z.object({
        trajet_id: z.string().uuid('Invalid trajet ID'),
        utilisateur_id: z.string().uuid('Invalid utilisateur ID'),
        conducteur_id: z.string().uuid('Invalid conducteur ID'),
        point_prise_en_charge: z.any().optional(),
        point_depose: z.any().optional(),
        temps_prise_en_charge: z.union([z.date(), z.string().refine(val => !isNaN(Date.parse(val)), {
            message: 'Invalid date format',
        })]),
        temps_depose:  z.union([z.date(), z.string().refine(val => !isNaN(Date.parse(val)), {
            message: 'Invalid date format',
        })]),
        statut_commande: z.string().min(1, 'Statut commande is required'),
        montant: z.number().optional(),
        mode_paiement: z.string().optional(),
        commentaires_instructions: z.string().optional(),
        historique_statuts: z.any().optional(),
        evaluations: z.any().optional(),
        date_action:  z.union([z.date(), z.string().refine(val => !isNaN(Date.parse(val)), {
            message: 'Invalid date format',
        })]),
    }),

    updateSchema: z.object({
        trajet_id: z.string().uuid('Invalid trajet ID').optional(),
        utilisateur_id: z.string().uuid('Invalid utilisateur ID').optional(),
        conducteur_id: z.string().uuid('Invalid conducteur ID').optional(),
        point_prise_en_charge: z.any().optional(),
        point_depose: z.any().optional(),
        temps_prise_en_charge: z.date().optional(),
        temps_depose: z.date().optional(),
        statut_commande: z.string().min(1, 'Statut commande is required').optional(),
        montant: z.number().optional(),
        mode_paiement: z.string().optional(),
        commentaires_instructions: z.string().optional(),
        historique_statuts: z.any().optional(),
        evaluations: z.any().optional(),
        date_action: z.date().optional(),
    })
};
