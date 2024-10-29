"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/userRoutes.ts
const express_1 = require("express");
const userController = __importStar(require("../controllers/userController"));
const multerConfig_1 = __importDefault(require("../middleware/multerConfig"));
const router = (0, express_1.Router)();
router.post('/', multerConfig_1.default.single('photo'), userController.createUser);
router.put('/:id', multerConfig_1.default.single('photo'), userController.updateUser);
router.put('/:id/mdp', multerConfig_1.default.single('photo'), userController.updateUserMdp);
router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.delete('/:id', userController.deleteUser);
// Route pour obtenir les statistiques d'un utilisateur
router.get('/:id/:stats', userController.getUserStatisticsController);
router.get('/:id/:root/:detail', userController.getUsersInfo);
// Nouvelle route pour mettre à jour le statut de l'utilisateur
router.post('/updateUserStatut', userController.updateUserStatut);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map