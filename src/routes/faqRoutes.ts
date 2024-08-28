import { Router } from 'express';
import {getFAQs,getFAQById,createFAQ,updateFAQ,deleteFAQ,} from '../controllers/faqController'; // Assurez-vous que le chemin est correct

const router = Router();

// Route pour obtenir toutes les FAQ
router.get('/', getFAQs);

// Route pour obtenir une FAQ par ID
router.get('/:id', getFAQById);

// Route pour créer une nouvelle FAQ
router.post('/', createFAQ);

// Route pour mettre à jour une FAQ par ID
router.put('/:id', updateFAQ);

// Route pour supprimer une FAQ par ID
router.delete('/:id', deleteFAQ);

export default router;
