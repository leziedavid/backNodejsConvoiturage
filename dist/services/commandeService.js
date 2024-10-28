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
exports.searchCommandes = exports.updateCommandeStatus2 = exports.updateCommandeStatus = exports.deleteCommande = exports.getDerniereCommandeByConducteurId = exports.getCommandesByConducteurId = exports.getAllCommandeByUsers = exports.getCommandeByUsers = exports.getCommandeById = exports.getCommandes = exports.updateCommande = exports.createCommande = void 0;
const Conn_1 = __importDefault(require("../Conn"));
const odersPaginate_1 = require("./allPaginations/odersPaginate");
const mailService_1 = require("./mailService");
const generateCommandeCode = () => {
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
const createCommande = (commandeData) => __awaiter(void 0, void 0, void 0, function* () {
    const { trajet_id, utilisateur_id, conducteur_id, point_prise_en_charge, point_depose, temps_prise_en_charge, temps_depose, statut_commande, montant, mode_paiement, commentaires_instructions, historique_statuts, evaluations, date_action } = commandeData;
    try {
        // Récupérer les informations du trajet
        const trajet = yield Conn_1.default.trajet.findUnique({
            where: { id: trajet_id },
            select: { nombre_de_places: true, commandes: true }
        });
        if (!trajet) {
            throw new Error('Trajet not found');
        }
        // Calculer le nombre de places déjà réservées
        const nombreDeCommandes = trajet.commandes.length;
        const placesDisponibles = trajet.nombre_de_places - nombreDeCommandes;
        if (trajet.nombre_de_places === nombreDeCommandes) {
            throw new Error('Cet trajet n\'accepte plus de commandes, le nombre de places est atteint');
        }
        // Générer le code de commande basé sur la date du jour
        const numeroCommande = generateCommandeCode();
        // Créer la commande
        const newCommande = yield Conn_1.default.commande.create({
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
    }
    catch (err) {
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
});
exports.createCommande = createCommande;
const updateCommande = (commandeId, commandeData) => __awaiter(void 0, void 0, void 0, function* () {
    const { trajet_id, utilisateur_id, conducteur_id, point_prise_en_charge, point_depose, temps_prise_en_charge, temps_depose, statut_commande, montant, mode_paiement, commentaires_instructions, historique_statuts, evaluations, date_action } = commandeData;
    try {
        // Vérifiez que la commande existe avant de tenter la mise à jour
        const existingCommande = yield Conn_1.default.commande.findUnique({ where: { id: commandeId } });
        if (!existingCommande) {
            throw new Error('Commande not found');
        }
        // Mettre à jour la commande
        const updatedCommande = yield Conn_1.default.commande.update({
            where: { id: commandeId },
            data: Object.assign(Object.assign(Object.assign(Object.assign({}, (trajet_id && { trajet: { connect: { id: trajet_id } } })), (utilisateur_id && { utilisateur: { connect: { id: utilisateur_id } } })), (conducteur_id && { conducteur: { connect: { id: conducteur_id } } })), { point_prise_en_charge,
                point_depose,
                temps_prise_en_charge,
                temps_depose,
                statut_commande,
                montant,
                mode_paiement,
                commentaires_instructions,
                historique_statuts,
                evaluations,
                date_action }),
        });
        return updatedCommande;
    }
    catch (err) {
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
});
exports.updateCommande = updateCommande;
// Fonction pour obtenir toutes les commandes
const getCommandes = (options) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, odersPaginate_1.paginate)((args) => Conn_1.default.commande.findMany(Object.assign({ orderBy: { date_creation: 'desc' }, include: {
            trajet: true,
            utilisateur: true,
            conducteur: true,
            reponsesConducteur: true,
        } }, args)), options);
});
exports.getCommandes = getCommandes;
// Fonction pour obtenir une commande par ID
const getCommandeById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return Conn_1.default.commande.findUnique({
        where: { id },
        include: {
            trajet: true,
            utilisateur: true,
            conducteur: true,
            reponsesConducteur: true,
        },
    });
});
exports.getCommandeById = getCommandeById;
// Fonction pour obtenir les commandes par ID
const getCommandeByUsers = (utilisateur_id) => __awaiter(void 0, void 0, void 0, function* () {
    return Conn_1.default.commande.findFirst({
        where: { utilisateur_id: utilisateur_id },
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
});
exports.getCommandeByUsers = getCommandeByUsers;
const getAllCommandeByUsers = (utilisateur_id, options) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, odersPaginate_1.paginate)((args) => Conn_1.default.commande.findMany(Object.assign({ where: { utilisateur_id: utilisateur_id }, orderBy: { date_creation: 'desc' }, include: {
            trajet: true,
            utilisateur: true,
            conducteur: true,
            reponsesConducteur: true,
        } }, args)), options);
});
exports.getAllCommandeByUsers = getAllCommandeByUsers;
const getCommandesByConducteurId = (conducteur_id, options) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, odersPaginate_1.paginate)((args) => Conn_1.default.commande.findMany(Object.assign({ where: { conducteur_id: conducteur_id }, orderBy: { date_creation: 'desc' }, include: {
            trajet: true,
            utilisateur: true,
            conducteur: true,
            reponsesConducteur: true,
        } }, args)), options);
});
exports.getCommandesByConducteurId = getCommandesByConducteurId;
const getDerniereCommandeByConducteurId = (conducteurId) => __awaiter(void 0, void 0, void 0, function* () {
    return Conn_1.default.commande.findFirst({
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
});
exports.getDerniereCommandeByConducteurId = getDerniereCommandeByConducteurId;
// Fonction pour supprimer une commande
const deleteCommande = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield Conn_1.default.commande.delete({ where: { id } });
});
exports.deleteCommande = deleteCommande;
// Fonction pour mettre à jour le statut de la commande
const updateCommandeStatus = (commandeId, newStatus) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Vérifiez que la commande existe avant de tenter la mise à jour
        const existingCommande = yield Conn_1.default.commande.findUnique({
            where: { id: commandeId },
            include: {
                trajet: true, // Inclure le trajet dans la réponse
                utilisateur: true,
                conducteur: true,
            },
        });
        if (!existingCommande) {
            throw new Error('Commande not found');
        }
        // Montant de la commande
        const montantCommande = existingCommande.montant || 0;
        // Mettre à jour le statut de la commande
        const updatedCommande = yield Conn_1.default.commande.update({
            where: { id: commandeId },
            data: {
                statut_commande: newStatus,
                date_action: new Date(),
            },
            include: {
                trajet: true, // Inclure le trajet dans la réponse mise à jour
                utilisateur: true,
                conducteur: true,
            },
        });
        // Récupérer les informations nécessaires
        const { utilisateur, conducteur } = updatedCommande;
        // Effectuer les mises à jour liées aux soldes
        if (newStatus === 'validated') {
            // Calculer 18% du montant de la commande
            const montantDeduit = montantCommande * 0.18;
            // Déduire le montant du wallet du conducteur
            yield Conn_1.default.wallet.update({
                where: { user_id: conducteur.id },
                data: { balance: { decrement: montantDeduit } },
            });
            // Ajouter la somme déduite dans la table Solde
            yield Conn_1.default.solde.create({
                data: {
                    user_id: conducteur.id,
                    montant: montantDeduit,
                    commandeId: updatedCommande.id,
                },
            });
        }
        else if (newStatus === 'dismissed') {
            // Récupérer le montant de la table Solde correspondant à la commande
            const soldeEntry = yield Conn_1.default.solde.findFirst({
                where: { commandeId: updatedCommande.id },
            });
            if (soldeEntry) {
                const montantRetourne = soldeEntry.montant;
                // Rendre le montant au wallet du conducteur
                yield Conn_1.default.wallet.update({
                    where: { user_id: conducteur.id },
                    data: { balance: { increment: montantRetourne } },
                });
                // Supprimer l'entrée correspondante dans la table Solde
                yield Conn_1.default.solde.delete({
                    where: { id: soldeEntry.id },
                });
            }
        }
        // Préparer le contenu de l'e-mail en fonction du statut
        let subject = '';
        let text = '';
        let html = '';
        switch (newStatus) {
            case 'validated':
                subject = 'Commande Validée';
                text = `Votre commande ${updatedCommande.numeroCommande} a été validée.`;
                html = `<p>Votre commande <strong>${updatedCommande.numeroCommande}</strong> a été validée.</p>`;
                break;
            case 'started':
                subject = 'Commande Démarrée';
                text = `Votre commande ${updatedCommande.numeroCommande} a été démarrée.`;
                html = `<p>Votre commande <strong>${updatedCommande.numeroCommande}</strong> a été démarrée.</p>`;
                break;
            case 'dismissed':
                subject = 'Commande Annulée';
                text = `Votre commande ${updatedCommande.numeroCommande} a été annulée.`;
                html = `<p>Votre commande <strong>${updatedCommande.numeroCommande}</strong> a été annulée.</p>`;
                break;
            default:
                throw new Error('Invalid status');
        }
        // Envoyer un e-mail à l'utilisateur
        yield (0, mailService_1.sendEmail)({
            to: utilisateur.email,
            subject,
            text,
            html, // Inclure le contenu HTML dans l'e-mail
        });
        return updatedCommande;
    }
    catch (err) {
        if (err instanceof Error) {
            console.error('Error updating commande status:', err);
            throw new Error('Internal server error');
        }
        throw new Error('Internal server error');
    }
});
exports.updateCommandeStatus = updateCommandeStatus;
const updateCommandeStatus2 = (commandeId, newStatus) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Vérifiez que la commande existe avant de tenter la mise à jour
        const existingCommande = yield Conn_1.default.commande.findUnique({
            where: { id: commandeId },
            include: {
                trajet: true, // Inclure le trajet dans la réponse
                utilisateur: true,
                conducteur: true,
            },
        });
        if (!existingCommande) {
            throw new Error('Commande not found');
        }
        // Mettre à jour le statut de la commande
        const updatedCommande = yield Conn_1.default.commande.update({
            where: { id: commandeId },
            data: {
                statut_commande: newStatus,
                date_action: new Date(),
            },
            include: {
                trajet: true, // Inclure le trajet dans la réponse mise à jour
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
                text = `Votre commande ${updatedCommande.numeroCommande} a été validée. Trajet : ${updatedCommande.trajet.ville_depart} à ${updatedCommande.trajet.ville_arrivee}.`;
                html = `<p>Votre commande <strong>${updatedCommande.numeroCommande}</strong> a été validée.</p><p>Trajet : ${trajet.point_depart} à ${trajet.point_arrivee}.</p>`;
                break;
            case 'started':
                subject = 'Commande Démarrée';
                text = `Votre commande ${updatedCommande.numeroCommande} a été démarrée. Trajet : ${updatedCommande.trajet.ville_depart} à ${updatedCommande.trajet.ville_arrivee}.`;
                html = `<p>Votre commande <strong>${updatedCommande.numeroCommande}</strong> a été démarrée.</p><p>Trajet : ${trajet.point_depart} à ${trajet.point_arrivee}.</p>`;
                break;
            case 'dismissed':
                subject = 'Commande Annulée';
                text = `Votre commande ${updatedCommande.numeroCommande} a été annulée. Trajet : ${updatedCommande.trajet.ville_depart} à ${updatedCommande.trajet.ville_arrivee}.`;
                html = `<p>Votre commande <strong>${updatedCommande.numeroCommande}</strong> a été annulée.</p><p>Trajet : ${trajet.point_depart} à ${trajet.point_arrivee}.</p>`;
                break;
            default:
                throw new Error('Invalid status');
        }
        // Envoyer un e-mail à l'utilisateur
        yield (0, mailService_1.sendEmail)({
            to: utilisateur.email,
            subject,
            text,
            html, // Inclure le contenu HTML dans l'e-mail
        });
        return updatedCommande;
    }
    catch (err) {
        if (err instanceof Error) {
            console.error('Error updating commande status:', err);
            throw new Error('Internal server error');
        }
        throw new Error('Internal server error');
    }
});
exports.updateCommandeStatus2 = updateCommandeStatus2;
const searchCommandes = (options, numeroCommande, dateCreation, username) => __awaiter(void 0, void 0, void 0, function* () {
    // Préparer les critères de filtrage
    const where = {};
    if (numeroCommande) {
        where.numeroCommande = numeroCommande;
    }
    if (dateCreation) {
        where.date_creation = dateCreation;
    }
    if (username) {
        where.utilisateur = {
            username: username
        };
    }
    // Utiliser la fonction paginate pour gérer la pagination
    return (0, odersPaginate_1.paginate)((args) => Conn_1.default.commande.findMany(Object.assign({ where: where, orderBy: { date_creation: 'desc' }, include: {
            trajet: true,
            utilisateur: true,
            conducteur: true,
            reponsesConducteur: true,
        } }, args)), options);
});
exports.searchCommandes = searchCommandes;
// export const getCommandeByUsers = async (utilisateur_id: string): Promise<Commande | null> => {
//     return prisma.commande.findFirst({
//         where: { utilisateur_id: utilisateur_id },
//         orderBy: {
//             date_creation: 'desc',
//         },
//         include: {
//             trajet: true,
//             utilisateur: true,
//             conducteur: true,
//             reponsesConducteur: true,
//         },
//     });
// };
// export const getAllCommandeByUsers = async (conducteurId: string): Promise<Commande[]> => {
//     const commandes = await prisma.commande.findMany({
//         where: { utilisateur_id: conducteurId },
//         orderBy: {
//             date_creation: 'desc',
//         },
//         include: {
//             trajet: true,
//             utilisateur: true,
//             conducteur: true,
//             reponsesConducteur: true,
//         },
//     });
//     return commandes;
// };
// export const getCommandesByConducteurId = async (conducteurId: string): Promise<Commande[]> => {
//     console.log(`Fetching commandes for conducteurId: ${conducteurId}`);
//     const commandes = await prisma.commande.findMany({
//         where: { conducteur_id: conducteurId },
//         orderBy: {
//             date_creation: 'desc',
//         },
//         include: {
//             trajet: true,
//             utilisateur: true,
//             conducteur: true,
//             reponsesConducteur: true,
//         },
//     });
//     console.log(`Commandes fetched: ${commandes.length}`);
//     return commandes;
// };
//# sourceMappingURL=commandeService.js.map