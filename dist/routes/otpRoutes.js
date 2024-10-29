"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
// Route pour la connexion
router.post('/', authController_1.sendOtpController);
router.post('/reset-password', authController_1.resetPasswordController);
exports.default = router;
//# sourceMappingURL=otpRoutes.js.map