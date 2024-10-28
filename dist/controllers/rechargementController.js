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
exports.getRechargements = exports.createRechargement = void 0;
const rechargementService = __importStar(require("../services/rechargementService"));
const zod_1 = require("zod");
// Validation schema (Assume it is defined elsewhere)
const rechargementValidation_1 = require("../validation/rechargementValidation");
const handleError = (error) => {
    console.error(error);
    return {
        code: 500,
        messages: 'Internal server error',
    };
};
const createRechargement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedBody = rechargementValidation_1.createRechargementSchema.parse(req.body);
        const newRechargement = yield rechargementService.createRechargement(parsedBody);
        const response = {
            code: 201,
            messages: 'Rechargement created successfully',
            data: newRechargement,
        };
        res.status(201).json(response);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
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
exports.createRechargement = createRechargement;
const getRechargements = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extraction des paramètres de pagination
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        console.log(page);
        // Vérifiez si page et limit sont des nombres positifs
        if (page < 1 || limit < 1) {
            return res.status(400).json({
                code: 400,
                messages: 'Page and limit must be positive numbers.',
                data: null,
                total: 0,
            });
        }
        // Appeler le service de rechargements avec les paramètres de pagination
        const options = { page, limit };
        const rechargements = yield rechargementService.getAllRechargements(options);
        if (!rechargements) {
            return res.status(404).json({
                code: 404,
                messages: 'Rechargements not found',
                data: null,
                total: 0,
            });
        }
        return res.status(200).json({
            code: 200,
            messages: 'Rechargements retrieved successfully',
            data: rechargements.data,
            total: rechargements.total,
        });
    }
    catch (error) {
        return res.status(500).json(handleError(error));
    }
});
exports.getRechargements = getRechargements;
//# sourceMappingURL=rechargementController.js.map