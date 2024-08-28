// src/controllers/trajetController.ts
import { Request, Response } from 'express';
import { BaseResponse } from '../interfaces/BaseResponse';
import * as trajetService from '../services/trajetService';
import { z } from 'zod';
import { createTrajetSchema, updateTrajetSchema, getTrajetByIdSchema, searchTrajetSchema } from '../validation/trajetValidation';
import jwt from 'jsonwebtoken';



interface DecodedToken {
    id: string;
    exp: number;
}


export const createTrajet = async (req: Request, res: Response) => {
    try {
        // Valider les données de la requête
        const parsedBody = createTrajetSchema.parse(req.body);

        // Utiliser le service pour créer un trajet
        const newTrajet = await trajetService.createTrajet(parsedBody);

        const response: BaseResponse<typeof newTrajet> = {
            code: 201,
            messages: 'Trajet created successfully',
            data: newTrajet,
        };

        res.status(201).json(response);
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errors = error.errors.map(e => `${e.path.join('.')} : ${e.message}`).join(', ');
            const response: BaseResponse<null> = {
                code: 400,
                messages: errors,
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

export const updateTrajet = async (req: Request, res: Response) => {
    try {
        const parsedBody = updateTrajetSchema.parse(req.body);

        const updatedTrajet = await trajetService.updateTrajet(req.params.id, parsedBody);

        const response: BaseResponse<typeof updatedTrajet> = {
            code: 200,
            messages: 'Trajet updated successfully',
            data: updatedTrajet,
        };
        res.status(200).json(response);
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

export const getTrajets = async (req: Request, res: Response) => {

    try {
        const trajets = await trajetService.getTrajets();
        const response: BaseResponse<typeof trajets> = {
            code: 200,
            messages: 'Trajets retrieved successfully',
            data: trajets,
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

export const getTrajetById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {

        getTrajetByIdSchema.parse({ id });

        const trajet = await trajetService.getTrajetById(id);

        if (trajet) {
            const response: BaseResponse<typeof trajet> = {
                code: 200,
                messages: 'Trajet retrieved successfully',
                data: trajet,
            };
            res.json(response);
        } else {
            const response: BaseResponse<null> = {
                code: 404,
                messages: 'Trajet not found',
            };
            res.status(404).json(response);
        }
    } catch (error) {
        if (error instanceof z.ZodError) {
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

export const getTrajetDriver = async (req: Request, res: Response) => {

    const { id } = req.params;

    try {

        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({
                code: 401,
                messages: 'Token manquant',
            });
        }

        // Décoder le token
        const decodedToken = jwt.decode(token) as DecodedToken | null;

        if (!decodedToken) {

            throw new Error('Votre session a expiré, merci de vous reconnecter.');
        }
        
        const id = decodedToken.id;

        getTrajetByIdSchema.parse({ id });

        const trajet = await trajetService.getDriverTrajet(id);

        if (trajet) {
            const response: BaseResponse<typeof trajet> = {
                code: 200,
                messages: 'Trajet retrieved successfully',
                data: trajet,
            };
            res.json(response);
        } else {
            const response: BaseResponse<null> = {
                code: 404,
                messages: 'Trajet not found',
            };
            res.status(404).json(response);
        }
    } catch (error) {
        if (error instanceof z.ZodError) {
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

export const deleteTrajet = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await trajetService.deleteTrajet(id);
        const response: BaseResponse<null> = {
            code: 200,
            messages: 'Trajet deleted successfully',
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

export const searchTrajets = async (req: Request, res: Response) => {
    try {
        searchTrajetSchema.parse(req.body);

        const { point_depart, point_arrivee, temps_depart_prevu, nombre_de_places } = req.body;
        const trajets = await trajetService.searchTrajets({ point_depart, point_arrivee, temps_depart_prevu, nombre_de_places });

        if (trajets.length === 0) {
            return res.status(404).json({
                code: 404,
                messages: 'Aucun trajet trouvé correspondant aux critères. Voici quelques suggestions basées sur des critères plus larges.',
                data: trajets,
            });
        }

        return res.status(200).json({
            code: 200,
            messages: 'Trajets retrieved successfully',
            data: trajets,
        });

    } catch (error) {
        if (error instanceof z.ZodError) {
            const response: BaseResponse<null> = {
                code: 400,
                messages: error.errors.map(e => e.message).join(', '),
            };
            return res.status(400).json(response);
        }
        console.error('Error searching trajets:', error);

        return res.status(500).json({
            code: 500,
            messages: 'Internal server error',
        });
    }
};
