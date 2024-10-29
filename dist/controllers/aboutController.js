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
exports.deleteAbout = exports.getAboutById = exports.getAbouts = exports.updateAbout = exports.createAbout = void 0;
const aboutService = __importStar(require("../services/aboutService"));
const aboutValidation_1 = require("../validation/aboutValidation");
const zod_1 = require("zod");
const createAbout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Valider les données de la requête
        const parsedBody = aboutValidation_1.createAboutSchema.parse(req.body);
        // Utiliser le service pour créer un About
        const newAbout = yield aboutService.createAbout(parsedBody);
        const response = {
            code: 201,
            messages: 'About created successfully',
            data: newAbout,
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
exports.createAbout = createAbout;
const updateAbout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Valider les données de la requête
        const parsedBody = aboutValidation_1.updateAboutSchema.parse(req.body);
        // Utiliser le service pour mettre à jour un About
        const updatedAbout = yield aboutService.updateAbout(req.params.id, parsedBody);
        const response = {
            code: 200,
            messages: 'About updated successfully',
            data: updatedAbout,
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
exports.updateAbout = updateAbout;
const getAbouts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const abouts = yield aboutService.getAbouts();
        const response = {
            code: 200,
            messages: 'Abouts retrieved successfully',
            data: abouts,
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
exports.getAbouts = getAbouts;
const getAboutById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const about = yield aboutService.getAboutById(id);
        if (about) {
            const response = {
                code: 200,
                messages: 'About retrieved successfully',
                data: about,
            };
            res.json(response);
        }
        else {
            const response = {
                code: 404,
                messages: 'About not found',
            };
            res.status(404).json(response);
        }
    }
    catch (error) {
        const response = {
            code: 500,
            messages: 'Internal server error',
        };
        res.status(500).json(response);
    }
});
exports.getAboutById = getAboutById;
const deleteAbout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield aboutService.deleteAbout(id);
        const response = {
            code: 200,
            messages: 'About deleted successfully',
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
exports.deleteAbout = deleteAbout;
//# sourceMappingURL=aboutController.js.map