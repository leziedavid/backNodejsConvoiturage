// src/controllers/rechargementController.ts
import { Request, Response } from 'express';
import * as rechargementService from '../services/rechargementService';
import { BaseResponse } from '../interfaces/BaseResponse';
import { z } from 'zod';

// Validation schema (Assume it is defined elsewhere)
import { createRechargementSchema } from '../validation/rechargementValidation';

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
