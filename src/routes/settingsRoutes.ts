// src/routes/userRoutes.ts
import { Router } from 'express';
import * as userController from '../controllers/userController';
import upload from '../middleware/multerConfig';

const router = Router();
router.get('/:id', userController.getUserById);
export default router;