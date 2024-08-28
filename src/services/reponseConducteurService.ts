// src/services/reponseConducteurService.ts
import prisma from '../Conn';
import { createEmailNotificationHTML } from '../models/EmailNotification';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { sendEmail } from './mailService';

const formatDate = (date: Date) => format(date, "d MMMM yyyy 'à' HH'h' mm", { locale: fr });

export const createReponseConducteur = async (data: {
    
    commande_id: string,
    conducteur_id: string,
    statut_reponse: string,
    commentaires?: string,
    // temps_reponse: Date
}) => {
    const { commande_id, conducteur_id, statut_reponse, ...reponseData } = data;

    // Créer la réponse du conducteur
    const newReponse = await prisma.reponseConducteur.create({
        data: {
            ...reponseData,
            commande_id,
            conducteur_id,
            statut_reponse,
        },
    });

    // Mettre à jour le statut de la commande
    await prisma.commande.update({
        where: { id: commande_id },
        data: { statut_commande: 'validated' },
    });

    // Récupérer les détails de la commande et l'utilisateur associé
    const commandeDetails = await prisma.commande.findUnique({
        where: { id: commande_id },
        include: {
            utilisateur: true,
            trajet: true,
            conducteur: true,
        },
    });

    if (!commandeDetails) {
        throw new Error('Commande not found');
    }

    // Préparer les variables pour le modèle d'email
    const emailHtml = createEmailNotificationHTML(
        commandeDetails.utilisateur.username,
        commandeDetails.numeroCommande,
        commandeDetails.conducteur.username,
        commandeDetails.trajet.ville_depart,
        commandeDetails.trajet.ville_arrivee,
        formatDate(new Date(commandeDetails.temps_prise_en_charge)),
        formatDate(new Date(commandeDetails.temps_depose)),
        'Votre Nom',
        'Nom de Votre Entreprise',
        'Coordonnées de Contact',
        'https://www.votreentreprise.com'
    );

    // Envoyer l'email
    await sendEmail({
        to: [commandeDetails.utilisateur.email],
        subject: `Validation de Votre Course ${commandeDetails.numeroCommande}`,
        text: 'Votre commande a été validée par le conducteur. Consultez les détails dans le corps du message.',
        html: emailHtml,
    });

    return newReponse;
};

export const getReponsesConducteur = async () => {
    return await prisma.reponseConducteur.findMany();
};

export const getReponseConducteurById = async (id: string) => {
    return await prisma.reponseConducteur.findUnique({
        where: { id },
    });
};

export const deleteReponseConducteur = async (id: string) => {
    await prisma.reponseConducteur.delete({ where: { id } });
};
