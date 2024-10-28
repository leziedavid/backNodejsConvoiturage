"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateContactSchema = exports.createContactSchema = void 0;
const zod_1 = require("zod");
// Validation pour la création d'un contact
exports.createContactSchema = zod_1.z.object({
    nom: zod_1.z.string().min(1, 'Name is required'),
    email: zod_1.z.string().email('Invalid email address').min(1, 'Email is required'),
    sujet: zod_1.z.string().min(1, 'Subject is required'),
    message: zod_1.z.string().min(1, 'Message is required'),
});
// Validation pour la mise à jour d'un contact
exports.updateContactSchema = zod_1.z.object({
    nom: zod_1.z.string().min(1, 'Name is required').optional(),
    email: zod_1.z.string().email('Invalid email address').min(1, 'Email is required').optional(),
    sujet: zod_1.z.string().min(1, 'Subject is required').optional(),
    message: zod_1.z.string().min(1, 'Message is required').optional(),
});
//# sourceMappingURL=contactValidation.js.map