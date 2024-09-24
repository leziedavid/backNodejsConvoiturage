// src/routes/userRoutes.ts
import { Router } from 'express';
import * as userController from '../controllers/userController';
import upload from '../middleware/multerConfig';

const router = Router();

router.post('/', upload.single('photo'), userController.createUser);
router.put('/:id', upload.single('photo'), userController.updateUser);
router.put('/:id/mdp', upload.single('photo'), userController.updateUserMdp);
router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.delete('/:id', userController.deleteUser);

// Route pour obtenir les statistiques d'un utilisateur
router.get('/:id/:stats', userController.getUserStatisticsController);
router.get('/:id/:root/:detail', userController.getUsersInfo);

// Nouvelle route pour mettre à jour le statut de l'utilisateur
router.post('/updateUserStatut', userController.updateUserStatut);



export default router;
