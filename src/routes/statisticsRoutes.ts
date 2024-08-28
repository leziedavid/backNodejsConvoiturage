// src/routes/userRoutes.ts
import { Router } from 'express';
import * as userController from '../controllers/userController';
import upload from '../middleware/multerConfig';

const router = Router();

// Route pour obtenir les statistiques d'un utilisateur
router.get('/user/:id', userController.getUserStatisticsController);

export default router;
