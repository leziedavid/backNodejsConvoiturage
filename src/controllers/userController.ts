// src/controllers/userController.ts
import { Request, Response } from 'express';
import { BaseResponse } from '../interfaces/BaseResponse';
import * as userService from '../services/userService';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { createUserSchema, getUserByIdSchema, updateUserSchema } from '../validation/userValidation';

const baseUrl = process.env.APP_URL || 'http://localhost:4000';

export const createUser = async (req: Request, res: Response) => {
    try {
        // Valider les données de la requête
        const parsedBody = createUserSchema.parse(req.body);

        // Utiliser le service pour créer un utilisateur
        const newUser = await userService.createUser(parsedBody, req.file, baseUrl);

        const response: BaseResponse<typeof newUser> = {
            code: 201,
            messages: 'User created successfully',
            data: newUser,
        };
        res.status(201).json(response);
    } catch (error) {
        if (error instanceof z.ZodError) {
            // Erreurs de validation Zod
            const response: BaseResponse<null> = {
                code: 400,
                messages: error.errors.map(e => e.message).join(', '),
            };
            return res.status(400).json(response);
        }
        console.error(error);
        const response: BaseResponse<null> = {
            code: 500,
            messages: 'Internal server error',
        };
        res.status(500).json(response);
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        // Valider les données de la requête
        const parsedBody = updateUserSchema.parse(req.body);

        // Utiliser le service pour mettre à jour un utilisateur
        const updatedUser = await userService.updateUser(req.params.id, parsedBody, req.file, baseUrl);

        const response: BaseResponse<typeof updatedUser> = {
            code: 200,
            messages: 'User updated successfully',
            data: updatedUser,
        };
        res.status(200).json(response);
    } catch (error) {
        if (error instanceof z.ZodError) {
            // Erreurs de validation Zod
            const response: BaseResponse<null> = {
                code: 400,
                messages: error.errors.map(e => e.message).join(', '),
            };
            return res.status(400).json(response);
        }
        console.error(error);
        const response: BaseResponse<null> = {
            code: 500,
            messages: 'Internal server error',
        };
        res.status(500).json(response);
    }
};

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.getUsers();
        const response: BaseResponse<typeof users> = {
            code: 200,
            messages: 'Users retrieved successfully',
            data: users,
        };
        res.json(response);
    } catch (error) {
        const response: BaseResponse<null> = {
            code: 500,
            messages: 'Internal server error',
        };
        res.status(500).json(response);
    }
};

export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        // Valider les paramètres de la requête
        getUserByIdSchema.parse({ id });

        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                code: 401,
                messages: 'Token manquant',
            });
        }

        const decodedToken = jwt.decode(token) as { exp: number } | null;
        if (decodedToken && decodedToken.exp * 1000 < Date.now()) {

            return res.status(401).json({
                code: 401,
                messages: 'Token expiré, veuillez vous reconnecter pour accéder à la ressource',
            });
        }

        const user = await userService.getUserById(id);

        if (user) {
            
            const response: BaseResponse<typeof user> = {
                code: 200,
                messages: 'User retrieved successfully',
                data: user,
            };
            res.json(response);

        } else {
            const response: BaseResponse<null> = {
                code: 404,
                messages: 'User not found',
            };
            res.status(404).json(response);
        }
        
    } catch (error) {
        if (error instanceof z.ZodError) {
            // Erreurs de validation Zod
            const response: BaseResponse<null> = {
                code: 400,
                messages: error.errors.map(e => e.message).join(', '),
            };
            return res.status(400).json(response);
        }
        const response: BaseResponse<null> = {
            code: 500,
            messages: 'Internal server error',
        };
        res.status(500).json(response);
    }
};

export const getUsersInfo = async (req: Request, res: Response) => {
    const { id } = req.params;
    
    try {
        // Valider les paramètres de la requête
        getUserByIdSchema.parse({ id });

        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                code: 401,
                messages: 'Token manquant',
            });
        }

        const decodedToken = jwt.decode(token) as { exp: number } | null;
        if (decodedToken && decodedToken.exp * 1000 < Date.now()) {

            return res.status(401).json({
                code: 401,
                messages: 'Token expiré, veuillez vous reconnecter pour accéder à la ressource',
            });
        }

        const user = await userService.getUserInfo(id);

        if (user) {
            
            const response: BaseResponse<typeof user> = {
                code: 200,
                messages: 'User retrieved successfully',
                data: user,
            };
            res.json(response);

        } else {
            const response: BaseResponse<null> = {
                code: 404,
                messages: 'User not found',
            };
            res.status(404).json(response);
        }

    } catch (error) {
        if (error instanceof z.ZodError) {
            // Erreurs de validation Zod
            const response: BaseResponse<null> = {
                code: 400,
                messages: error.errors.map(e => e.message).join(', '),
            };
            return res.status(400).json(response);
        }
        const response: BaseResponse<null> = {
            code: 500,
            messages: 'Internal server error',
        };
        res.status(500).json(response);
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await userService.deleteUser(id);
        const response: BaseResponse<null> = {
            code: 200,
            messages: 'User deleted successfully',
        };
        res.status(200).send(response);
    } catch (error) {
        const response: BaseResponse<null> = {
            code: 500,
            messages: 'Internal server error',
        };
        res.status(500).json(response);
    }
};

export const getUserStatisticsController2 = async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.id;

    try {

        const stats = await userService.getUserStatistics(userId);
        res.json(stats);
        
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user statistics' });
    }
};

export const getUserStatisticsController = async (req: Request, res: Response): Promise<Response> => {
    const userId = req.params.id;

    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                code: 401,
                messages: 'Token manquant',
            });
        }

        // Décoder le token sans validation
        const decodedToken = jwt.decode(token) as { exp: number } | null;
        if (decodedToken && decodedToken.exp * 1000 < Date.now()) {
            return res.status(401).json({
                code: 401,
                messages: 'Token expiré, veuillez vous reconnecter pour accéder à la ressource',
            });
        }

        // Récupérez les statistiques de l'utilisateur
        const stats = await userService.getUserStatistics(userId);
        return res.status(200).json({
            code: 200,
            data: stats
        }); // Retourner les statistiques formatées de manière uniforme

    } catch (error) {
        console.error('Error fetching user statistics:', error); // Ajout de console.error pour déboguer
        return res.status(500).json({
            code: 500,
            messages: 'Erreur lors de la récupération des statistiques de l\'utilisateur'
        }); // Retourner l'erreur formatée de manière uniforme
    }
};



