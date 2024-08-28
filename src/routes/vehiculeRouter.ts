// src/routes/vehiculeRoutes.ts
import { Router } from 'express';
import {
    handleCreateVehicule,
    handleUpdateVehicule,
    handleGetVehicules,
    handleGetVehiculeById,
    handleDeleteVehicule,
} from '../controllers/vehiculeController';

const router = Router();

// Route pour récupérer tous les véhicules
router.get('/', handleGetVehicules);

// Route pour récupérer un véhicule par ID
router.get('/:id', handleGetVehiculeById);

// Route pour créer un nouveau véhicule
router.post('/', handleCreateVehicule);

// Route pour mettre à jour un véhicule existant
router.put('/:id', handleUpdateVehicule);

// Route pour supprimer un véhicule
router.delete('/:id', handleDeleteVehicule);

export default router;
