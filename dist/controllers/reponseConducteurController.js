"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReponse = exports.getReponseById = exports.getReponses = exports.createReponse = void 0;
const reponseConducteurValidation_1 = require("../validation/reponseConducteurValidation");
const reponseConducteurService_1 = require("../services/reponseConducteurService");
const createReponse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Validation des données de la requête
    const validation = reponseConducteurValidation_1.reponseConducteurSchema.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).json({
            code: 400,
            messages: `Validation error: ${validation.error.errors.map(e => e.message).join(', ')}`
        });
    }
    try {
        const { commande_id, conducteur_id, statut_reponse, commentaires } = validation.data;
        // Appel à la fonction de création sans `temps_reponse`
        const newReponse = yield (0, reponseConducteurService_1.createReponseConducteur)({
            commande_id,
            conducteur_id,
            statut_reponse,
            commentaires, // Ce champ est optionnel
        });
        const response = {
            code: 201,
            messages: 'Réponse créée avec succès',
            data: newReponse,
        };
        res.status(201).json(response);
    }
    catch (error) {
        console.error('Erreur lors de la création de la réponse conducteur :', error);
        const response = {
            code: 500,
            messages: 'Erreur interne du serveur',
        };
        res.status(500).json(response);
    }
});
exports.createReponse = createReponse;
const getReponses = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reponses = yield (0, reponseConducteurService_1.getReponsesConducteur)();
        const response = {
            code: 200,
            messages: 'Réponses récupérées avec succès',
            data: reponses,
        };
        res.json(response);
    }
    catch (error) {
        console.error('Erreur lors de la récupération des réponses :', error);
        const response = {
            code: 500,
            messages: 'Erreur interne du serveur',
        };
        res.status(500).json(response);
    }
});
exports.getReponses = getReponses;
const getReponseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const reponse = yield (0, reponseConducteurService_1.getReponseConducteurById)(id);
        if (reponse) {
            const response = {
                code: 200,
                messages: 'Réponse récupérée avec succès',
                data: reponse,
            };
            res.json(response);
        }
        else {
            const response = {
                code: 404,
                messages: 'Réponse non trouvée',
            };
            res.status(404).json(response);
        }
    }
    catch (error) {
        console.error('Erreur lors de la récupération de la réponse conducteur :', error);
        const response = {
            code: 500,
            messages: 'Erreur interne du serveur',
        };
        res.status(500).json(response);
    }
});
exports.getReponseById = getReponseById;
const deleteReponse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield (0, reponseConducteurService_1.deleteReponseConducteur)(id);
        const response = {
            code: 204,
            messages: 'Réponse supprimée avec succès',
        };
        res.status(204).send(response);
    }
    catch (error) {
        console.error('Erreur lors de la suppression de la réponse conducteur :', error);
        const response = {
            code: 500,
            messages: 'Erreur interne du serveur',
        };
        res.status(500).json(response);
    }
});
exports.deleteReponse = deleteReponse;
//# sourceMappingURL=reponseConducteurController.js.map