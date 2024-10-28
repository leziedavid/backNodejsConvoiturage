"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reponseConducteurSchema = void 0;
const zod_1 = require("zod");
exports.reponseConducteurSchema = zod_1.z.object({
    commande_id: zod_1.z.string().min(1, 'Commande ID is required'),
    conducteur_id: zod_1.z.string().min(1, 'Conducteur ID is required'),
    statut_reponse: zod_1.z.string().min(1, 'Response status is required'),
    commentaires: zod_1.z.string().optional(),
    // temps_reponse est omis ici car il est automatiquement défini par Prisma
});
//# sourceMappingURL=reponseConducteurValidation.js.map