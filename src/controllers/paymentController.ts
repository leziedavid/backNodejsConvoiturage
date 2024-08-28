import { Request, Response } from 'express';
import { launchPayment, requestToGetTransactionStatus } from '../services/paymentService'; // Assurez-vous que le chemin est correct

// Fonction pour lancer un paiement
export const launchPaymentHandler = async (req: Request, res: Response) => {
    try {
        const { amount } = req.body;

        if (typeof amount !== 'number' || amount <= 0) {
            return res.status(400).json({
                code: 400,
                messages: 'Invalid amount provided.',
            });
        }

        const result = await launchPayment(amount);

        return res.status(200).json({
            code: 200,
            messages: 'Payment launched successfully',
            data: result,
        });
    } catch (error) {
        console.error('Error launching payment:', error);
        return res.status(500).json({
            code: 500,
            messages: 'Internal server error',
        });
    }
};

// Fonction pour obtenir le statut du paiement
export const getPaymentStatusHandler = async (req: Request, res: Response) => {
    try {
        const { waveId } = req.params;

        if (!waveId) {
            return res.status(400).json({
                code: 400,
                messages: 'Wave ID is required.',
            });
        }

        const status = await requestToGetTransactionStatus(waveId);

        return res.status(200).json({
            code: 200,
            messages: 'Payment status retrieved successfully',
            data: status,
        });
    } catch (error) {
        console.error('Error getting payment status:', error);
        return res.status(500).json({
            code: 500,
            messages: 'Internal server error',
        });
    }
};
