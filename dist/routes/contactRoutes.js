"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/contactRoutes.ts
const express_1 = require("express");
const contactController_1 = require("../controllers/contactController");
const router = (0, express_1.Router)();
// Route pour obtenir tous les contacts
router.get('/', contactController_1.handleGetContacts);
// Route pour obtenir un contact par ID
router.get('/:id', contactController_1.handleGetContactById);
// Route pour créer un nouveau contact
router.post('/', contactController_1.handleCreateContact);
// Route pour mettre à jour un contact par ID
router.put('/:id', contactController_1.handleUpdateContact);
// Route pour supprimer un contact par ID
router.delete('/:id', contactController_1.handleDeleteContact);
exports.default = router;
//# sourceMappingURL=contactRoutes.js.map