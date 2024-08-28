import multer from 'multer';
import path from 'path';

// Définir le stockage des fichiers
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Utiliser path.join pour obtenir le chemin correct
        const uploadsDir = path.join(__dirname, '../uploads');
        console.log('Uploads directory:', uploadsDir); // Pour le débogage
        cb(null, uploadsDir); // Répertoire où les fichiers seront stockés
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext); // Nom de fichier unique
    }
});

// Filtrer les fichiers acceptés
const fileFilter = (req: any, file: any, cb: any) => {
    const allowedTypes = /jpeg|jpg|png|pdf|doc|docx|xls|xlsx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Only images, PDFs, and Word documents are allowed.'));
    }
};

// Configurer Multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

export default upload;
