import jwt from 'jsonwebtoken';
const bcrypt = require('bcryptjs');
import prisma from '../Conn';
import { User } from '@prisma/client';

// Générer un token JWT
const generateToken = (userId: string) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }
    return jwt.sign({ id: userId }, process.env.JWT_SECRET as string, { expiresIn: '24h' });
};

// Fonction de connexion
export const loginUser = async (email: string, password: string): Promise<{ token: string; user: User }> => {
    // Recherche de l'utilisateur dans la base de données
    
    const user = await prisma.user.findUnique({
        where: { email },
    });

    
    if (!user) {
        throw new Error('Utilisateur non trouvé');
    }

    // Vérifiez le mot de passe (ajoutez ici votre logique de vérification)
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    // Générer un token JWT
    const token = generateToken(user.id);

    return { token, user };
};

// Fonction de déconnexion
export const logoutUser = async (): Promise<void> => {
    // Les tokens JWT ne peuvent pas être invalidés côté serveur en général,
    // donc cette fonction est principalement pour des actions supplémentaires comme la suppression de sessions côté serveur
    return;
};
