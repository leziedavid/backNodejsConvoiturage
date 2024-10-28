"use strict";
// src/services/userService.ts
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
exports.searchUsers = exports.updateUserState = exports.getUserStatistics = exports.deleteUser = exports.getUserInfo = exports.getUserById = exports.getUsers = exports.updateUsermdp = exports.updateUser = exports.createUser1 = exports.createUser = void 0;
const Conn_1 = __importDefault(require("../Conn"));
const usersPaginate_1 = require("./allPaginations/usersPaginate");
const bcrypt = require('bcryptjs');
// Fonction pour créer un utilisateur
const createUser = (userData, file, baseUrl) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, role = 'user', verification_status = 'pending', currency_id } = userData, restOfData = __rest(userData, ["password", "role", "verification_status", "currency_id"]);
    if (!password)
        throw new Error('Password is required');
    const salt = yield bcrypt.genSalt(10);
    const passwordHash = yield bcrypt.hash(password, salt);
    let photoUrl = null;
    if (file) {
        photoUrl = `${baseUrl}/uploads/${file.filename}`;
    }
    // Création de l'utilisateur
    const newUser = yield Conn_1.default.user.create({
        data: Object.assign(Object.assign({}, restOfData), { password_hash: passwordHash, photo_url: photoUrl, verification_status,
            role }),
    });
    // Si le rôle est "user" ou "conducteur", créer un portefeuille
    if (role === 'USER' || role === 'DRIVER') {
        yield Conn_1.default.wallet.create({
            data: {
                user_id: newUser.id, // Associer le portefeuille à l'utilisateur
                balance: 0.0, // Solde initial du portefeuille
                currency_id
            },
        });
    }
    return newUser;
});
exports.createUser = createUser;
const createUser1 = (userData, file, baseUrl) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, verification_status = 'pending' } = userData, restOfData = __rest(userData, ["password", "verification_status"]);
    if (!password)
        throw new Error('Password is required');
    const salt = yield bcrypt.genSalt(10);
    const passwordHash = yield bcrypt.hash(password, salt);
    let photoUrl = null;
    if (file) {
        photoUrl = `${baseUrl}/uploads/${file.filename}`;
    }
    return Conn_1.default.user.create({
        data: Object.assign(Object.assign({}, restOfData), { password_hash: passwordHash, photo_url: photoUrl, verification_status }),
    });
});
exports.createUser1 = createUser1;
const updateUser = (userId, userData, file, baseUrl) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, verification_status } = userData, restOfData = __rest(userData, ["password", "verification_status"]);
    const user = yield Conn_1.default.user.findUnique({ where: { id: userId } });
    if (!user)
        throw new Error('User not found');
    const updateData = Object.assign({}, restOfData);
    if (password) {
        const salt = yield bcrypt.genSalt(10);
        updateData.password_hash = yield bcrypt.hash(password, salt);
    }
    if (file) {
        updateData.photo_url = `${baseUrl}/uploads/${file.filename}`;
    }
    if (verification_status) {
        updateData.verification_status = verification_status;
    }
    return Conn_1.default.user.update({
        where: { id: userId },
        data: updateData,
    });
});
exports.updateUser = updateUser;
const updateUsermdp = (userId_1, _a) => __awaiter(void 0, [userId_1, _a], void 0, function* (userId, { currentPassword, newPassword }) {
    // Trouver l'utilisateur existant
    const user = yield Conn_1.default.user.findUnique({ where: { id: userId } });
    if (!user)
        throw new Error('User not found');
    // Vérifier que le mot de passe actuel est correct
    console.log(user.password_hash);
    const isPasswordValid = yield bcrypt.compare(currentPassword, user.password_hash);
    if (!isPasswordValid)
        throw new Error('Current password is incorrect');
    // Préparer les données pour la mise à jour
    const updateData = {};
    if (newPassword) {
        // Générer un hash pour le nouveau mot de passe
        const salt = yield bcrypt.genSalt(10);
        updateData.password_hash = yield bcrypt.hash(newPassword, salt);
    }
    // Mettre à jour l'utilisateur avec les nouvelles données
    return Conn_1.default.user.update({
        where: { id: userId },
        data: updateData,
    });
});
exports.updateUsermdp = updateUsermdp;
const getUsers = (options) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, usersPaginate_1.paginate)((args) => Conn_1.default.user.findMany(Object.assign({ orderBy: { created_at: 'desc' }, include: {
            trajets: true,
            commandes: true,
            reponsesConducteur: true,
            commandesConducteur: true,
            vehicules: true,
            rechargements: true
        } }, args)), options);
});
exports.getUsers = getUsers;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return Conn_1.default.user.findUnique({
        where: { id },
        include: {
            trajets: true,
            commandes: true,
            reponsesConducteur: true,
            commandesConducteur: true,
            vehicules: true,
            rechargements: true
        }
    });
});
exports.getUserById = getUserById;
const getUserInfo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return Conn_1.default.user.findUnique({
        where: { id }
    });
});
exports.getUserInfo = getUserInfo;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield Conn_1.default.user.delete({ where: { id } });
});
exports.deleteUser = deleteUser;
const getUserStatistics = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Total des courses de l'utilisateur
        const totalCourses = yield Conn_1.default.commande.count({
            where: { utilisateur_id: userId },
        });
        // Nombre de véhicules de l'utilisateur
        const numberOfVehicles = yield Conn_1.default.vehicule.count({
            where: { utilisateur_id: userId },
        });
        // Montant total des courses de l'utilisateur
        const totalAmountResult = yield Conn_1.default.commande.aggregate({
            _sum: {
                montant: true,
            },
            where: { utilisateur_id: userId },
        });
        const totalAmount = totalAmountResult._sum.montant || 0;
        // Dernier trajet de l'utilisateur
        const lastTrajet = yield Conn_1.default.trajet.findFirst({
            where: { utilisateur_id: userId },
            orderBy: {
                created_at: 'desc',
            },
        });
        const userDetail = yield Conn_1.default.user.findFirst({
            where: { id: userId },
            orderBy: {
                created_at: 'desc',
            },
            include: {
                wallet: true,
            }
        });
        // Dernier rechargement de l'utilisateur
        const rechargements = yield Conn_1.default.rechargement.findFirst({
            where: { utilisateur_id: userId },
            orderBy: { date: 'desc' }
        });
        return {
            totalCourses,
            numberOfVehicles,
            totalAmount,
            lastTrajet,
            userDetail: Object.assign(Object.assign({}, userDetail), { rechargements }),
        };
    }
    catch (error) {
        console.error('Error fetching user statistics:', error);
        throw error;
    }
});
exports.getUserStatistics = getUserStatistics;
const updateUserState = (userId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    // Trouver l'utilisateur existant
    const user = yield Conn_1.default.user.findUnique({ where: { id: userId } });
    if (!user)
        throw new Error('User not found');
    // Préparer les données de mise à jour
    const updateData = {};
    if (userData.isActive !== null) {
        updateData.is_active = userData.isActive;
    }
    if (userData.verificationStatus !== null) {
        updateData.verification_status = userData.verificationStatus;
    }
    // Mettre à jour l'utilisateur dans la base de données
    return Conn_1.default.user.update({
        where: { id: userId },
        data: updateData,
    });
});
exports.updateUserState = updateUserState;
const searchUsers = (searchTerm, options) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, usersPaginate_1.paginate)((args) => Conn_1.default.user.findMany(Object.assign({ where: {
            username: {
                contains: searchTerm,
                mode: 'insensitive', // Recherche insensible à la casse
            },
        }, orderBy: { created_at: 'desc' }, include: {
            vehicules: true, // Incluez les relations nécessaires
        } }, args)), options);
});
exports.searchUsers = searchUsers;
//# sourceMappingURL=userService.js.map