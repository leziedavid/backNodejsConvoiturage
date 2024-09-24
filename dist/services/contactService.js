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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContact = exports.getContactById = exports.getContacts = exports.updateContact = exports.createContact = void 0;
// src/services/contactService.ts
const Conn_1 = __importDefault(require("../Conn"));
// Créer un nouveau contact
const createContact = (contactData) => __awaiter(void 0, void 0, void 0, function* () {
    return Conn_1.default.contact.create({
        data: contactData,
    });
});
exports.createContact = createContact;
// Mettre à jour un contact existant
const updateContact = (id, contactData) => __awaiter(void 0, void 0, void 0, function* () {
    const contact = yield Conn_1.default.contact.findUnique({ where: { id } });
    if (!contact)
        throw new Error('Contact non trouvé');
    return Conn_1.default.contact.update({
        where: { id },
        data: contactData,
    });
});
exports.updateContact = updateContact;
// Récupérer tous les contacts
const getContacts = () => __awaiter(void 0, void 0, void 0, function* () {
    return Conn_1.default.contact.findMany();
});
exports.getContacts = getContacts;
// Récupérer un contact par ID
const getContactById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return Conn_1.default.contact.findUnique({
        where: { id },
    });
});
exports.getContactById = getContactById;
// Supprimer un contact
const deleteContact = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield Conn_1.default.contact.delete({ where: { id } });
});
exports.deleteContact = deleteContact;
//# sourceMappingURL=contactService.js.map