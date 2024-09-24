// src/services/vehiculeService.ts
import prisma from '../Conn';
import { Vehicule } from '@prisma/client';

// Créer un nouveau véhicule
export const createVehicule = async (vehiculeData: {
    utilisateur_id: string;
    marque: string;
    modele: string;
    annee: number;
    plaque: string;
    couleur?: string;
    permis?: string;
    carte_grise?: string;
}): Promise<Vehicule> => {
    return prisma.vehicule.create({
        data: vehiculeData,
    });
};

// Mettre à jour un véhicule existant
export const updateVehicule = async (id: string, vehiculeData: {
    utilisateur_id?: string;
    marque?: string;
    modele?: string;
    annee?: number;
    plaque?: string;
    couleur?: string;
    permis?: string;
    carte_grise?: string;
}): Promise<Vehicule> => {
    const vehicule = await prisma.vehicule.findUnique({ where: { id } });
    if (!vehicule) throw new Error('Véhicule non trouvé');

    return prisma.vehicule.update({
        where: { id },
        data: vehiculeData,
    });
};

// Récupérer tous les véhicules
export const getVehicules = async (): Promise<Vehicule[]> => {
    return prisma.vehicule.findMany();
};

// Récupérer un véhicule par ID
export const getVehiculeById = async (id: string): Promise<Vehicule | null> => {
    return prisma.vehicule.findUnique({
        where: { id },
    });
};

// Supprimer un véhicule
export const deleteVehicule = async (id: string): Promise<void> => {
    await prisma.vehicule.delete({ where: { id } });
};


export const getVehiculesByUserId = async (userId: string): Promise<Vehicule[]> => {

    try {
        const vehicules = await prisma.vehicule.findMany({
            where: {
                utilisateur_id: userId,
            },
        });
        return vehicules;

    } catch (error) {
        throw new Error('Erreur lors de la récupération des véhicules : ' + error);
    }
};
