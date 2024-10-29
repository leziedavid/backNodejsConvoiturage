"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordSchema = exports.sendOtpSchema = void 0;
const zod_1 = require("zod");
// Schéma de validation pour l'envoi de l'OTP
exports.sendOtpSchema = zod_1.z.object({
    email: zod_1.z.string().email('Email invalide'),
});
exports.resetPasswordSchema = zod_1.z.object({
    password: zod_1.z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
    email: zod_1.z.string().email('Email invalide'),
});
//# sourceMappingURL=sendOtpSchema.js.map