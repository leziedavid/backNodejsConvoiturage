// src/routes/userRoutes.ts
import { Router } from 'express';
import * as userController from '../controllers/userController';

const router = Router();
// faire des recherche en temps reel
router.get('/', userController.searchUsersController);

export default router;