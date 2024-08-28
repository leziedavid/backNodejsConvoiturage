import { Router } from 'express';
import * as commandeController from '../controllers/commandeController';

const router = Router();
router.get('/:id/:commandes', commandeController.getCommandeByUsersId);
router.get('/:id/:commandes/:history', commandeController.getCommandeByDriversId);

export default router;
