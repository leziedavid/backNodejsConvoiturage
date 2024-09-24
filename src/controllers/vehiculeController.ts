// src/controllers/vehiculeController.ts
import { Request, Response } from 'express';
import {
    createVehicule,
    updateVehicule,
    getVehicules,
    getVehiculeById,
    deleteVehicule,
    getVehiculesByUserId,
} from '../services/vehiculeService';
import { createVehiculeSchema, updateVehiculeSchema } from '../validation/vehiculeValidation';
import { BaseResponse } from '../interfaces/BaseResponse';
import { Vehicule } from '@prisma/client';

export const handleCreateVehicule = async (req: Request, res: Response) => {
    try {
        const vehiculeData = createVehiculeSchema.parse(req.body);
        const newVehicule = await createVehicule(vehiculeData);
        const response: BaseResponse<typeof newVehicule> = {
            code: 201,
            messages: 'Véhicule créé avec succès',
            data: newVehicule,
        };
        res.status(201).json(response);
    } catch (error: any) {
        res.status(400).json({
            code: 400,
            messages: error.errors ? error.errors.map((e: any) => e.message).join(', ') : error.message
        });
    }
};

export const handleUpdateVehicule = async (req: Request, res: Response) => {
    try {
        const vehiculeData = updateVehiculeSchema.parse(req.body);
        const updatedVehicule = await updateVehicule(req.params.id, vehiculeData);
        const response: BaseResponse<typeof updatedVehicule> = {
            code: 200,
            messages: 'Véhicule mis à jour avec succès',
            data: updatedVehicule,
        };
        res.status(200).json(response);
    } catch (error: any) {
        res.status(400).json({
            code: 400,
            messages: error.errors ? error.errors.map((e: any) => e.message).join(', ') : error.message
        });
    }
};

export const handleGetVehicules = async (req: Request, res: Response) => {
    try {
        const vehicules = await getVehicules();
        const response: BaseResponse<typeof vehicules> = {
            code: 200,
            messages: 'Véhicules récupérés avec succès',
            data: vehicules,
        };
        res.status(200).json(response);
    } catch (error: any) {
        res.status(500).json({
            code: 500,
            messages: 'Erreur interne du serveur'
        });
    }
};

export const handleGetVehiculeById = async (req: Request, res: Response) => {
    try {
        const vehicule = await getVehiculeById(req.params.id);
        if (vehicule) {
            const response: BaseResponse<typeof vehicule> = {
                code: 200,
                messages: 'Véhicule récupéré avec succès',
                data: vehicule,
            };
            res.status(200).json(response);
        } else {
            const response: BaseResponse<null> = {
                code: 404,
                messages: 'Véhicule non trouvé',
            };
            res.status(404).json(response);
        }
    } catch (error: any) {
        res.status(500).json({
            code: 500,
            messages: 'Erreur interne du serveur'
        });
    }
};

export const handleDeleteVehicule = async (req: Request, res: Response) => {
    try {
        await deleteVehicule(req.params.id);
        const response: BaseResponse<null> = {
            code: 204,
            messages: 'Véhicule supprimé avec succès',
        };
        res.status(204).json(response);
    } catch (error: any) {
        res.status(500).json({
            code: 500,
            messages: 'Erreur interne du serveur'
        });
    }
};


export const handleGetVehiculesByUserId = async (req: Request, res: Response) => {
    const userId = req.params.userId;

    try {
        const vehicules: Vehicule[] = await getVehiculesByUserId(userId);
        const response: BaseResponse<typeof vehicules> = {
            code: 200,
            messages: 'Véhicules récupérés avec succès',
            data: vehicules,
        };
        res.status(200).json(response);
    } catch (error: any) {
        res.status(500).json({
            code: 500,
            messages: 'Erreur interne du serveur',
        });
    }
};
