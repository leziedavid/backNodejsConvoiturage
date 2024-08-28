import { Request, Response } from 'express';
import { loginSchema, logoutSchema } from '../validation/authValidation';
import * as authService from '../services/authService';
import { BaseResponse } from '../interfaces/BaseResponse';
import { User } from '@prisma/client';

export const login = async (req: Request, res: Response) => {
    try {
        // Valider les données de la requête
        const parsedBody = loginSchema.parse(req.body);
        const { email, password } = parsedBody;

        // Utiliser le service pour connecter l'utilisateur
        const { token,user } = await authService.loginUser(email, password);

        const response: BaseResponse<{ token: string; user: User }> = {
        // const response: BaseResponse<{ token: string}> = {
            code: 200,
            messages: 'Login successful',
            data: { token,user },
        };
        res.json(response);
    } catch (error) {
        const response: BaseResponse<null> = {
            code: 400,
            messages: (error instanceof Error) ? error.message : 'An unexpected error occurred',
        };
        res.status(400).json(response);
    }
};

export const logout = async (req: Request, res: Response) => {
    try {
        // Valider les données de la requête (si nécessaire)
        logoutSchema.parse(req.body);

        // Utiliser le service pour déconnecter l'utilisateur
        await authService.logoutUser();

        const response: BaseResponse<null> = {
            code: 200,
            messages: 'Logout successful',
        };
        res.json(response);
    } catch (error) {
        const response: BaseResponse<null> = {
            code: 400,
            messages: (error instanceof Error) ? error.message : 'An unexpected error occurred',
        };
        res.status(400).json(response);
    }
};
