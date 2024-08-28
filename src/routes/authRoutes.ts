import { Router } from 'express';
import { login, logout } from '../controllers/authController';

const router = Router();
// Route pour la connexion
router.post('/login', login);
// Route pour la déconnexion
router.post('/logout', logout);

export default router;
