import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// Initialiser le client Supabase avec les informations d'environnement
const supabse = createClient(
    process.env.SUPABASE_URL!,
    // process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Configuration de multer pour accepter un fichier unique
const uploadSingle = multer({
    dest: 'uploads/', // Répertoire temporaire pour stocker les fichiers avant l'upload
    limits: { fileSize: 10 * 1024 * 1024 }, // Limite à 10MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|pdf|doc|docx|xls|xlsx/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only images, PDFs, and Word documents are allowed.'));
        }
    },
}).single('photo');

// Fonction pour uploader un fichier sur Supabase Storage
const uploadToSupabase = async (filePath: string, filename: string) => {
    const fileContent = fs.readFileSync(filePath);

    // Uploader le fichier vers Supabase Storage dans le bucket "images"
    const { data, error } = await supabse.storage
        .from(process.env.SUPABASE_BUCKET_NAME!)
        .upload(filename, fileContent, {
            contentType: 'image/jpeg', // Ajustez le type MIME en fonction du fichier
            upsert: true, // Remplacer le fichier s'il existe déjà
        });

    if (error) {
        throw new Error('Error uploading file to Supabase Storage: ' + error.message);
    }

    // Retourner l'URL du fichier téléchargé
    return `${process.env.SUPABASE_URL}/storage/v1/object/public/${process.env.SUPABASE_BUCKET_NAME!}/${filename}`;
};

// Middleware pour un fichier unique
export const supabaseUploadSingle = (req: Request, res: Response, next: NextFunction) => {
    uploadSingle(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: 'File upload failed', error: err.message });
        }

        if (req.file) {
            const filename = `user-${Date.now()}-${req.file.originalname}`;
            try {
                const fileUrl = await uploadToSupabase(req.file.path, filename);
                req.body.fileUrl = fileUrl; // Ajouter l'URL du fichier à la requête
            } catch (error) {
                return res.status(500).json({ message: 'Error uploading image to Supabase', error: error instanceof Error ? error.message : 'Unknown error' });
            }
        }
        next();
    });
};

// Middleware pour plusieurs fichiers
export const supabaseUploadMultiple = (req: Request, res: Response, next: NextFunction) => {
    const uploadMultiple = multer({
        dest: 'uploads/',
        limits: { fileSize: 10 * 1024 * 1024 },
        fileFilter: (req, file, cb) => {
            const allowedTypes = /jpeg|jpg|png|pdf|doc|docx|xls|xlsx/;
            const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
            const mimetype = allowedTypes.test(file.mimetype);

            if (mimetype && extname) {
                return cb(null, true);
            } else {
                cb(new Error('Only images, PDFs, and Word documents are allowed.'));
            }
        },
    }).array('photos', 10); // Max 10 fichiers

    uploadMultiple(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: 'File upload failed', error: err.message });
        }

        if (req.files && Array.isArray(req.files)) {
            try {
                const fileUrls: string[] = [];
                for (const file of req.files) {
                    const filename = `user-${Date.now()}-${file.originalname}`;
                    const fileUrl = await uploadToSupabase(file.path, filename);
                    fileUrls.push(fileUrl);
                }
                req.body.fileUrls = fileUrls; // Ajouter les URLs des fichiers à la requête
            } catch (error) {
                return res.status(500).json({ message: 'Error uploading images to Supabase', error: error instanceof Error ? error.message : 'Unknown error' });
            }
        }
        next();
    });
};
