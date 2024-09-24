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
exports.getDashboardStatsController = void 0;
const dashboardService_1 = require("../services/dashboardService"); // Assurez-vous que le chemin est correct
const getDashboardStatsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stats = yield (0, dashboardService_1.getDashboardStats)();
        const response = {
            code: 200,
            messages: 'Dashboard stats retrieved successfully',
            data: stats,
        };
        res.json(response);
    }
    catch (error) {
        const response = {
            code: 500,
            messages: `Internal server error: ${error}`,
        };
        res.status(500).json(response);
    }
});
exports.getDashboardStatsController = getDashboardStatsController;
//# sourceMappingURL=dashboardController.js.map