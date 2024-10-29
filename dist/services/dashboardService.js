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
exports.getDashboardStats = void 0;
const Conn_1 = __importDefault(require("../Conn"));
const getDashboardStats = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Comptage des utilisateurs
        const usersCount = yield Conn_1.default.user.count();
        const conducteursCount = yield Conn_1.default.user.count({ where: { role: 'DRIVER' } });
        const passagersCount = yield Conn_1.default.user.count({ where: { role: 'USER' } });
        const vehiculesCount = yield Conn_1.default.vehicule.count();
        const commandesCount = yield Conn_1.default.commande.count();
        const trajetsCount = yield Conn_1.default.trajet.count();
        // Calcul du solde total des portefeuilles
        const totalBalance = yield Conn_1.default.wallet.aggregate({
            _sum: {
                balance: true
            }
        });
        // Calcul du montant total des soldes
        const totalSolde = yield Conn_1.default.solde.aggregate({
            _sum: {
                montant: true
            }
        });
        return {
            usersCount,
            conducteursCount,
            passagersCount,
            vehiculesCount,
            commandesCount,
            trajetsCount,
            totalBalance: totalBalance._sum.balance || 0, // Utilisation de nombre normal
            totalSolde: totalSolde._sum.montant || 0, // Montant total des soldes
        };
    }
    catch (error) {
        throw new Error(`Failed to retrieve dashboard stats: ${error}`);
    }
});
exports.getDashboardStats = getDashboardStats;
//# sourceMappingURL=dashboardService.js.map