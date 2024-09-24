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
exports.getVehiculesByUserId = exports.deleteVehicule = exports.getVehiculeById = exports.getVehicules = exports.updateVehicule = exports.createVehicule = void 0;
// src/services/vehiculeService.ts
const Conn_1 = __importDefault(require("../Conn"));
// Créer un nouveau véhicule
const createVehicule = (vehiculeData) => __awaiter(void 0, void 0, void 0, function* () {
    return Conn_1.default.vehicule.create({
        data: vehiculeData,
    });
});
exports.createVehicule = createVehicule;
// Mettre à jour un véhicule existant
const updateVehicule = (id, vehiculeData) => __awaiter(void 0, void 0, void 0, function* () {
    const vehicule = yield Conn_1.default.vehicule.findUnique({ where: { id } });
    if (!vehicule)
        throw new Error('Véhicule non trouvé');
    return Conn_1.default.vehicule.update({
        where: { id },
        data: vehiculeData,
    });
});
exports.updateVehicule = updateVehicule;
// Récupérer tous les véhicules
const getVehicules = () => __awaiter(void 0, void 0, void 0, function* () {
    return Conn_1.default.vehicule.findMany();
});
exports.getVehicules = getVehicules;
// Récupérer un véhicule par ID
const getVehiculeById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return Conn_1.default.vehicule.findUnique({
        where: { id },
    });
});
exports.getVehiculeById = getVehiculeById;
// Supprimer un véhicule
const deleteVehicule = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield Conn_1.default.vehicule.delete({ where: { id } });
});
exports.deleteVehicule = deleteVehicule;
const getVehiculesByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vehicules = yield Conn_1.default.vehicule.findMany({
            where: {
                utilisateur_id: userId,
            },
        });
        return vehicules;
    }
    catch (error) {
        throw new Error('Erreur lors de la récupération des véhicules : ' + error);
    }
});
exports.getVehiculesByUserId = getVehiculesByUserId;
//# sourceMappingURL=vehiculeService.js.map