"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFAQSchema = exports.createFAQSchema = void 0;
const zod_1 = require("zod");
// Validation pour la création d'une FAQ
exports.createFAQSchema = zod_1.z.object({
    question: zod_1.z.string().min(1, 'Question is required'),
    reponse: zod_1.z.string().min(1, 'Answer is required'),
});
// Validation pour la mise à jour d'une FAQ
exports.updateFAQSchema = zod_1.z.object({
    question: zod_1.z.string().min(1, 'Question is required').optional(),
    reponse: zod_1.z.string().min(1, 'Answer is required').optional(),
});
//# sourceMappingURL=faqValidation.js.map