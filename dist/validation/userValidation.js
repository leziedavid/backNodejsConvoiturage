"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByIdSchema = exports.updateUserSchema = exports.updateMdp = exports.createUserSchema = void 0;
const zod_1 = require("zod");
// Validation pour la création d'un utilisateur
exports.createUserSchema = zod_1.z.object({
    username: zod_1.z.string().min(1, 'Username is required'),
    email: zod_1.z.string().email('Invalid email address').min(1, 'Email is required'),
    password: zod_1.z.string().min(8, 'Password must be at least 8 characters long'),
    role: zod_1.z.string().min(1, 'Role is required'),
    photo_url: zod_1.z.string().url().optional(),
    contact_number: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
    bio: zod_1.z.string().optional(),
    date_of_birth: zod_1.z.date().optional(),
});
exports.updateMdp = zod_1.z.object({
    currentPassword: zod_1.z.string().min(8, 'Password must be at least 8 characters long'),
    newPassword: zod_1.z.string().min(8, 'Password must be at least 8 characters long'),
});
exports.updateUserSchema = exports.createUserSchema
    .omit({ password: true }) // On ne met pas à jour le mot de passe ici
    .partial(); // Toutes les propriétés sont maintenant optionnelles
exports.getUserByIdSchema = zod_1.z.object({
    id: zod_1.z.string().uuid('Invalid user ID'),
});
//# sourceMappingURL=userValidation.js.map