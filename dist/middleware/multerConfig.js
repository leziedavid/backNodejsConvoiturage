"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// Définir le stockage des fichiers
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        // Utiliser path.join pour obtenir le chemin correct
        const uploadsDir = path_1.default.join(__dirname, '../uploads');
        console.log('Uploads directory:', uploadsDir); // Pour le débogage
        cb(null, uploadsDir); // Répertoire où les fichiers seront stockés
    },
    filename: (req, file, cb) => {
        const ext = path_1.default.extname(file.originalname);
        cb(null, Date.now() + ext); // Nom de fichier unique
    }
});
// Filtrer les fichiers acceptés
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf|doc|docx|xls|xlsx/;
    const extname = allowedTypes.test(path_1.default.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    }
    else {
        cb(new Error('Only images, PDFs, and Word documents are allowed.'));
    }
};
// Configurer Multer
const upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: fileFilter
});
exports.default = upload;
//# sourceMappingURL=multerConfig.js.map