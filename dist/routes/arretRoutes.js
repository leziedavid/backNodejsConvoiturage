"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const arretController_1 = require("../controllers/arretController");
const router = (0, express_1.Router)();
router.get('/', arretController_1.getArrets);
router.get('/:id', arretController_1.getArretById);
router.post('/', arretController_1.createArret);
router.put('/:id', arretController_1.updateArret);
router.delete('/:id', arretController_1.deleteArret);
exports.default = router;
//# sourceMappingURL=arretRoutes.js.map