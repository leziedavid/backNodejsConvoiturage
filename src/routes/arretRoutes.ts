import { Router } from 'express';
import {getArrets,getArretById,createArret,updateArret,deleteArret,} from '../controllers/arretController';

const router = Router();
router.get('/', getArrets);
router.get('/:id', getArretById);
router.post('/', createArret);
router.put('/:id', updateArret);
router.delete('/:id', deleteArret);

export default router;
