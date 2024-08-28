import nodemailer, { SendMailOptions, Transporter } from 'nodemailer';
import path from 'path';
import { promises as fs } from 'fs';

// Définir les types pour les pièces jointes
interface Attachment {
    filename: string;
    path: string;
}

// Définir les types pour les options d'email
interface EmailOptions {
    to: string | string[]; // Peut être une seule adresse ou un tableau d'adresses
    subject: string;
    text?: string;
    html?: string;
    attachments?: Attachment[]; // Liste des pièces jointes
}

// Configurez le transporteur d'email
const transporter: Transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST, // Votre serveur SMTP
    port: Number(process.env.EMAIL_PORT), // Le port du serveur SMTP
    secure: true, // Utilisez 'true' si le serveur utilise SSL/TLS sur le port 465
    auth: {
        user: process.env.EMAIL_USER, // Votre adresse email
        pass: process.env.EMAIL_PASS  // Votre mot de passe
    }
});

// Fonction pour envoyer un email
const sendEmail = async ({ to, subject, text, html, attachments }: EmailOptions): Promise<void> => {
    try {
        // Préparer les options d'email
        const mailOptions: SendMailOptions = {
            from: process.env.EMAIL_USER, // Adresse de l'expéditeur
            to: Array.isArray(to) ? to.join(', ') : to, // Adresses des destinataires
            subject,
            text,
            html,
            attachments: attachments ? attachments.map(attachment => ({
                filename: attachment.filename,
                path: path.resolve(__dirname, attachment.path)
            })) : []
        };

        // Envoyer l'email
        const info = await transporter.sendMail(mailOptions);

        console.log('Email envoyé : %s', info.messageId);
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email :', error);
        throw error;
    }
};

// Exporter la fonction pour l'utiliser ailleurs
export { sendEmail };
