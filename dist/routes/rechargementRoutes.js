"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/rechargementRoutes.ts
const express_1 = require("express");
const rechargementController_1 = require("../controllers/rechargementController");
const router = (0, express_1.Router)();
router.post('/', rechargementController_1.createRechargement);
router.get('/', rechargementController_1.getRechargements);
exports.default = router;
//# sourceMappingURL=rechargementRoutes.js.map