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
exports.logout = exports.login = void 0;
const authValidation_1 = require("../validation/authValidation");
const authService = __importStar(require("../services/authService"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Valider les données de la requête
        const parsedBody = authValidation_1.loginSchema.parse(req.body);
        const { email, password } = parsedBody;
        // Utiliser le service pour connecter l'utilisateur
        const { token, user } = yield authService.loginUser(email, password);
        const response = {
            // const response: BaseResponse<{ token: string}> = {
            code: 200,
            messages: 'Login successful',
            data: { token, user },
        };
        res.json(response);
    }
    catch (error) {
        const response = {
            code: 400,
            messages: (error instanceof Error) ? error.message : 'An unexpected error occurred',
        };
        res.status(400).json(response);
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Valider les données de la requête (si nécessaire)
        authValidation_1.logoutSchema.parse(req.body);
        // Utiliser le service pour déconnecter l'utilisateur
        yield authService.logoutUser();
        const response = {
            code: 200,
            messages: 'Logout successful',
        };
        res.json(response);
    }
    catch (error) {
        const response = {
            code: 400,
            messages: (error instanceof Error) ? error.message : 'An unexpected error occurred',
        };
        res.status(400).json(response);
    }
});
exports.logout = logout;
//# sourceMappingURL=authController.js.map