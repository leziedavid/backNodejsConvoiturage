import { Router } from 'express';
import { sendOtpController, resetPasswordController } from '../controllers/authController';

const router = Router();
// Route pour la connexion
router.post('/', sendOtpController);
router.post('/reset-password', resetPasswordController);

export default router;
