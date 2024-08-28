// src/routes/reponseConducteurRoutes.ts
import { Router } from 'express';
import {
    createReponse,
    getReponses,
    getReponseById,
    deleteReponse
} from '../controllers/reponseConducteurController';

const router = Router();

router.post('/', createReponse);
router.get('/', getReponses);
router.get('/:id', getReponseById);
router.delete('/:id', deleteReponse);

export default router;
