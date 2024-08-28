import prisma from '../Conn';
import { Commande, Prisma } from '@prisma/client';
import { sendEmail } from './mailService';


const generateCommandeCode = (): string => {
    // Obtenir la date actuelle
    const today = new Date();

    // Formater les parties de la date
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Mois de 0-11 donc +1
    const year = today.getFullYear().toString().slice(-2); // Deux derniers chiffres de l'année

    // Générer un code aléatoire de 3 chiffres
    const randomCode = Math.floor(100 + Math.random() * 900).toString(); // Nombre entre 100 et 999

    // Retourner le code de commande
    return `C-${day}${month}${year}Nº-${randomCode}`;
};

export const createCommande = async (commandeData: any): Promise<Commande> => {
    const {
        trajet_id,
        utilisateur_id,
        conducteur_id,
        point_prise_en_charge,
        point_depose,
        temps_prise_en_charge,
        temps_depose,
        statut_commande,
        montant,
        mode_paiement,
        commentaires_instructions,
        historique_statuts,
        evaluations,
        date_action
    } = commandeData;

    try {
        // Récupérer les informations du trajet
        const trajet = await prisma.trajet.findUnique({
            where: { id: trajet_id },
            select: { nombre_de_places: true, commandes: true }
        });

        if (!trajet) {
            throw new Error('Trajet not found');
        }

        // Calculer le nombre de places déjà réservées
        const nombreDeCommandes = trajet.commandes.length;
        const placesDisponibles =  trajet.nombre_de_places - nombreDeCommandes ;

        if (trajet.nombre_de_places === nombreDeCommandes) {
            throw new Error('Cet trajet n\'accepte plus de commandes, le nombre de places est atteint');
        }

        // Générer le code de commande basé sur la date du jour
        const numeroCommande = generateCommandeCode();

        // Créer la commande
        const newCommande = await prisma.commande.create({
            data: {
                numeroCommande,
                trajet: { connect: { id: trajet_id } },
                utilisateur: { connect: { id: utilisateur_id } },
                conducteur: { connect: { id: conducteur_id } },
                point_prise_en_charge,
                point_depose,
                temps_prise_en_charge,
                temps_depose,
                statut_commande,
                montant,
                mode_paiement,
                commentaires_instructions,
                historique_statuts,
                evaluations,
                date_action,
            },
        });

        // Mettre à jour le nombre de places disponibles dans le trajet
        // await prisma.trajet.update({
        //     where: { id: trajet_id },
        //     data: {
        //         nombre_de_places: placesDisponibles -1
        //     },
        // });

        return newCommande;

    } catch (err: unknown) {

        // Propager les erreurs spécifiques telles quelles
        if (err instanceof Error) {
            if (err.message.includes('Cet trajet n\'accepte plus de commandes')) {
                throw err; // Propager l'erreur spécifique
            }

            // Gestion des erreurs Prisma spécifiques
            if (err.message.includes('P2002')) { // Exemple : violation de contrainte unique
                throw new Error('Constraint violation error');
            }
            if (err.message.includes('P2025')) { // Exemple : enregistrement non trouvé
                throw new Error('Commande not found');
            }
        }

        console.error('Error creating commande:', err);
        throw new Error('Internal server error');
    }
};

export const updateCommande = async (commandeId: string, commandeData: any): Promise<Commande> => {
    const {
        trajet_id,
        utilisateur_id,
        conducteur_id,
        point_prise_en_charge,
        point_depose,
        temps_prise_en_charge,
        temps_depose,
        statut_commande,
        montant,
        mode_paiement,
        commentaires_instructions,
        historique_statuts,
        evaluations,
        date_action
    } = commandeData;

    try {
        // Vérifiez que la commande existe avant de tenter la mise à jour
        const existingCommande = await prisma.commande.findUnique({ where: { id: commandeId } });
        if (!existingCommande) {
            throw new Error('Commande not found');
        }

        // Mettre à jour la commande
        const updatedCommande = await prisma.commande.update({
            where: { id: commandeId },
            data: {
                ...(trajet_id && { trajet: { connect: { id: trajet_id } } }),
                ...(utilisateur_id && { utilisateur: { connect: { id: utilisateur_id } } }),
                ...(conducteur_id && { conducteur: { connect: { id: conducteur_id } } }),
                point_prise_en_charge,
                point_depose,
                temps_prise_en_charge,
                temps_depose,
                statut_commande,
                montant,
                mode_paiement,
                commentaires_instructions,
                historique_statuts,
                evaluations,
                date_action,
            },
        });

        return updatedCommande;
    } catch (err: unknown) {
        if (err instanceof Error) {
            const prismaError = err.message;

            // Gestion des erreurs Prisma
            if (prismaError.includes('P2002')) { // Exemple : violation de contrainte unique
                throw new Error('Constraint violation error');
            }
            if (prismaError.includes('P2025')) { // Exemple : enregistrement non trouvé
                throw new Error('Commande not found');
            }
        }

        console.error('Error updating commande:', err);
        throw new Error('Internal server error');
    }
};

// Fonction pour obtenir toutes les commandes
export const getCommandes = async (): Promise<Commande[]> => {
    return prisma.commande.findMany();
};

// Fonction pour obtenir une commande par ID
export const getCommandeById = async (id: string): Promise<Commande | null> => {
    return prisma.commande.findUnique({
        where: { id },
        include: {
            trajet: true,
            utilisateur: true,
            conducteur: true,
            reponsesConducteur: true,
        },
    });
};


// Fonction pour obtenir une commande par ID
export const getCommandeByUsers = async (utilisateur_id: string): Promise<Commande | null> => {
    return prisma.commande.findFirst({
        where: { utilisateur_id: utilisateur_id },
        orderBy: {
            date_creation: 'desc',
        },
        include: {
            trajet: true,
            utilisateur: true,
            conducteur: true,
            reponsesConducteur: true,
        },
    });
};

// la dernier commande du user page d''accuel

export const getAllCommandeByUsers = async (conducteurId: string): Promise<Commande[]> => {

    const commandes = await prisma.commande.findMany({

        where: { utilisateur_id: conducteurId },
        orderBy: {
            date_creation: 'desc',
        },
        include: {
            trajet: true,
            utilisateur: true,
            conducteur: true,
            reponsesConducteur: true,
        },
    });
    return commandes;
};

// la dernier commande du user page d''accuel

export const getCommandesByConducteurId = async (conducteurId: string): Promise<Commande[]> => {
    console.log(`Fetching commandes for conducteurId: ${conducteurId}`);
    
    const commandes = await prisma.commande.findMany({
        where: { conducteur_id: conducteurId },
        orderBy: {
            date_creation: 'desc',
        },
        include: {
            trajet: true,
            utilisateur: true,
            conducteur: true,
            reponsesConducteur: true,
        },
    });

    console.log(`Commandes fetched: ${commandes.length}`);
    return commandes;
};

export const  getDerniereCommandeByConducteurId = async (conducteurId: string): Promise<Commande | null> => {
    return prisma.commande.findFirst({
        where: { conducteur_id: conducteurId },
        orderBy: {
            date_creation: 'desc', // Trie par date de création, du plus récent au plus ancien
        },
        include: {
            trajet: true,
            utilisateur: true,
            conducteur: true,
            reponsesConducteur: true,
        },
    });
};


// Fonction pour supprimer une commande
export const deleteCommande = async (id: string): Promise<void> => {
    await prisma.commande.delete({ where: { id } });
};

// Fonction pour mettre à jour le statut de la commande
export const updateCommandeStatus = async (commandeId: string, newStatus: string): Promise<Commande> => {
    try {
        // Vérifiez que la commande existe avant de tenter la mise à jour
        const existingCommande = await prisma.commande.findUnique({
            where: { id: commandeId },
            include: {
                trajet: true,          // Inclure le trajet dans la réponse
                utilisateur: true,
                conducteur: true,
            },
        });

        if (!existingCommande) {
            throw new Error('Commande not found');
        }

        // Mettre à jour le statut de la commande
        const updatedCommande = await prisma.commande.update({
            where: { id: commandeId },
            data: {
                statut_commande: newStatus,
                date_action: new Date(),
            },
            include: {
                trajet: true,          // Inclure le trajet dans la réponse mise à jour
                utilisateur: true,
                conducteur: true,
            },
        });

        // Récupérer les informations nécessaires
        const { utilisateur, trajet } = updatedCommande;

        // Préparer le contenu de l'e-mail en fonction du statut
        let subject = '';
        let text = '';
        let html = '';

        switch (newStatus) {
            case 'validated':
                subject = 'Commande Validée';
                text = `Votre commande ${updatedCommande.numeroCommande} a été validée. Trajet : ${trajet.point_depart} à ${trajet.point_arrivee}.`;
                html = `<p>Votre commande <strong>${updatedCommande.numeroCommande}</strong> a été validée.</p><p>Trajet : ${trajet.point_depart} à ${trajet.point_arrivee}.</p>`;
                break;
            case 'started':
                subject = 'Commande Démarrée';
                text = `Votre commande ${updatedCommande.numeroCommande} a été démarrée. Trajet : ${trajet.point_depart} à ${trajet.point_arrivee}.`;
                html = `<p>Votre commande <strong>${updatedCommande.numeroCommande}</strong> a été démarrée.</p><p>Trajet : ${trajet.point_depart} à ${trajet.point_arrivee}.</p>`;
                break;
            case 'dismissed':
                subject = 'Commande Annulée';
                text = `Votre commande ${updatedCommande.numeroCommande} a été annulée. Trajet : ${trajet.point_depart} à ${trajet.point_arrivee}.`;
                html = `<p>Votre commande <strong>${updatedCommande.numeroCommande}</strong> a été annulée.</p><p>Trajet : ${trajet.point_depart} à ${trajet.point_arrivee}.</p>`;
                break;
            default:
                throw new Error('Invalid status');
        }

        // Envoyer un e-mail à l'utilisateur
        await sendEmail({
            to: utilisateur.email,
            subject,
            text,
            html, // Inclure le contenu HTML dans l'e-mail
        });

        return updatedCommande;
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error('Error updating commande status:', err);
            throw new Error('Internal server error');
        }
        throw new Error('Internal server error');
    }
};

