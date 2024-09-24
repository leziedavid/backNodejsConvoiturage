import { Router } from 'express';
import * as commandeController from '../controllers/commandeController';

const router = Router();

// Route pour créer une nouvelle commande
router.post('/', commandeController.createCommande);
// Route pour mettre à jour une commande existante
router.put('/:id', commandeController.updateCommande);
// Route pour obtenir toutes les commandes
router.get('/', commandeController.getCommandes);
// Route pour obtenir une commande par ID
router.get('/:id', commandeController.getCommandeById);
// Route pour obtenir une commande par ID
router.get('/:id/:users', commandeController.getCommandeByUsersId);
router.get('/:id/:drivers/:history', commandeController.getCommandeByDriversId);
// Route pour supprimer une commande
router.delete('/:id', commandeController.deleteCommande);


export default router;
