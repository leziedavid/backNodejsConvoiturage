// src/services/plansTarifairesService.ts
import prisma from '../Conn';
import { PlansTarifaires } from '@prisma/client';

export const createPlanTarifaire = async (planData: any): Promise<PlansTarifaires> => {
    return prisma.plansTarifaires.create({
        data: planData,
    });
};

export const updatePlanTarifaire = async (id: string, planData: any): Promise<PlansTarifaires> => {
    const plan = await prisma.plansTarifaires.findUnique({ where: { id } });
    if (!plan) throw new Error('Plan tarifaire non trouvé');

    return prisma.plansTarifaires.update({
        where: { id },
        data: planData,
    });
};

export const getPlansTarifaires = async (): Promise<PlansTarifaires[]> => {
    return prisma.plansTarifaires.findMany();
};

export const getPlanTarifaireById = async (id: string): Promise<PlansTarifaires | null> => {
    return prisma.plansTarifaires.findUnique({ where: { id } });
};

export const deletePlanTarifaire = async (id: string): Promise<void> => {
    await prisma.plansTarifaires.delete({ where: { id } });
};
