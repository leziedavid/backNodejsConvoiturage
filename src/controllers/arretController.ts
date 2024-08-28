// src/controllers/arretController.ts
import { Request, Response } from 'express';
import { BaseResponse } from '../interfaces/BaseResponse';
import * as arretService from '../services/arretService';
import { z } from 'zod';
import { createArretSchema, updateArretSchema, getArretByIdSchema } from '../validation/arretValidation';

export const createArret = async (req: Request, res: Response) => {
    try {
        // Valider les données de la requête
        const parsedBody = createArretSchema.parse(req.body);

        // Utiliser le service pour créer un arrêt
        const newArret = await arretService.createArret(parsedBody);

        const response: BaseResponse<typeof newArret> = {
            code: 201,
            messages: 'Arret created successfully',
            data: newArret,
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

export const updateArret = async (req: Request, res: Response) => {
    try {
        // Valider les données de la requête
        const parsedBody = updateArretSchema.parse(req.body);

        // Utiliser le service pour mettre à jour un arrêt
        const updatedArret = await arretService.updateArret(req.params.id, parsedBody);

        const response: BaseResponse<typeof updatedArret> = {
            code: 200,
            messages: 'Arret updated successfully',
            data: updatedArret,
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

export const getArrets = async (req: Request, res: Response) => {
    try {
        const arrets = await arretService.getArrets();
        const response: BaseResponse<typeof arrets> = {
            code: 200,
            messages: 'Arrets retrieved successfully',
            data: arrets,
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

export const getArretById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        // Valider les paramètres de la requête
        getArretByIdSchema.parse({ id });

        const arret = await arretService.getArretById(id);

        if (arret) {
            const response: BaseResponse<typeof arret> = {
                code: 200,
                messages: 'Arret retrieved successfully',
                data: arret,
            };
            res.json(response);
        } else {
            const response: BaseResponse<null> = {
                code: 404,
                messages: 'Arret not found',
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

export const deleteArret = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await arretService.deleteArret(id);
        const response: BaseResponse<null> = {
            code: 200,
            messages: 'Arret deleted successfully',
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
