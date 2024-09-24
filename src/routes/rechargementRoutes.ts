// src/routes/rechargementRoutes.ts
import { Router } from 'express';
import { createRechargement,getRechargements } from '../controllers/rechargementController';

const router = Router();

router.post('/', createRechargement);
router.get('/', getRechargements);

export default router;
