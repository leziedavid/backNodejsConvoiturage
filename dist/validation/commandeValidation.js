"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commandeValidation = void 0;
const zod_1 = require("zod");
// Validation pour la création d'une commande
exports.commandeValidation = {
    createSchema: zod_1.z.object({
        trajet_id: zod_1.z.string().uuid('Invalid trajet ID'),
        utilisateur_id: zod_1.z.string().uuid('Invalid utilisateur ID'),
        conducteur_id: zod_1.z.string().uuid('Invalid conducteur ID'),
        point_prise_en_charge: zod_1.z.any().optional(),
        point_depose: zod_1.z.any().optional(),
        temps_prise_en_charge: zod_1.z.union([zod_1.z.date(), zod_1.z.string().refine(val => !isNaN(Date.parse(val)), {
                message: 'Invalid date format',
            })]),
        temps_depose: zod_1.z.union([zod_1.z.date(), zod_1.z.string().refine(val => !isNaN(Date.parse(val)), {
                message: 'Invalid date format',
            })]),
        statut_commande: zod_1.z.string().min(1, 'Statut commande is required'),
        montant: zod_1.z.number().optional(),
        mode_paiement: zod_1.z.string().optional(),
        commentaires_instructions: zod_1.z.string().optional(),
        historique_statuts: zod_1.z.any().optional(),
        evaluations: zod_1.z.any().optional(),
        date_action: zod_1.z.union([zod_1.z.date(), zod_1.z.string().refine(val => !isNaN(Date.parse(val)), {
                message: 'Invalid date format',
            })]),
    }),
    updateSchema: zod_1.z.object({
        trajet_id: zod_1.z.string().uuid('Invalid trajet ID').optional(),
        utilisateur_id: zod_1.z.string().uuid('Invalid utilisateur ID').optional(),
        conducteur_id: zod_1.z.string().uuid('Invalid conducteur ID').optional(),
        point_prise_en_charge: zod_1.z.any().optional(),
        point_depose: zod_1.z.any().optional(),
        temps_prise_en_charge: zod_1.z.date().optional(),
        temps_depose: zod_1.z.date().optional(),
        statut_commande: zod_1.z.string().min(1, 'Statut commande is required').optional(),
        montant: zod_1.z.number().optional(),
        mode_paiement: zod_1.z.string().optional(),
        commentaires_instructions: zod_1.z.string().optional(),
        historique_statuts: zod_1.z.any().optional(),
        evaluations: zod_1.z.any().optional(),
        date_action: zod_1.z.date().optional(),
    })
};
//# sourceMappingURL=commandeValidation.js.map