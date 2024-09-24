import { Router } from 'express';
import * as commandeController from '../controllers/commandeController';

const router = Router();

// Route pour obtenir une commande par ID
router.get('/:id', commandeController.getCommandeById);
router.get('/:id/:one', commandeController.getCommandeByUsersId);
router.get('/:id/:users/:all', commandeController.getAllCommandeByUserId);
// Route pour mettre à jour le statut d'une commande
router.put('/:id', commandeController.updateCommandeStatus);

export default router;
