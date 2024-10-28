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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReponseConducteur = exports.getReponseConducteurById = exports.getReponsesConducteur = exports.createReponseConducteur = void 0;
// src/services/reponseConducteurService.ts
const Conn_1 = __importDefault(require("../Conn"));
const EmailNotification_1 = require("../models/EmailNotification");
const date_fns_1 = require("date-fns");
const locale_1 = require("date-fns/locale");
const mailService_1 = require("./mailService");
const formatDate = (date) => (0, date_fns_1.format)(date, "d MMMM yyyy 'à' HH'h' mm", { locale: locale_1.fr });
const createReponseConducteur = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { commande_id, conducteur_id, statut_reponse } = data, reponseData = __rest(data, ["commande_id", "conducteur_id", "statut_reponse"]);
    // Créer la réponse du conducteur
    const newReponse = yield Conn_1.default.reponseConducteur.create({
        data: Object.assign(Object.assign({}, reponseData), { commande_id,
            conducteur_id,
            statut_reponse }),
    });
    // Mettre à jour le statut de la commande
    yield Conn_1.default.commande.update({
        where: { id: commande_id },
        data: { statut_commande: 'validated' },
    });
    // Récupérer les détails de la commande et l'utilisateur associé
    const commandeDetails = yield Conn_1.default.commande.findUnique({
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
    const emailHtml = (0, EmailNotification_1.createEmailNotificationHTML)(commandeDetails.utilisateur.username, commandeDetails.numeroCommande, commandeDetails.conducteur.username, commandeDetails.trajet.ville_depart, commandeDetails.trajet.ville_arrivee, formatDate(new Date(commandeDetails.temps_prise_en_charge)), formatDate(new Date(commandeDetails.temps_depose)), 'Votre Nom', 'Nom de Votre Entreprise', 'Coordonnées de Contact', 'https://www.votreentreprise.com');
    // Envoyer l'email
    yield (0, mailService_1.sendEmail)({
        to: [commandeDetails.utilisateur.email],
        subject: `Validation de Votre Course ${commandeDetails.numeroCommande}`,
        text: 'Votre commande a été validée par le conducteur. Consultez les détails dans le corps du message.',
        html: emailHtml,
    });
    return newReponse;
});
exports.createReponseConducteur = createReponseConducteur;
const getReponsesConducteur = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield Conn_1.default.reponseConducteur.findMany();
});
exports.getReponsesConducteur = getReponsesConducteur;
const getReponseConducteurById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Conn_1.default.reponseConducteur.findUnique({
        where: { id },
    });
});
exports.getReponseConducteurById = getReponseConducteurById;
const deleteReponseConducteur = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield Conn_1.default.reponseConducteur.delete({ where: { id } });
});
exports.deleteReponseConducteur = deleteReponseConducteur;
//# sourceMappingURL=reponseConducteurService.js.map