// src/services/userService.ts

import { Prisma, User } from '@prisma/client';
import prisma from '../Conn';
import { paginate, PaginationOptions } from './allPaginations/usersPaginate';
const bcrypt = require('bcryptjs');

interface UserStatistics {
    totalCourses: number;
    numberOfVehicles: number;
    totalAmount: number;
    lastTrajet: any; // Remplacez `any` par le type approprié si disponible
    userDetail: any;
}

// Fonction pour créer un utilisateur
export const createUser = async (userData: any, file: Express.Multer.File | undefined, baseUrl: string): Promise<User> => {
    const { password, role = 'user', verification_status = 'pending', currency_id, ...restOfData } = userData;

    if (!password) throw new Error('Password is required');

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    let photoUrl: string | null = null;
    if (file) {
        photoUrl = `${baseUrl}/uploads/${file.filename}`;
    }

    // Création de l'utilisateur
    const newUser = await prisma.user.create({
        data: {
            ...restOfData,
            password_hash: passwordHash,
            photo_url: photoUrl,
            verification_status,
            role, // Inclure le rôle ici
        },
    });
    
    // Si le rôle est "user" ou "conducteur", créer un portefeuille
    if (role === 'USER' || role === 'DRIVER') {
        await prisma.wallet.create({
            data: {
                user_id: newUser.id, // Associer le portefeuille à l'utilisateur
                balance: 0.0, // Solde initial du portefeuille
                currency_id
            },
        });
    }

    return newUser;
};

export const createUser1 = async (userData: any, file: Express.Multer.File | undefined, baseUrl: string): Promise<User> => {
    const { password, verification_status = 'pending', ...restOfData } = userData;

    if (!password) throw new Error('Password is required');

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    let photoUrl: string | null = null;
    if (file) {
        photoUrl = `${baseUrl}/uploads/${file.filename}`;
    }

    return prisma.user.create({
        data: {
            ...restOfData,
            password_hash: passwordHash,
            photo_url: photoUrl,
            verification_status,
        },
    });
};

export const updateUser = async (userId: string, userData: any, file: Express.Multer.File | undefined, baseUrl: string): Promise<User> => {
    const { password, verification_status, ...restOfData } = userData;

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    const updateData: Prisma.UserUpdateInput = { ...restOfData };

    if (password) {
        const salt = await bcrypt.genSalt(10);
        updateData.password_hash = await bcrypt.hash(password, salt);
    }

    if (file) {
        updateData.photo_url = `${baseUrl}/uploads/${file.filename}`;
    }

    if (verification_status) {
        updateData.verification_status = verification_status;
    }

    return prisma.user.update({
        where: { id: userId },
        data: updateData,
    });
};

export const updateUsermdp = async (userId: string,{ currentPassword, newPassword }: { currentPassword: string; newPassword: string }
): Promise<User> => {
    // Trouver l'utilisateur existant
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    // Vérifier que le mot de passe actuel est correct
    console.log(user.password_hash);
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password_hash);
    if (!isPasswordValid) throw new Error('Current password is incorrect');

    // Préparer les données pour la mise à jour
    const updateData: Prisma.UserUpdateInput = {};

    if (newPassword) {
        // Générer un hash pour le nouveau mot de passe
        const salt = await bcrypt.genSalt(10);
        updateData.password_hash = await bcrypt.hash(newPassword, salt);
    }

    // Mettre à jour l'utilisateur avec les nouvelles données
    return prisma.user.update({
        where: { id: userId },
        data: updateData,
    });
};

export const getUsers = async (
    options: PaginationOptions
): Promise<{ data: User[]; total: number }> => {
    return paginate(
        (args) => prisma.user.findMany({
            orderBy: { created_at: 'desc' },
            include: {
                trajets: true,
                commandes: true,
                reponsesConducteur: true,
                commandesConducteur: true,
                vehicules: true,
                rechargements: true
            },
            ...args,
        }),
        options
    );
};


export const getUserById = async (id: string): Promise<User | null> => {
    return prisma.user.findUnique({
        where: { id },
        include: {
            trajets: true,
            commandes: true,
            reponsesConducteur: true,
            commandesConducteur: true,
            vehicules: true,
            rechargements: true
        }
    });
};


export const getUserInfo = async (id: string): Promise<User | null> => {
    return prisma.user.findUnique({
        where: { id }
    });
};

export const deleteUser = async (id: string): Promise<void> => {
    await prisma.user.delete({ where: { id } });
};
export const getUserStatistics = async (userId: string): Promise<UserStatistics> => {
    try {

        // Total des courses de l'utilisateur
        const totalCourses = await prisma.commande.count({
            where: { utilisateur_id: userId },
        });

        // Nombre de véhicules de l'utilisateur
        const numberOfVehicles = await prisma.vehicule.count({
            where: { utilisateur_id: userId },
        });

        // Montant total des courses de l'utilisateur
        const totalAmountResult = await prisma.commande.aggregate({
            _sum: {
                montant: true,
            },
            where: { utilisateur_id: userId },
        });

        const totalAmount = totalAmountResult._sum.montant || 0;

        // Dernier trajet de l'utilisateur
        const lastTrajet = await prisma.trajet.findFirst({
            where: { utilisateur_id: userId },
            orderBy: {
                created_at: 'desc',
            },
        });
        
        const userDetail = await prisma.user.findFirst({
            where: { id: userId },
            orderBy: {
                created_at: 'desc',
            },
            include: {
                wallet: true,
            }
        });

        // Dernier rechargement de l'utilisateur
        const rechargements = await prisma.rechargement.findFirst({
            where: { utilisateur_id: userId },
            orderBy: { date: 'desc' }
        });

        return {

            totalCourses,
            numberOfVehicles,
            totalAmount,
            lastTrajet,
            userDetail: {
                ...userDetail,
                rechargements,
            },
        };
    } catch (error) {
        console.error('Error fetching user statistics:', error);
        throw error;
    }
};

export const updateUserState = async (
    userId: string,
    userData: { isActive: boolean | null; verificationStatus: 'validated' | 'pending' | null }
): Promise<User> => {
    // Trouver l'utilisateur existant
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    // Préparer les données de mise à jour
    const updateData: Prisma.UserUpdateInput = {};

    if (userData.isActive !== null) {
        updateData.is_active = userData.isActive;
    }

    if (userData.verificationStatus !== null) {
        updateData.verification_status = userData.verificationStatus;
    }

    // Mettre à jour l'utilisateur dans la base de données
    return prisma.user.update({
        where: { id: userId },
        data: updateData,
    });
};

export const searchUsers = async (
    searchTerm: string,
    options: PaginationOptions
): Promise<{ data: User[]; total: number }> => {
    return paginate(
        (args) => prisma.user.findMany({
            where: {
                username: {
                    contains: searchTerm,
                    mode: 'insensitive', // Recherche insensible à la casse
                },
            },
            orderBy: { created_at: 'desc' },
            include: {
                vehicules: true, // Incluez les relations nécessaires
            },
            ...args,
        }),
        options
    );
};

