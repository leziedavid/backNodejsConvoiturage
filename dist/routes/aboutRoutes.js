"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/aboutRoutes.ts
const express_1 = require("express");
const aboutController_1 = require("../controllers/aboutController");
const router = (0, express_1.Router)();
router.get('/', aboutController_1.getAbouts);
router.get('/:id', aboutController_1.getAboutById);
router.post('/', aboutController_1.createAbout);
router.put('/:id', aboutController_1.updateAbout);
router.delete('/:id', aboutController_1.deleteAbout);
exports.default = router;
//# sourceMappingURL=aboutRoutes.js.map