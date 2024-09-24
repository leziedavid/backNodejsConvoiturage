// src/controllers/rechargementController.ts
import { Request, Response } from 'express';
import * as rechargementService from '../services/rechargementService';
import { BaseResponse } from '../interfaces/BaseResponse';
import { z } from 'zod'
// Validation schema (Assume it is defined elsewhere)
import { createRechargementSchema } from '../validation/rechargementValidation';


const handleError = (error: unknown): BaseResponse<null> => {
    console.error(error);
    return {
        code: 500,
        messages: 'Internal server error',
    };
};

export const createRechargement = async (req: Request, res: Response) => {
    try {
        const parsedBody = createRechargementSchema.parse(req.body);
        const newRechargement = await rechargementService.createRechargement(parsedBody);

        const response: BaseResponse<typeof newRechargement> = {
            code: 201,
            messages: 'Rechargement created successfully',
            data: newRechargement,
        };
        res.status(201).json(response);

    } catch (error) {

        if (error instanceof z.ZodError) {
            
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

export const getRechargements = async (req: Request, res: Response) => {
    try {
        // Extraction des paramètres de pagination
        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = parseInt(req.query.limit as string, 10) || 10;

        console.log(page);
        // Vérifiez si page et limit sont des nombres positifs
        if (page < 1 || limit < 1) {
            return res.status(400).json({
                code: 400,
                messages: 'Page and limit must be positive numbers.',
                data: null,
                total: 0,
            });
        }

        // Appeler le service de rechargements avec les paramètres de pagination
        const options = { page, limit };
        const rechargements = await rechargementService.getAllRechargements(options);

        if (!rechargements) {
            return res.status(404).json({
                code: 404,
                messages: 'Rechargements not found',
                data: null,
                total: 0,
            });
        }

        return res.status(200).json({
            code: 200,
            messages: 'Rechargements retrieved successfully',
            data: rechargements.data,
            total: rechargements.total,
        });

    } catch (error: unknown) {
        return res.status(500).json(handleError(error));
    }
};