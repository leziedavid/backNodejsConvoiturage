"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDeleteContact = exports.handleUpdateContact = exports.handleCreateContact = exports.handleGetContactById = exports.handleGetContacts = void 0;
const contactService_1 = require("../services/contactService");
const contactValidation_1 = require("../validation/contactValidation");
const handleGetContacts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contacts = yield (0, contactService_1.getContacts)();
        const response = {
            code: 200,
            messages: 'Contacts récupérés avec succès',
            data: contacts,
        };
        res.json(response);
    }
    catch (error) {
        console.error('Erreur lors de la récupération des contacts:', error);
        const response = {
            code: 500,
            messages: 'Erreur interne du serveur',
        };
        res.status(500).json(response);
    }
});
exports.handleGetContacts = handleGetContacts;
const handleGetContactById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const contact = yield (0, contactService_1.getContactById)(id);
        if (contact) {
            const response = {
                code: 200,
                messages: 'Contact récupéré avec succès',
                data: contact,
            };
            res.json(response);
        }
        else {
            const response = {
                code: 404,
                messages: 'Contact non trouvé',
            };
            res.status(404).json(response);
        }
    }
    catch (error) {
        console.error('Erreur lors de la récupération du contact par ID:', error);
        const response = {
            code: 500,
            messages: 'Erreur interne du serveur',
        };
        res.status(500).json(response);
    }
});
exports.handleGetContactById = handleGetContactById;
const handleCreateContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = contactValidation_1.createContactSchema.parse(req.body);
        const newContact = yield (0, contactService_1.createContact)(validatedData);
        const response = {
            code: 201,
            messages: 'Contact créé avec succès',
            data: newContact,
        };
        res.status(201).json(response);
    }
    catch (error) {
        console.error('Erreur lors de la création du contact:', error);
        res.status(400).json({
            code: 400,
            messages: error.errors ? error.errors.map((e) => e.message).join(', ') : error.message,
        });
    }
});
exports.handleCreateContact = handleCreateContact;
const handleUpdateContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const validatedData = contactValidation_1.updateContactSchema.parse(req.body);
        const updatedContact = yield (0, contactService_1.updateContact)(id, validatedData);
        const response = {
            code: 200,
            messages: 'Contact mis à jour avec succès',
            data: updatedContact,
        };
        res.json(response);
    }
    catch (error) {
        console.error('Erreur lors de la mise à jour du contact:', error);
        res.status(400).json({
            code: 400,
            messages: error.errors ? error.errors.map((e) => e.message).join(', ') : error.message,
        });
    }
});
exports.handleUpdateContact = handleUpdateContact;
const handleDeleteContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield (0, contactService_1.deleteContact)(id);
        const response = {
            code: 204,
            messages: 'Contact supprimé avec succès',
        };
        res.status(204).send(response);
    }
    catch (error) {
        console.error('Erreur lors de la suppression du contact:', error);
        const response = {
            code: 500,
            messages: 'Erreur interne du serveur',
        };
        res.status(500).json(response);
    }
});
exports.handleDeleteContact = handleDeleteContact;
//# sourceMappingURL=contactController.js.map