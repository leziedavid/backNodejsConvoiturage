import { Request, Response } from 'express';
import { loginSchema, logoutSchema } from '../validation/authValidation';
import * as authService from '../services/authService';
import { BaseResponse } from '../interfaces/BaseResponse';
import { User } from '@prisma/client';
import { resetPasswordSchema, sendOtpSchema } from '../validation/sendOtpSchema';
import { z } from 'zod';
import { resetPassword, sendOtp } from '../services/Auth';

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


// Contrôleur pour envoyer l'OTP
export const sendOtpController = async (req: Request, res: Response) => {
    try {
        const parsedBody = sendOtpSchema.parse(req.body);
        const response = await sendOtp(parsedBody.email);

        // Supposons que l'utilisateur soit également retourné
        const user: User | null = response.data?.user || null; // Assurez-vous que votre service retourne l'utilisateur

        const responseData: BaseResponse<{ token: string }> = {
            code: response.code,
            messages: response.messages,
            data: { token: response.data?.otpToken },
        };

        res.status(response.code).json(responseData);
    } catch (error) {
        if (error instanceof z.ZodError) {
            const response = {
                code: 400,
                messages: error.errors.map(e => e.message).join(', '),
            };
            return res.status(400).json(response);
        }
        console.error(error);
        res.status(500).json({ code: 500, messages: 'Internal server error' });
    }
};

export const resetPasswordController = async (req: Request, res: Response) => {
    try {
        const parsedBody = resetPasswordSchema.parse(req.body);
        const response = await resetPassword(parsedBody.password, parsedBody.email); // Ajout de l'email si nécessaire

        const responseData: BaseResponse<{ token: string }> = {
            code: response.code,
            messages: response.messages,
            data: { token: response.data?.token },
        };

        res.status(response.code).json(responseData);
    } catch (error) {
        if (error instanceof z.ZodError) {
            const response = {
                code: 400,
                messages: error.errors.map(e => e.message).join(', '),
            };
            return res.status(400).json(response);
        }
        console.error(error);
        res.status(500).json({ code: 500, messages: 'Internal server error' });
    }
};