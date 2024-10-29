"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStatusTrajet = exports.searchTrajets2 = exports.searchTrajets = exports.deleteTrajet = exports.getTrajetDriver = exports.getTrajetById = exports.getTrajets = exports.updateTrajetDetailsController = exports.updateTrajet = exports.createTrajet = void 0;
const trajetService = __importStar(require("../services/trajetService"));
const zod_1 = require("zod");
const trajetValidation_1 = require("../validation/trajetValidation");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const trajetService_1 = require("../services/trajetService");
const createTrajet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Valider les données de la requête
        const parsedBody = trajetValidation_1.createTrajetSchema.parse(req.body);
        // Convertir les chaînes de caractères en objets Date si nécessaire
        const convertToDate = (date) => {
            return typeof date === 'string' ? new Date(date) : date;
        };
        const dataToSave = Object.assign(Object.assign({}, parsedBody), { temps_depart_prevu: convertToDate(parsedBody.temps_depart_prevu), temps_arrivee_prevu: convertToDate(parsedBody.temps_arrivee_prevu) });
        // Utiliser le service pour créer un trajet
        const newTrajet = yield trajetService.createTrajet(dataToSave);
        // Construire la réponse
        const response = {
            code: 201,
            messages: 'Trajet created successfully',
            data: newTrajet,
        };
        // Envoyer la réponse
        res.status(201).json(response);
    }
    catch (error) {
        // Gérer les erreurs de validation
        if (error instanceof zod_1.z.ZodError) {
            const errors = error.errors.map(e => `${e.path.join('.')} : ${e.message}`).join(', ');
            const response = {
                code: 400,
                messages: errors,
            };
            return res.status(400).json(response);
        }
        // Gérer les autres erreurs
        console.error(error);
        const response = {
            code: 500,
            messages: 'Internal server error',
        };
        res.status(500).json(response);
    }
});
exports.createTrajet = createTrajet;
// Fonction utilitaire pour convertir les dates
const convertToDate = (date) => {
    return typeof date === 'string' ? new Date(date) : date;
};
// Fonction utilitaire pour convertir les chaînes en nombres
const convertToNumber = (value) => {
    if (typeof value === 'string') {
        const num = parseFloat(value);
        return isNaN(num) ? undefined : num;
    }
    return value;
};
const updateTrajet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Valider les données de la requête
        const parsedBody = trajetValidation_1.updateTrajetSchema.parse(req.body);
        // Préparer les données pour la mise à jour
        const dataToUpdate = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (parsedBody.utilisateur_id && { utilisateur_id: parsedBody.utilisateur_id })), (parsedBody.vehicule_id && { vehicule_id: parsedBody.vehicule_id })), (parsedBody.point_depart && { point_depart: parsedBody.point_depart })), (parsedBody.ville_depart && { ville_depart: parsedBody.ville_depart })), (parsedBody.point_arrivee && { point_arrivee: parsedBody.point_arrivee })), (parsedBody.ville_arrivee && { ville_arrivee: parsedBody.ville_arrivee })), (parsedBody.temps_depart_prevu && { temps_depart_prevu: convertToDate(parsedBody.temps_depart_prevu) })), (parsedBody.temps_arrivee_prevu && { temps_arrivee_prevu: convertToDate(parsedBody.temps_arrivee_prevu) })), (parsedBody.duree_estimee !== undefined && { duree_estimee: convertToNumber(parsedBody.duree_estimee) })), (parsedBody.distance_estimee !== undefined && { distance_estimee: convertToNumber(parsedBody.distance_estimee) })), (parsedBody.etat_trajet && { etat_trajet: parsedBody.etat_trajet })), (parsedBody.historique_position && {
            historique_position: parsedBody.historique_position.map(pos => (Object.assign(Object.assign({}, pos), { timestamp: convertToDate(pos.timestamp) || new Date() }))),
        })), (parsedBody.mode_transport && { mode_transport: parsedBody.mode_transport })), (parsedBody.nombre_de_places !== undefined && { nombre_de_places: convertToNumber(parsedBody.nombre_de_places) })), (parsedBody.price !== undefined && { price: convertToNumber(parsedBody.price) })), (parsedBody.arrets && {
            arrets: parsedBody.arrets.map(arret => ({
                lat: arret.lat,
                lon: arret.lon,
                ville: arret.ville,
            })),
        }));
        // Utiliser le service pour mettre à jour le trajet
        const updatedTrajet = yield trajetService.updateTrajet(req.params.id, dataToUpdate);
        // Construire la réponse
        const response = {
            code: 200,
            messages: 'Trajet updated successfully',
            data: updatedTrajet,
        };
        // Envoyer la réponse
        res.status(200).json(response);
    }
    catch (error) {
        // Gérer les erreurs de validation
        if (error instanceof zod_1.z.ZodError) {
            const response = {
                code: 400,
                messages: error.errors.map(e => e.message).join(', '),
            };
            return res.status(400).json(response);
        }
        // Gérer les autres erreurs
        console.error(error);
        const response = {
            code: 500,
            messages: 'Internal server error',
        };
        res.status(500).json(response);
    }
});
exports.updateTrajet = updateTrajet;
const updateTrajetDetailsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Valider les données de la requête
        const parsedBody = trajetValidation_1.updateTrajetDetailsSchema.parse(req.body);
        // Utiliser le service pour mettre à jour le trajet
        const updatedTrajet = yield trajetService.updateTrajetDetails(req.params.id, parsedBody);
        // Construire la réponse
        const response = {
            code: 200,
            messages: 'Trajet details updated successfully',
            data: updatedTrajet,
        };
        // Envoyer la réponse
        res.status(200).json(response);
    }
    catch (error) {
        // Gérer les erreurs de validation
        if (error instanceof zod_1.z.ZodError) {
            const response = {
                code: 400,
                messages: error.errors.map(e => e.message).join(', '),
            };
            return res.status(400).json(response);
        }
        // Gérer les autres erreurs
        console.error(error);
        const response = {
            code: 500,
            messages: 'Internal server error',
        };
        res.status(500).json(response);
    }
});
exports.updateTrajetDetailsController = updateTrajetDetailsController;
const getTrajets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        // Vérifiez si page et limit sont des nombres positifs
        if (page < 1 || limit < 1) {
            return res.status(400).json({
                code: 400,
                messages: 'Page and limit must be positive numbers.',
                data: null,
                total: 0,
            });
        }
        const options = { page, limit };
        const result = yield trajetService.getAllTrajets(options);
        return res.status(200).json({
            code: 200,
            messages: 'Trajets récupérés avec succès.',
            data: result.data,
            total: result.total,
        });
    }
    catch (error) {
        return res.status(500).json({
            code: 500,
            messages: 'Erreur interne du serveur',
            data: null,
            total: 0,
        });
    }
});
exports.getTrajets = getTrajets;
const getTrajetById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        trajetValidation_1.getTrajetByIdSchema.parse({ id });
        const trajet = yield trajetService.getTrajetById(id);
        if (trajet) {
            const response = {
                code: 200,
                messages: 'Trajet retrieved successfully',
                data: trajet,
            };
            res.json(response);
        }
        else {
            const response = {
                code: 404,
                messages: 'Trajet not found',
            };
            res.status(404).json(response);
        }
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            const response = {
                code: 400,
                messages: error.errors.map(e => e.message).join(', '),
            };
            return res.status(400).json(response);
        }
        const response = {
            code: 500,
            messages: 'Internal server error',
        };
        res.status(500).json(response);
    }
});
exports.getTrajetById = getTrajetById;
const getTrajetDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    try {
        // Extraction des paramètres de pagination (si nécessaire)
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        // Vérifiez si page et limit sont des nombres positifs
        if (page < 1 || limit < 1) {
            return res.status(400).json({
                code: 400,
                messages: 'Page and limit must be positive numbers.',
                data: null,
                total: 0,
            });
        }
        // Validation du token
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                code: 401,
                messages: 'Token manquant',
                data: null,
            });
        }
        // Décoder le token
        const decodedToken = jsonwebtoken_1.default.decode(token);
        if (!decodedToken) {
            return res.status(401).json({
                code: 401,
                messages: 'Token invalide',
                data: null,
            });
        }
        // Validation de l'id de trajet
        trajetValidation_1.getTrajetByIdSchema.parse({ id });
        // Récupérer les trajets avec pagination (admettant que cette fonction pourrait être modifiée pour inclure des options)
        const options = { page, limit };
        const trajet = yield trajetService.getDriverTrajet(id, options);
        if (trajet) {
            return res.status(200).json({
                code: 200,
                messages: 'Trajet récupéré avec succès',
                data: trajet.data,
                total: trajet.total,
            });
        }
        else {
            return res.status(404).json({
                code: 404,
                messages: 'Trajet non trouvé',
                data: null,
            });
        }
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return res.status(400).json({
                code: 400,
                messages: error.errors.map(e => e.message).join(', '),
                data: null,
            });
        }
        else if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            return res.status(401).json({
                code: 401,
                messages: 'Token invalide',
                data: null,
            });
        }
        else {
            return res.status(500).json({
                code: 500,
                messages: 'Erreur interne du serveur',
                data: null,
            });
        }
    }
});
exports.getTrajetDriver = getTrajetDriver;
const deleteTrajet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield trajetService.deleteTrajet(id);
        const response = {
            code: 200,
            messages: 'Trajet deleted successfully',
        };
        res.status(200).send(response);
    }
    catch (error) {
        const response = {
            code: 500,
            messages: 'Internal server error',
        };
        res.status(500).json(response);
    }
});
exports.deleteTrajet = deleteTrajet;
const searchTrajets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Valider les paramètres de requête avec le schéma Zod
        trajetValidation_1.searchTrajetSchema.parse(req.body);
        // Extraire les paramètres de la requête
        const { point_depart, point_arrivee, temps_depart_prevu, nombre_de_places, page, limit } = req.body;
        // Assurez-vous que la date est valide
        const parsedTempsDepartPrevu = new Date(temps_depart_prevu);
        if (isNaN(parsedTempsDepartPrevu.getTime())) {
            return res.status(400).json({
                code: 400,
                messages: 'Invalid date format for temps_depart_prevu.',
            });
        }
        // Appeler le service de recherche avec les paramètres
        const result = yield trajetService.searchTrajetsService({
            point_depart,
            point_arrivee,
            temps_depart_prevu,
            nombre_de_places,
            page,
            limit
        });
        // Vérifier que la réponse contient des trajets
        if (!result.trajets || result.trajets.length === 0) {
            return res.status(404).json({
                code: 404,
                messages: 'Aucun trajet trouvé correspondant aux critères.',
                data: [],
                total: 0
            });
        }
        // Répondre avec les trajets récupérés
        return res.status(200).json({
            code: 200,
            messages: 'Trajets récupérés avec succès.',
            data: result.trajets,
            total: result.total
        });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            // Gestion des erreurs de validation
            const response = {
                code: 400,
                messages: error.errors.map(e => e.message).join(', ')
            };
            return res.status(400).json(response);
        }
        console.error('Error searching trajets:', error);
        // Gestion des erreurs internes
        return res.status(500).json({
            code: 500,
            messages: 'Internal server error',
        });
    }
});
exports.searchTrajets = searchTrajets;
const searchTrajets2 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Valider les paramètres de requête avec le schéma Zod
        trajetValidation_1.searchTrajetSchema.parse(req.body); // Utilisez `req.body` pour les données POST
        // Extraire les paramètres de la requête
        const { point_depart, point_arrivee, temps_depart_prevu, nombre_de_places, page, limit } = req.body;
        // Vérifier et valider les valeurs extraites
        if (!point_depart || !point_arrivee || !temps_depart_prevu || typeof nombre_de_places !== 'number' || typeof page !== 'number' || typeof limit !== 'number') {
            return res.status(400).json({
                code: 400,
                messages: 'Missing or invalid parameters.',
            });
        }
        // Assurez-vous que la date est valide
        const parsedTempsDepartPrevu = new Date(temps_depart_prevu);
        if (isNaN(parsedTempsDepartPrevu.getTime())) {
            return res.status(400).json({
                code: 400,
                messages: 'Invalid date format for temps_depart_prevu.',
            });
        }
        // Appeler le service de recherche avec les paramètres
        const result = yield trajetService.searchTrajets({
            point_depart, // Utilisez les valeurs directement
            point_arrivee,
            temps_depart_prevu, // Passez la chaîne de caractères telle quelle
            nombre_de_places,
            page,
            limit
        });
        // Vérifier que la réponse contient des trajets
        if (!result.trajets || result.trajets.length === 0) {
            return res.status(404).json({
                code: 404,
                messages: 'Aucun trajet trouvé correspondant aux critères.',
                data: [],
                total: 0
            });
        }
        // Répondre avec les trajets récupérés
        return res.status(200).json({
            code: 200,
            messages: 'Trajets récupérés avec succès.',
            data: result.trajets,
            total: result.total
        });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            // Gestion des erreurs de validation
            const response = {
                code: 400,
                messages: error.errors.map(e => e.message).join(', ')
            };
            return res.status(400).json(response);
        }
        console.error('Error searching trajets:', error);
        // Gestion des erreurs internes
        return res.status(500).json({
            code: 500,
            messages: 'Internal server error',
        });
    }
});
exports.searchTrajets2 = searchTrajets2;
const updateStatusTrajet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // ID du trajet à mettre à jour
    const { newStatus } = req.body;
    if (!newStatus) {
        return res.status(400).json({
            code: 400,
            messages: 'New status is required',
        });
    }
    try {
        // Appel du service pour mettre à jour le statut du trajet
        const updatedTrajet = yield (0, trajetService_1.updateTrajetStatus)(id, newStatus);
        // Préparation de la réponse
        const response = {
            code: 200,
            messages: 'Trajet status updated successfully',
            data: updatedTrajet,
        };
        return res.status(200).json(response);
    }
    catch (error) {
        console.error('Error in updateTrajetStatusController:', error);
        return res.status(500).json({ code: 500, messages: 'Internal server error' });
    }
});
exports.updateStatusTrajet = updateStatusTrajet;
//# sourceMappingURL=trajetController.js.map