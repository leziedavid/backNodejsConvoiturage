// src/routes/trajetRoutes.ts
import { Router } from 'express';
import * as trajetController from '../controllers/trajetController';

const router = Router();

router.post('/', trajetController.createTrajet);
router.put('/:id', trajetController.updateTrajet);
router.put('/:id/:updated', trajetController.updateTrajetDetailsController);
router.get('/', trajetController.getTrajets);
router.get('/:id', trajetController.getTrajetById);
router.get('/:id/:listes', trajetController.getTrajetDriver);
router.delete('/:id', trajetController.deleteTrajet);
router.post('/search', trajetController.searchTrajets);

export default router;
