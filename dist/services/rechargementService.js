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
exports.getAllRechargements = exports.createRechargement = void 0;
const Conn_1 = __importDefault(require("../Conn"));
const trajetPaginate_1 = require("./allPaginations/trajetPaginate");
const createRechargement = (rechargementData) => __awaiter(void 0, void 0, void 0, function* () {
    const { description, amount, status, paymentMethod, utilisateur_id, date } = rechargementData;
    return Conn_1.default.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
        // Récupérer le solde actuel du portefeuille
        const wallet = yield prisma.wallet.findUnique({
            where: { user_id: utilisateur_id }
        });
        if (!wallet) {
            throw new Error('Wallet not found');
        }
        // Calculer le nouveau solde
        const newBalance = wallet.balance.add(amount);
        // Création du rechargement
        const newRechargement = yield prisma.rechargement.create({
            data: {
                description,
                amount,
                paymentMethod,
                status,
                date,
                wallet: {
                    connect: { user_id: utilisateur_id }
                },
                utilisateur: {
                    connect: { id: utilisateur_id }
                }
            }
        });
        // Mise à jour du solde du portefeuille
        yield prisma.wallet.update({
            where: { user_id: utilisateur_id },
            data: {
                balance: newBalance
            }
        });
        return newRechargement;
    }));
});
exports.createRechargement = createRechargement;
const getAllRechargements = (options) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, trajetPaginate_1.paginate)((args) => Conn_1.default.rechargement.findMany(Object.assign({ orderBy: { date: 'desc' }, include: {
            utilisateur: true,
            wallet: true,
        } }, args)), options);
});
exports.getAllRechargements = getAllRechargements;
//# sourceMappingURL=rechargementService.js.map