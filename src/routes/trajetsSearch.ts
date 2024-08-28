import { Router } from 'express';
import {searchTrajets} from '../services/trajetService';
// import {searchCommande} from '../services/commandeService';

const router = Router();
router.post('/:trajets', searchTrajets);
// router.get('/:commandes', searchCommande);
export default router;
