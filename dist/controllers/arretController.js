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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteArret = exports.getArretById = exports.getArrets = exports.updateArret = exports.createArret = void 0;
const arretService = __importStar(require("../services/arretService"));
const zod_1 = require("zod");
const arretValidation_1 = require("../validation/arretValidation");
const createArret = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Valider les données de la requête
        const parsedBody = arretValidation_1.createArretSchema.parse(req.body);
        // Utiliser le service pour créer un arrêt
        const newArret = yield arretService.createArret(parsedBody);
        const response = {
            code: 201,
            messages: 'Arret created successfully',
            data: newArret,
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
exports.createArret = createArret;
const updateArret = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Valider les données de la requête
        const parsedBody = arretValidation_1.updateArretSchema.parse(req.body);
        // Utiliser le service pour mettre à jour un arrêt
        const updatedArret = yield arretService.updateArret(req.params.id, parsedBody);
        const response = {
            code: 200,
            messages: 'Arret updated successfully',
            data: updatedArret,
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
exports.updateArret = updateArret;
const getArrets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const arrets = yield arretService.getArrets();
        const response = {
            code: 200,
            messages: 'Arrets retrieved successfully',
            data: arrets,
        };
        res.json(response);
    }
    catch (error) {
        const response = {
            code: 500,
            messages: 'Internal server error',
        };
        res.status(500).json(response);
    }
});
exports.getArrets = getArrets;
const getArretById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // Valider les paramètres de la requête
        arretValidation_1.getArretByIdSchema.parse({ id });
        const arret = yield arretService.getArretById(id);
        if (arret) {
            const response = {
                code: 200,
                messages: 'Arret retrieved successfully',
                data: arret,
            };
            res.json(response);
        }
        else {
            const response = {
                code: 404,
                messages: 'Arret not found',
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
exports.getArretById = getArretById;
const deleteArret = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield arretService.deleteArret(id);
        const response = {
            code: 200,
            messages: 'Arret deleted successfully',
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
exports.deleteArret = deleteArret;
//# sourceMappingURL=arretController.js.map