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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.sendOtp = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt = require('bcryptjs');
const Conn_1 = __importDefault(require("../Conn"));
const mailService_1 = require("./mailService");
// Générer un code OTP de 4 chiffres
const generateOtpCode = () => {
    return Math.floor(1000 + Math.random() * 9000).toString(); // Génère un nombre entre 1000 et 9999
};
// Générer un token JWT avec le code OTP
const generateToken = (otpCode) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }
    return jsonwebtoken_1.default.sign({ otp: otpCode }, process.env.JWT_SECRET, { expiresIn: '1min' });
};
const sendOtp = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Vérifier si l'utilisateur existe
        const user = yield Conn_1.default.user.findUnique({ where: { email } });
        if (!user) {
            return {
                code: 404,
                messages: 'Utilisateur non trouvé',
                data: null,
            };
        }
        // Générer un code OTP
        const otpCode = generateOtpCode();
        // Générer un token pour l'OTP
        const otpToken = generateToken(otpCode);
        // Préparer le contenu de l'e-mail
        const subject = 'Votre code OTP';
        const text = `Votre code OTP est : ${otpCode}`;
        const html = `<p>Votre code OTP est : <strong>${otpCode}</strong></p>`;
        // Envoyer l'e-mail à l'utilisateur
        yield (0, mailService_1.sendEmail)({
            to: user.email,
            subject,
            text,
            html,
        });
        return {
            code: 200,
            messages: 'OTP envoyé avec succès',
            data: { otpCode, otpToken }, // Retourne le code OTP et le token
        };
    }
    catch (error) {
        console.error(error);
        return {
            code: 500,
            messages: 'Erreur lors de l\'envoi de l\'OTP',
            data: null,
        };
    }
});
exports.sendOtp = sendOtp;
const resetPassword = (password, email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Hachage du mot de passe
        const hashedPassword = yield bcrypt.hash(password, 10);
        // Mettre à jour le mot de passe dans la base de données
        yield Conn_1.default.user.update({
            where: { email: email },
            data: { password_hash: hashedPassword },
        });
        return {
            code: 200,
            messages: 'Mot de passe réinitialisé avec succès',
            data: null,
        };
    }
    catch (error) {
        console.error(error);
        return {
            code: 500,
            messages: 'Erreur lors de la réinitialisation du mot de passe',
            data: null,
        };
    }
});
exports.resetPassword = resetPassword;
//# sourceMappingURL=Auth.js.map