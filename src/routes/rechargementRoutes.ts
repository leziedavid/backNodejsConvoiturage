// src/routes/rechargementRoutes.ts
import { Router } from 'express';
import { createRechargement } from '../controllers/rechargementController';

const router = Router();

router.post('/', createRechargement);

export default router;
