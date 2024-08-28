// src/controllers/aboutController.ts
import { Request, Response } from 'express';
import * as aboutService from '../services/aboutService';
import { BaseResponse } from '../interfaces/BaseResponse';
import { createAboutSchema, updateAboutSchema } from '../validation/aboutValidation';
import { z } from 'zod';

export const createAbout = async (req: Request, res: Response) => {
    try {
        // Valider les données de la requête
        const parsedBody = createAboutSchema.parse(req.body);

        // Utiliser le service pour créer un About
        const newAbout = await aboutService.createAbout(parsedBody);

        const response: BaseResponse<typeof newAbout> = {
            code: 201,
            messages: 'About created successfully',
            data: newAbout,
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

export const updateAbout = async (req: Request, res: Response) => {
    try {
        // Valider les données de la requête
        const parsedBody = updateAboutSchema.parse(req.body);

        // Utiliser le service pour mettre à jour un About
        const updatedAbout = await aboutService.updateAbout(req.params.id, parsedBody);

        const response: BaseResponse<typeof updatedAbout> = {
            code: 200,
            messages: 'About updated successfully',
            data: updatedAbout,
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

export const getAbouts = async (req: Request, res: Response) => {
    try {
        const abouts = await aboutService.getAbouts();
        const response: BaseResponse<typeof abouts> = {
            code: 200,
            messages: 'Abouts retrieved successfully',
            data: abouts,
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

export const getAboutById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const about = await aboutService.getAboutById(id);

        if (about) {
            const response: BaseResponse<typeof about> = {
                code: 200,
                messages: 'About retrieved successfully',
                data: about,
            };
            res.json(response);
        } else {
            const response: BaseResponse<null> = {
                code: 404,
                messages: 'About not found',
            };
            res.status(404).json(response);
        }
    } catch (error) {
        const response: BaseResponse<null> = {
            code: 500,
            messages: 'Internal server error',
        };
        res.status(500).json(response);
    }
};

export const deleteAbout = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await aboutService.deleteAbout(id);
        const response: BaseResponse<null> = {
            code: 200,
            messages: 'About deleted successfully',
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
