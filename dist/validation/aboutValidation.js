"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAboutSchema = exports.createAboutSchema = void 0;
const zod_1 = require("zod");
// Validation pour la création d'une page About
exports.createAboutSchema = zod_1.z.object({
    libelle: zod_1.z.string().optional(),
    name: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    image: zod_1.z.string().url().optional(),
});
// Validation pour la mise à jour d'une page About
exports.updateAboutSchema = zod_1.z.object({
    libelle: zod_1.z.string().optional(),
    name: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    image: zod_1.z.string().url().optional(),
});
//# sourceMappingURL=aboutValidation.js.map