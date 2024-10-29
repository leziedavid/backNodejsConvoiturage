"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentValidation = void 0;
const zod_1 = require("zod");
exports.paymentValidation = {
    launchSchema: zod_1.z.object({
        amount: zod_1.z.number().positive(),
    }),
};
//# sourceMappingURL=paymentValidation.js.map