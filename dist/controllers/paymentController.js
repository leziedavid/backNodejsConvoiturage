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
exports.getPaymentStatusHandler = exports.launchPaymentHandler = void 0;
const paymentService_1 = require("../services/paymentService"); // Assurez-vous que le chemin est correct
// Fonction pour lancer un paiement
const launchPaymentHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { amount } = req.body;
        if (typeof amount !== 'number' || amount <= 0) {
            return res.status(400).json({
                code: 400,
                messages: 'Invalid amount provided.',
            });
        }
        const result = yield (0, paymentService_1.launchPayment)(amount);
        return res.status(200).json({
            code: 200,
            messages: 'Payment launched successfully',
            data: result,
        });
    }
    catch (error) {
        console.error('Error launching payment:', error);
        return res.status(500).json({
            code: 500,
            messages: 'Internal server error',
        });
    }
});
exports.launchPaymentHandler = launchPaymentHandler;
// Fonction pour obtenir le statut du paiement
const getPaymentStatusHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { waveId } = req.params;
        if (!waveId) {
            return res.status(400).json({
                code: 400,
                messages: 'Wave ID is required.',
            });
        }
        const status = yield (0, paymentService_1.requestToGetTransactionStatus)(waveId);
        return res.status(200).json({
            code: 200,
            messages: 'Payment status retrieved successfully',
            data: status,
        });
    }
    catch (error) {
        console.error('Error getting payment status:', error);
        return res.status(500).json({
            code: 500,
            messages: 'Internal server error',
        });
    }
});
exports.getPaymentStatusHandler = getPaymentStatusHandler;
//# sourceMappingURL=paymentController.js.map