// src/controllers/plansTarifairesController.ts
import { Request, Response } from 'express';
import {
    createPlanTarifaire,
    updatePlanTarifaire,
    getPlansTarifaires,
    getPlanTarifaireById,
    deletePlanTarifaire,
} from '../services/plansTarifairesService';
import { createPlansTarifairesSchema, updatePlansTarifairesSchema } from '../validation/plansTarifairesValidation';

export const handleCreatePlanTarifaire = async (req: Request, res: Response) => {
    try {
        const planData = createPlansTarifairesSchema.parse(req.body);
        const newPlan = await createPlanTarifaire(planData);
        res.status(201).json(newPlan);
    } catch (error: any) {
        res.status(400).json({ error: error.errors ? error.errors.map((e: any) => e.message).join(', ') : error.message });
    }
};

export const handleUpdatePlanTarifaire = async (req: Request, res: Response) => {
    try {
        const planData = updatePlansTarifairesSchema.parse(req.body);
        const updatedPlan = await updatePlanTarifaire(req.params.id, planData);
        res.status(200).json(updatedPlan);
    } catch (error: any) {
        res.status(400).json({ error: error.errors ? error.errors.map((e: any) => e.message).join(', ') : error.message });
    }
};

export const handleGetPlansTarifaires = async (req: Request, res: Response) => {
    try {
        const plans = await getPlansTarifaires();
        res.status(200).json(plans);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const handleGetPlanTarifaireById = async (req: Request, res: Response) => {
    try {
        const plan = await getPlanTarifaireById(req.params.id);
        if (!plan) return res.status(404).json({ error: 'Plan tarifaire non trouvé' });
        res.status(200).json(plan);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const handleDeletePlanTarifaire = async (req: Request, res: Response) => {
    try {
        await deletePlanTarifaire(req.params.id);
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
