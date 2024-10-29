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
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = __importDefault(require("path"));
// Configurez le transporteur d'email
const transporter = nodemailer_1.default.createTransport({
    host: process.env.EMAIL_HOST, // Votre serveur SMTP
    port: Number(process.env.EMAIL_PORT), // Le port du serveur SMTP
    secure: true, // Utilisez 'true' si le serveur utilise SSL/TLS sur le port 465
    auth: {
        user: process.env.EMAIL_USER, // Votre adresse email
        pass: process.env.EMAIL_PASS // Votre mot de passe
    }
});
// Fonction pour envoyer un email
const sendEmail = (_a) => __awaiter(void 0, [_a], void 0, function* ({ to, subject, text, html, attachments }) {
    try {
        // Préparer les options d'email
        const mailOptions = {
            from: process.env.EMAIL_USER, // Adresse de l'expéditeur
            to: Array.isArray(to) ? to.join(', ') : to, // Adresses des destinataires
            subject,
            text,
            html,
            attachments: attachments ? attachments.map(attachment => ({
                filename: attachment.filename,
                path: path_1.default.resolve(__dirname, attachment.path)
            })) : []
        };
        // Envoyer l'email
        const info = yield transporter.sendMail(mailOptions);
        console.log('Email envoyé : %s', info.messageId);
    }
    catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email :', error);
        throw error;
    }
});
exports.sendEmail = sendEmail;
//# sourceMappingURL=mailService.js.map