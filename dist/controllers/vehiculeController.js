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
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGetVehiculesByUserId = exports.handleDeleteVehicule = exports.handleGetVehiculeById = exports.handleGetVehicules = exports.handleUpdateVehicule = exports.handleCreateVehicule = void 0;
const vehiculeService_1 = require("../services/vehiculeService");
const vehiculeValidation_1 = require("../validation/vehiculeValidation");
const handleCreateVehicule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vehiculeData = vehiculeValidation_1.createVehiculeSchema.parse(req.body);
        const newVehicule = yield (0, vehiculeService_1.createVehicule)(vehiculeData);
        const response = {
            code: 201,
            messages: 'Véhicule créé avec succès',
            data: newVehicule,
        };
        res.status(201).json(response);
    }
    catch (error) {
        res.status(400).json({
            code: 400,
            messages: error.errors ? error.errors.map((e) => e.message).join(', ') : error.message
        });
    }
});
exports.handleCreateVehicule = handleCreateVehicule;
const handleUpdateVehicule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vehiculeData = vehiculeValidation_1.updateVehiculeSchema.parse(req.body);
        const updatedVehicule = yield (0, vehiculeService_1.updateVehicule)(req.params.id, vehiculeData);
        const response = {
            code: 200,
            messages: 'Véhicule mis à jour avec succès',
            data: updatedVehicule,
        };
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({
            code: 400,
            messages: error.errors ? error.errors.map((e) => e.message).join(', ') : error.message
        });
    }
});
exports.handleUpdateVehicule = handleUpdateVehicule;
const handleGetVehicules = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vehicules = yield (0, vehiculeService_1.getVehicules)();
        const response = {
            code: 200,
            messages: 'Véhicules récupérés avec succès',
            data: vehicules,
        };
        res.status(200).json(response);
    }
    catch (error) {
        res.status(500).json({
            code: 500,
            messages: 'Erreur interne du serveur'
        });
    }
});
exports.handleGetVehicules = handleGetVehicules;
const handleGetVehiculeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vehicule = yield (0, vehiculeService_1.getVehiculeById)(req.params.id);
        if (vehicule) {
            const response = {
                code: 200,
                messages: 'Véhicule récupéré avec succès',
                data: vehicule,
            };
            res.status(200).json(response);
        }
        else {
            const response = {
                code: 404,
                messages: 'Véhicule non trouvé',
            };
            res.status(404).json(response);
        }
    }
    catch (error) {
        res.status(500).json({
            code: 500,
            messages: 'Erreur interne du serveur'
        });
    }
});
exports.handleGetVehiculeById = handleGetVehiculeById;
const handleDeleteVehicule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, vehiculeService_1.deleteVehicule)(req.params.id);
        const response = {
            code: 204,
            messages: 'Véhicule supprimé avec succès',
        };
        res.status(204).json(response);
    }
    catch (error) {
        res.status(500).json({
            code: 500,
            messages: 'Erreur interne du serveur'
        });
    }
});
exports.handleDeleteVehicule = handleDeleteVehicule;
const handleGetVehiculesByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        const vehicules = yield (0, vehiculeService_1.getVehiculesByUserId)(userId);
        const response = {
            code: 200,
            messages: 'Véhicules récupérés avec succès',
            data: vehicules,
        };
        res.status(200).json(response);
    }
    catch (error) {
        res.status(500).json({
            code: 500,
            messages: 'Erreur interne du serveur',
        });
    }
});
exports.handleGetVehiculesByUserId = handleGetVehiculesByUserId;
//# sourceMappingURL=vehiculeController.js.map