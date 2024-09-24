import jwt from 'jsonwebtoken';
const bcrypt = require('bcryptjs');
import prisma from '../Conn';
import { User } from '@prisma/client';
import { sendEmail } from './mailService';

// Générer un code OTP de 4 chiffres
const generateOtpCode = (): string => {
    return Math.floor(1000 + Math.random() * 9000).toString(); // Génère un nombre entre 1000 et 9999
};

// Générer un token JWT avec le code OTP
const generateToken = (otpCode: string) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }
    return jwt.sign({ otp: otpCode }, process.env.JWT_SECRET as string, { expiresIn: '1min' });
};

export const sendOtp = async (email: string): Promise<any> => {
    try {
        // Vérifier si l'utilisateur existe
        const user = await prisma.user.findUnique({ where: { email } });
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
        await sendEmail({
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

    } catch (error) {
        console.error(error);
        return {
            code: 500,
            messages: 'Erreur lors de l\'envoi de l\'OTP',
            data: null,
        };
    }
};

export const resetPassword = async (password: string, email: string): Promise<any> => {
    try {
        // Hachage du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Mettre à jour le mot de passe dans la base de données
        await prisma.user.update({
            where: { email: email },
            data: { password_hash: hashedPassword },
        });

        return {
            code: 200,
            messages: 'Mot de passe réinitialisé avec succès',
            data: null,
        };
    } catch (error) {
        console.error(error);
        return {
            code: 500,
            messages: 'Erreur lors de la réinitialisation du mot de passe',
            data: null,
        };
    }
};
