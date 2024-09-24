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
exports.searchCommandesByOptions = exports.updateCommandeUsersStatus = exports.updateCommandeStatus = exports.deleteCommande = exports.getCommandeByDriversId = exports.getAllCommandeByUserId = exports.getCommandeByUsersId = exports.getCommandeById = exports.getCommandes = exports.updateCommande = exports.createCommande = exports.createCommandes = void 0;
const commandeService = __importStar(require("../services/commandeService"));
const zod_1 = require("zod");
const commandeValidation_1 = require("../validation/commandeValidation");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Gestion des erreurs pour les réponses
const handleValidationError = (error) => ({
    code: 400,
    messages: error.errors.map(e => e.message).join(', '),
});
const handleError = (error) => {
    console.error(error);
    return {
        code: 500,
        messages: 'Internal server error',
    };
};
// Créer une commande
const createCommandes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validation des données de la requête
        const validatedData = commandeValidation_1.commandeValidation.createSchema.parse(req.body);
        // Utiliser le service pour créer une commande
        const newCommande = yield commandeService.createCommande(validatedData);
        const response = {
            code: 201,
            messages: 'Commande created successfully',
            data: newCommande,
        };
        return res.status(201).json(response);
    }
    catch (error) {
        let response;
        if (error instanceof zod_1.z.ZodError) {
            response = {
                code: 400,
                messages: 'Validation error',
                data: null,
            };
            return res.status(400).json(response);
        }
        response = {
            code: 500,
            messages: 'Internal server error',
            data: null,
        };
        return res.status(500).json(response);
    }
});
exports.createCommandes = createCommandes;
const createCommande = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validation des données de la requête
        const validatedData = commandeValidation_1.commandeValidation.createSchema.parse(req.body);
        // Utiliser le service pour créer une commande
        const newCommande = yield commandeService.createCommande(validatedData);
        const response = {
            code: 201,
            messages: 'Commande created successfully',
            data: newCommande,
        };
        return res.status(201).json(response);
    }
    catch (error) {
        let response;
        if (error instanceof zod_1.z.ZodError) {
            response = {
                code: 400,
                messages: 'Validation error',
                data: null,
            };
            return res.status(400).json(response);
        }
        if (error instanceof Error) {
            if (error.message.includes('Cet trajet n\'accepte plus de commandes, le nombre de places est atteint')) {
                response = {
                    code: 400,
                    messages: error.message,
                    data: null,
                };
                return res.status(400).json(response);
            }
            if (error.message.includes('Trajet not found')) {
                response = {
                    code: 404,
                    messages: error.message,
                    data: null,
                };
                return res.status(404).json(response);
            }
        }
        console.error('Error creating commande:', error);
        response = {
            code: 500,
            messages: 'Internal server error',
            data: null,
        };
        return res.status(500).json(response);
    }
});
exports.createCommande = createCommande;
// Mettre à jour une commande
const updateCommande = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Valider les données de la requête
        const validatedData = commandeValidation_1.commandeValidation.updateSchema.parse(req.body);
        // Utiliser le service pour mettre à jour une commande
        const updatedCommande = yield commandeService.updateCommande(req.params.id, validatedData);
        const response = {
            code: 200,
            messages: 'Commande updated successfully',
            data: updatedCommande,
        };
        return res.status(200).json(response);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return res.status(400).json(handleValidationError(error));
        }
        else if (error instanceof Error && error.message.includes('not found')) {
            const response = {
                code: 404,
                messages: 'Commande not found',
            };
            return res.status(404).json(response);
        }
        return res.status(500).json(handleError(error));
    }
});
exports.updateCommande = updateCommande;
// Obtenir toutes les commandes avec pagination
const getCommandes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extraction des paramètres de pagination
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
        // Appeler le service de commande avec les paramètres de pagination
        const options = { page, limit };
        const commandes = yield commandeService.getCommandes(options);
        if (!commandes) {
            return res.status(404).json({
                code: 404,
                messages: 'Commandes not found',
                data: null,
                total: 0,
            });
        }
        return res.status(200).json({
            code: 200,
            messages: 'Commandes retrieved successfully',
            data: commandes.data,
            total: commandes.total,
        });
    }
    catch (error) {
        return res.status(500).json(handleError(error));
    }
});
exports.getCommandes = getCommandes;
// Obtenir une commande par ID
const getCommandeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const commande = yield commandeService.getCommandeById(id);
        if (!commande) {
            const response = {
                code: 404,
                messages: 'Commande not found',
            };
            return res.status(404).json(response);
        }
        const response = {
            code: 200,
            messages: 'Commande retrieved successfully',
            data: commande,
        };
        return res.status(200).json(response);
    }
    catch (error) {
        return res.status(500).json(handleError(error));
    }
});
exports.getCommandeById = getCommandeById;
const getCommandeByUsersId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                code: 401,
                messages: 'Token manquant',
            });
        }
        // Décoder le token
        const decodedToken = jsonwebtoken_1.default.decode(token);
        if (!decodedToken) {
            throw new Error('Votre session a expiré, merci de vous reconnecter.');
        }
        const id = decodedToken.id;
        const commande = yield commandeService.getCommandeByUsers(id);
        if (!commande) {
            const response = {
                code: 404,
                messages: 'Commande not found',
            };
            return res.status(404).json(response);
        }
        const response = {
            code: 200,
            messages: 'Commande retrieved successfully',
            data: commande,
        };
        return res.status(200).json(response);
    }
    catch (error) {
        return res.status(500).json(handleError(error));
    }
});
exports.getCommandeByUsersId = getCommandeByUsersId;
// Mes fonction avec parggination
const getAllCommandeByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                code: 401,
                messages: 'Token manquant',
            });
        }
        // Décoder le token
        const decodedToken = jsonwebtoken_1.default.decode(token);
        if (!decodedToken) {
            return res.status(401).json({
                code: 401,
                messages: 'Votre session a expiré, merci de vous reconnecter.',
            });
        }
        // Vous pouvez utiliser l'id du token ou celui passé en paramètres, ici nous utilisons celui du token
        const userId = decodedToken.id;
        // Appeler le service de commande avec les paramètres de pagination
        const options = { page, limit };
        const commandes = yield commandeService.getAllCommandeByUsers(userId, options);
        if (!commandes) {
            return res.status(404).json({
                code: 404,
                messages: 'Commandes not found',
                data: null,
                total: 0,
            });
        }
        return res.status(200).json({
            code: 200,
            messages: 'Commandes retrieved successfully',
            data: commandes.data,
            total: commandes.total,
        });
    }
    catch (error) {
        return res.status(500).json(handleError(error));
    }
});
exports.getAllCommandeByUserId = getAllCommandeByUserId;
const getCommandeByDriversId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                code: 401,
                messages: 'Token manquant',
            });
        }
        // Décoder le token
        const decodedToken = jsonwebtoken_1.default.decode(token);
        if (!decodedToken) {
            return res.status(401).json({
                code: 401,
                messages: 'Votre session a expiré, merci de vous reconnecter.',
            });
        }
        // Vous pouvez utiliser l'id du token ou celui passé en paramètres, ici nous utilisons celui du token
        const conducteurId = decodedToken.id;
        // Appeler le service de commande avec les paramètres de pagination
        const options = { page, limit };
        const commande = yield commandeService.getCommandesByConducteurId(conducteurId, options);
        if (!commande) {
            return res.status(404).json({
                code: 404,
                messages: 'Commande not found',
                data: null,
                total: 0,
            });
        }
        return res.status(200).json({
            code: 200,
            messages: 'Commande retrieved successfully',
            data: commande.data,
            total: commande.total,
        });
    }
    catch (error) {
        return res.status(500).json(handleError(error));
    }
});
exports.getCommandeByDriversId = getCommandeByDriversId;
// fin
// Supprimer une commande
const deleteCommande = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield commandeService.deleteCommande(id);
        const response = {
            code: 204,
            messages: 'Commande deleted successfully',
        };
        return res.status(204).json(response);
    }
    catch (error) {
        if (error instanceof Error && error.message.includes('not found')) {
            const response = {
                code: 404,
                messages: 'Commande not found',
            };
            return res.status(404).json(response);
        }
        return res.status(500).json(handleError(error));
    }
});
exports.deleteCommande = deleteCommande;
// mise a jour des status de la commande :
const updateCommandeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const { commandeId, newStatus } = req.body;
        if (!newStatus) {
            return res.status(400).json({
                code: 400,
                messages: 'Commande ID and new status are required',
            });
        }
        // Appel du service pour mettre à jour le statut de la commande
        const updatedCommande = yield commandeService.updateCommandeStatus(id, newStatus);
        // Préparation de la réponse
        const response = {
            code: 200,
            messages: 'Commande status updated successfully',
            data: updatedCommande,
        };
        return res.status(200).json(response);
    }
    catch (error) {
        return res.status(500).json(handleError(error));
    }
});
exports.updateCommandeStatus = updateCommandeStatus;
const updateCommandeUsersStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const { commandeId, newStatus } = req.body;
        if (!newStatus) {
            return res.status(400).json({
                code: 400,
                messages: 'Commande ID and new status are required',
            });
        }
        // Appel du service pour mettre à jour le statut de la commande
        const updatedCommande = yield commandeService.updateCommandeStatus(id, newStatus);
        // Préparation de la réponse
        const response = {
            code: 200,
            messages: 'Commande status updated successfully',
            data: updatedCommande,
        };
        return res.status(200).json(response);
    }
    catch (error) {
        return res.status(500).json(handleError(error));
    }
});
exports.updateCommandeUsersStatus = updateCommandeUsersStatus;
const searchCommandesByOptions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extraction des paramètres de recherche et de pagination depuis le corps de la requête
        const { numeroCommande, dateCreation, username, page = 1, limit = 10 } = req.body;
        // Validation des paramètres de pagination
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);
        if (pageNumber < 1 || limitNumber < 1) {
            return res.status(400).json({
                code: 400,
                messages: 'Page and limit must be positive numbers.',
                data: null,
                total: 0,
            });
        }
        // Préparer les paramètres pour la recherche
        const searchOptions = {
            page: pageNumber,
            limit: limitNumber
        };
        // Appeler le service de recherche avec les paramètres
        const commandes = yield commandeService.searchCommandes(searchOptions, numeroCommande, dateCreation, username);
        if (!commandes) {
            return res.status(404).json({
                code: 404,
                messages: 'Commandes not found',
                data: null,
                total: 0,
            });
        }
        return res.status(200).json({
            code: 200,
            messages: 'Commandes retrieved successfully',
            data: commandes.data,
            total: commandes.total,
        });
    }
    catch (error) {
        console.error('Error searching commandes:', error);
        return res.status(500).json({
            code: 500,
            messages: 'Internal server error',
            data: null,
            total: 0,
        });
    }
});
exports.searchCommandesByOptions = searchCommandesByOptions;
//# sourceMappingURL=commandeController.js.map