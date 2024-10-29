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
exports.logoutUser = exports.loginUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt = require('bcryptjs');
const Conn_1 = __importDefault(require("../Conn"));
// Générer un token JWT
const generateToken = (userId) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }
    return jsonwebtoken_1.default.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '24h' });
};
// Fonction de connexion
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    // Recherche de l'utilisateur dans la base de données
    const user = yield Conn_1.default.user.findUnique({
        where: { email },
    });
    if (!user) {
        throw new Error('Utilisateur non trouvé');
    }
    // Vérifiez le mot de passe (ajoutez ici votre logique de vérification)
    const isMatch = yield bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }
    // Générer un token JWT
    const token = generateToken(user.id);
    return { token, user };
});
exports.loginUser = loginUser;
// Fonction de déconnexion
const logoutUser = () => __awaiter(void 0, void 0, void 0, function* () {
    // Les tokens JWT ne peuvent pas être invalidés côté serveur en général,
    // donc cette fonction est principalement pour des actions supplémentaires comme la suppression de sessions côté serveur
    return;
});
exports.logoutUser = logoutUser;
//# sourceMappingURL=authService.js.map