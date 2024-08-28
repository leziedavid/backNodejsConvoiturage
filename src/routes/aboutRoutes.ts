// src/routes/aboutRoutes.ts
import { Router } from 'express';
import {
    getAbouts,
    getAboutById,
    createAbout,
    updateAbout,
    deleteAbout,
} from '../controllers/aboutController';

const router = Router();

router.get('/', getAbouts);
router.get('/:id', getAboutById);
router.post('/', createAbout);
router.put('/:id', updateAbout);
router.delete('/:id', deleteAbout);

export default router;
