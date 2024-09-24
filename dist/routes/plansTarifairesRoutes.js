"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/plansTarifairesRoutes.ts
const express_1 = require("express");
const plansTarifairesController_1 = require("../controllers/plansTarifairesController");
const router = (0, express_1.Router)();
router.post('/', plansTarifairesController_1.handleCreatePlanTarifaire);
router.put('/:id', plansTarifairesController_1.handleUpdatePlanTarifaire);
router.get('/', plansTarifairesController_1.handleGetPlansTarifaires);
router.get('/:id', plansTarifairesController_1.handleGetPlanTarifaireById);
router.delete('/:id', plansTarifairesController_1.handleDeletePlanTarifaire);
exports.default = router;
//# sourceMappingURL=plansTarifairesRoutes.js.map