"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const faqController_1 = require("../controllers/faqController"); // Assurez-vous que le chemin est correct
const router = (0, express_1.Router)();
// Route pour obtenir toutes les FAQ
router.get('/', faqController_1.getFAQs);
// Route pour obtenir une FAQ par ID
router.get('/:id', faqController_1.getFAQById);
// Route pour créer une nouvelle FAQ
router.post('/', faqController_1.createFAQ);
// Route pour mettre à jour une FAQ par ID
router.put('/:id', faqController_1.updateFAQ);
// Route pour supprimer une FAQ par ID
router.delete('/:id', faqController_1.deleteFAQ);
exports.default = router;
//# sourceMappingURL=faqRoutes.js.map