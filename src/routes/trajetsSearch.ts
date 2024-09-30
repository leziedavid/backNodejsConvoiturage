import { Router } from 'express';
import {searchTrajets} from '../services/trajetService';
import * as trajetController from '../controllers/trajetController';
import { updateStatusTrajet } from '../controllers/trajetController';

const router = Router();
router.post('/', trajetController.searchTrajets);
router.put('/:id', updateStatusTrajet);
export default router;
