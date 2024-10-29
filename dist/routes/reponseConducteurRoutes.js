"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/reponseConducteurRoutes.ts
const express_1 = require("express");
const reponseConducteurController_1 = require("../controllers/reponseConducteurController");
const router = (0, express_1.Router)();
router.post('/', reponseConducteurController_1.createReponse);
router.get('/', reponseConducteurController_1.getReponses);
router.get('/:id', reponseConducteurController_1.getReponseById);
router.delete('/:id', reponseConducteurController_1.deleteReponse);
exports.default = router;
//# sourceMappingURL=reponseConducteurRoutes.js.map