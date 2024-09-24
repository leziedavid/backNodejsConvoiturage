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
exports.searchUsersController = exports.updateUserStatut = exports.getUserStatisticsController = exports.getUserStatisticsController2 = exports.deleteUser = exports.getUsersInfo = exports.getUserById = exports.getUsers = exports.updateUserMdp = exports.updateUser = exports.createUser = void 0;
const userService = __importStar(require("../services/userService"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = require("zod");
const userValidation_1 = require("../validation/userValidation");
const baseUrl = process.env.APP_URL || 'http://localhost:4000';
// Schéma de validation mis à jour
const updateUserStatusSchema = zod_1.z.object({
    userId: zod_1.z.string().uuid(), // Assurez-vous que userId est une chaîne UUID
    isActive: zod_1.z.boolean().nullable(), // Pour `is_active`
});
const handleError = (error) => {
    console.error(error);
    return {
        code: 500,
        messages: 'Internal server error',
    };
};
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Valider les données de la requête
        const parsedBody = userValidation_1.createUserSchema.parse(req.body);
        // Utiliser le service pour créer un utilisateur
        const newUser = yield userService.createUser(parsedBody, req.file, baseUrl);
        const response = {
            code: 201,
            messages: 'User created successfully',
            data: newUser,
        };
        res.status(201).json(response);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            // Erreurs de validation Zod
            const response = {
                code: 400,
                messages: error.errors.map(e => e.message).join(', '),
            };
            return res.status(400).json(response);
        }
        console.error(error);
        const response = {
            code: 500,
            messages: 'Internal server error',
        };
        res.status(500).json(response);
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Valider les données de la requête
        const parsedBody = userValidation_1.updateUserSchema.parse(req.body);
        // Utiliser le service pour mettre à jour un utilisateur
        const updatedUser = yield userService.updateUser(req.params.id, parsedBody, req.file, baseUrl);
        const response = {
            code: 200,
            messages: 'User updated successfully',
            data: updatedUser,
        };
        res.status(200).json(response);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            // Erreurs de validation Zod
            const response = {
                code: 400,
                messages: error.errors.map(e => e.message).join(', '),
            };
            return res.status(400).json(response);
        }
        console.error(error);
        const response = {
            code: 500,
            messages: 'Internal server error',
        };
        res.status(500).json(response);
    }
});
exports.updateUser = updateUser;
const updateUserMdp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Valider les données de la requête
        const parsedBody = userValidation_1.updateMdp.parse(req.body);
        // Utiliser le service pour mettre à jour le mot de passe  d'un utilisateur
        const updatedUser = yield userService.updateUsermdp(req.params.id, parsedBody);
        const response = {
            code: 200,
            messages: 'User password updated successfully',
            data: updatedUser,
        };
        res.status(200).json(response);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            // Erreurs de validation Zod
            const response = {
                code: 400,
                messages: error.errors.map(e => e.message).join(', '),
            };
            return res.status(400).json(response);
        }
        console.error(error);
        const response = {
            code: 500,
            messages: 'Internal server error',
        };
        res.status(500).json(response);
    }
});
exports.updateUserMdp = updateUserMdp;
// export const getUsers = async (req: Request, res: Response) => {
//     try {
//         const users = await userService.getUsers();
//         const response: BaseResponse<typeof users> = {
//             code: 200,
//             messages: 'Users retrieved successfully',
//             data: users,
//         };
//         res.json(response);
//     } catch (error) {
//         const response: BaseResponse<null> = {
//             code: 500,
//             messages: 'Internal server error',
//         };
//         res.status(500).json(response);
//     }
// };
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const users = yield userService.getUsers(options);
        if (!users) {
            return res.status(404).json({
                code: 404,
                messages: 'users not found',
                data: null,
                total: 0,
            });
        }
        return res.status(200).json({
            code: 200,
            messages: 'users retrieved successfully',
            data: users.data,
            total: users.total,
        });
    }
    catch (error) {
        return res.status(500).json(handleError(error));
    }
});
exports.getUsers = getUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    try {
        // Valider les paramètres de la requête
        userValidation_1.getUserByIdSchema.parse({ id });
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                code: 401,
                messages: 'Token manquant',
            });
        }
        const decodedToken = jsonwebtoken_1.default.decode(token);
        if (decodedToken && decodedToken.exp * 1000 < Date.now()) {
            return res.status(401).json({
                code: 401,
                messages: 'Token expiré, veuillez vous reconnecter pour accéder à la ressource',
            });
        }
        const user = yield userService.getUserById(id);
        if (user) {
            const response = {
                code: 200,
                messages: 'User retrieved successfully',
                data: user,
            };
            res.json(response);
        }
        else {
            const response = {
                code: 404,
                messages: 'User not found',
            };
            res.status(404).json(response);
        }
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            // Erreurs de validation Zod
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
exports.getUserById = getUserById;
const getUsersInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    try {
        // Valider les paramètres de la requête
        userValidation_1.getUserByIdSchema.parse({ id });
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                code: 401,
                messages: 'Token manquant',
            });
        }
        const decodedToken = jsonwebtoken_1.default.decode(token);
        if (decodedToken && decodedToken.exp * 1000 < Date.now()) {
            return res.status(401).json({
                code: 401,
                messages: 'Token expiré, veuillez vous reconnecter pour accéder à la ressource',
            });
        }
        const user = yield userService.getUserInfo(id);
        if (user) {
            const response = {
                code: 200,
                messages: 'User retrieved successfully',
                data: user,
            };
            res.json(response);
        }
        else {
            const response = {
                code: 404,
                messages: 'User not found',
            };
            res.status(404).json(response);
        }
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            // Erreurs de validation Zod
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
exports.getUsersInfo = getUsersInfo;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield userService.deleteUser(id);
        const response = {
            code: 200,
            messages: 'User deleted successfully',
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
exports.deleteUser = deleteUser;
const getUserStatisticsController2 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const stats = yield userService.getUserStatistics(userId);
        res.json(stats);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching user statistics' });
    }
});
exports.getUserStatisticsController2 = getUserStatisticsController2;
const getUserStatisticsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = req.params.id;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                code: 401,
                messages: 'Token manquant',
            });
        }
        // Décoder le token sans validation
        const decodedToken = jsonwebtoken_1.default.decode(token);
        if (decodedToken && decodedToken.exp * 1000 < Date.now()) {
            return res.status(401).json({
                code: 401,
                messages: 'Token expiré, veuillez vous reconnecter pour accéder à la ressource',
            });
        }
        // Récupérez les statistiques de l'utilisateur
        const stats = yield userService.getUserStatistics(userId);
        return res.status(200).json({
            code: 200,
            data: stats
        }); // Retourner les statistiques formatées de manière uniforme
    }
    catch (error) {
        console.error('Error fetching user statistics:', error); // Ajout de console.error pour déboguer
        return res.status(500).json({
            code: 500,
            messages: 'Erreur lors de la récupération des statistiques de l\'utilisateur'
        }); // Retourner l'erreur formatée de manière uniforme
    }
});
exports.getUserStatisticsController = getUserStatisticsController;
const updateUserStatut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Valider les données de la requête
        const { userId, isActive } = updateUserStatusSchema.parse({
            userId: req.query.userId,
            isActive: req.query.isActive === 'true' ? true : req.query.isActive === 'false' ? false : null,
        });
        // Déterminer le statut de vérification basé sur isActive
        const verificationStatus = isActive === true ? 'validated' : 'pending';
        // Utiliser le service pour mettre à jour le statut de l'utilisateur
        const updatedUser = yield userService.updateUserState(userId, { isActive, verificationStatus });
        const response = {
            code: 200,
            messages: 'User status updated successfully',
            data: updatedUser,
        };
        res.status(200).json(response);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            // Erreurs de validation Zod
            const response = {
                code: 400,
                messages: error.errors.map(e => e.message).join(', '),
            };
            return res.status(400).json(response);
        }
        console.error(error);
        const response = {
            code: 500,
            messages: 'Internal server error',
        };
        res.status(500).json(response);
    }
});
exports.updateUserStatut = updateUserStatut;
const searchUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extraction des paramètres de recherche et de pagination
        const searchTerm = req.query.term || ''; // Terme de recherche
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
        // Appeler le service de recherche avec les paramètres de pagination
        const options = { page, limit };
        const users = yield userService.searchUsers(searchTerm, options);
        if (!users) {
            return res.status(404).json({
                code: 404,
                messages: 'Users not found',
                data: null,
                total: 0,
            });
        }
        return res.status(200).json({
            code: 200,
            messages: 'Users retrieved successfully',
            data: users.data,
            total: users.total,
        });
    }
    catch (error) {
        console.error('Error searching users:', error);
        return res.status(500).json({
            code: 500,
            messages: 'Internal server error',
            data: null,
            total: 0,
        });
    }
});
exports.searchUsersController = searchUsersController;
//# sourceMappingURL=userController.js.map