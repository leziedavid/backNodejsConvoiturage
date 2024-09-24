"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dashboardController_1 = require("../controllers/dashboardController"); // Assurez-vous que le chemin est correct
const router = express_1.default.Router();
router.get('/', dashboardController_1.getDashboardStatsController);
exports.default = router;
//# sourceMappingURL=dashboardRoutes.js.map