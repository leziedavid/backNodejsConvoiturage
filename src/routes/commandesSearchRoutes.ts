import { Router } from 'express';
import * as commandeController from '../controllers/commandeController';

const router = Router();
router.post('/', commandeController.searchCommandesByOptions);
router.put('/:id', commandeController.updateCommandeUsersStatus);

export default router;
