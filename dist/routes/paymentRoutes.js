"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paymentController_1 = require("../controllers/paymentController"); // Assurez-vous que le chemin est correct
const router = (0, express_1.Router)();
// Route pour lancer un paiement
router.post('/', paymentController_1.launchPaymentHandler);
// Route pour obtenir le statut d'un paiement
router.get('/:waveId', paymentController_1.getPaymentStatusHandler);
exports.default = router;
//# sourceMappingURL=paymentRoutes.js.map