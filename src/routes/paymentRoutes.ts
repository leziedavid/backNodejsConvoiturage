import { Router } from 'express';
import { launchPaymentHandler, getPaymentStatusHandler } from '../controllers/paymentController'; // Assurez-vous que le chemin est correct

const router = Router();

// Route pour lancer un paiement
router.post('/', launchPaymentHandler);

// Route pour obtenir le statut d'un paiement
router.get('/:waveId', getPaymentStatusHandler);

export default router;
