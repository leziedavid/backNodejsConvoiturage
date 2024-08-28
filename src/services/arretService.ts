// src/services/arretService.ts
import prisma from '../Conn';
import { Arret, Prisma } from '@prisma/client';

export const createArret = async (arretData: any): Promise<Arret> => {
    const { trajet_id, ville, nom, ...restOfData } = arretData;

    if (!trajet_id) throw new Error('Trajet ID is required');

    return prisma.arret.create({
        data: {
            trajet: { connect: { id: trajet_id } },
            ville,
            nom,
            ...restOfData,
        },
    });
};

export const updateArret = async (arretId: string, arretData: any): Promise<Arret> => {
    const { trajet_id, ville, nom, ...restOfData } = arretData;

    const arret = await prisma.arret.findUnique({ where: { id: arretId } });
    if (!arret) throw new Error('Arret not found');

    const updateData: Prisma.ArretUpdateInput = { ...restOfData };

    if (trajet_id) {
        updateData.trajet = { connect: { id: trajet_id } };
    }

    return prisma.arret.update({
        where: { id: arretId },
        data: {
            ...updateData,
            ville,
            nom,
        },
    });
};

export const getArrets = async (): Promise<Arret[]> => {
    return prisma.arret.findMany();
};

export const getArretById = async (id: string): Promise<Arret | null> => {
    return prisma.arret.findUnique({
        where: { id },
        include: {
            trajet: true, // Inclure les relations pertinentes si nécessaire
        },
    });
};

export const deleteArret = async (id: string): Promise<void> => {
    await prisma.arret.delete({ where: { id } });
};
