// src/routes/plansTarifairesRoutes.ts
import { Router } from 'express';
import {
    handleCreatePlanTarifaire,
    handleUpdatePlanTarifaire,
    handleGetPlansTarifaires,
    handleGetPlanTarifaireById,
    handleDeletePlanTarifaire,
} from '../controllers/plansTarifairesController';

const router = Router();

router.post('/', handleCreatePlanTarifaire);
router.put('/:id', handleUpdatePlanTarifaire);
router.get('/', handleGetPlansTarifaires);
router.get('/:id', handleGetPlanTarifaireById);
router.delete('/:id', handleDeletePlanTarifaire);

export default router;
