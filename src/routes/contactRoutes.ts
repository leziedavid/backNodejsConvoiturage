// src/routes/contactRoutes.ts
import { Router } from 'express';
import {
    handleGetContacts,
    handleGetContactById,
    handleCreateContact,
    handleUpdateContact,
    handleDeleteContact,
} from '../controllers/contactController';

const router = Router();

// Route pour obtenir tous les contacts
router.get('/', handleGetContacts);

// Route pour obtenir un contact par ID
router.get('/:id', handleGetContactById);

// Route pour créer un nouveau contact
router.post('/', handleCreateContact);

// Route pour mettre à jour un contact par ID
router.put('/:id', handleUpdateContact);

// Route pour supprimer un contact par ID
router.delete('/:id', handleDeleteContact);

export default router;
