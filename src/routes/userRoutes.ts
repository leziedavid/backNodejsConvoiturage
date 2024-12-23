// src/routes/userRoutes.ts
import { Router } from 'express';
import * as userController from '../controllers/userController';
import upload from '../middleware/multerConfig';
import { supabaseUploadSingle } from '../middleware/uploadS3';


const router = Router();

// Route pour créer un utilisateur avec une photo unique
router.post('/', supabaseUploadSingle, userController.createUser);
// Route pour mettre à jour un utilisateur avec une photo unique
router.put('/:id', supabaseUploadSingle, userController.updateUser);

// Exemple pour télécharger plusieurs fichiers (si nécessaire)
// router.post('/uploadMultiple', s3UploadMultiple, userController.uploadMultipleFiles);

// router.post('/', upload.single('photo'), userController.createUser);
// router.put('/:id', upload.single('photo'), userController.updateUser);

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
