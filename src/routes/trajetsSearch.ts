import { Router } from 'express';
import {searchTrajets} from '../services/trajetService';
import * as trajetController from '../controllers/trajetController';

const router = Router();
router.post('/', trajetController.searchTrajets);
export default router;
