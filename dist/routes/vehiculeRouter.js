"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/vehiculeRoutes.ts
const express_1 = require("express");
const vehiculeController_1 = require("../controllers/vehiculeController");
const router = (0, express_1.Router)();
// Route pour récupérer tous les véhicules
router.get('/', vehiculeController_1.handleGetVehicules);
// Route pour récupérer un véhicule par ID
router.get('/:id', vehiculeController_1.handleGetVehiculeById);
// Route pour créer un nouveau véhicule
router.post('/', vehiculeController_1.handleCreateVehicule);
// Route pour mettre à jour un véhicule existant
router.put('/:id', vehiculeController_1.handleUpdateVehicule);
// Route pour supprimer un véhicule
router.delete('/:id', vehiculeController_1.handleDeleteVehicule);
router.get('/:user/:userId', vehiculeController_1.handleGetVehiculesByUserId);
exports.default = router;
//# sourceMappingURL=vehiculeRouter.js.map