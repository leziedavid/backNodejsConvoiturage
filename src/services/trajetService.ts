import prisma from '../Conn';
import { Trajet, Prisma } from '@prisma/client';

export const createTrajet = async (trajetData: any): Promise<Trajet> => {
    const { utilisateur_id, vehicule_id, point_depart, ville_depart, point_arrivee, ville_arrivee, temps_depart_prevu, temps_arrivee_prevu, ...restOfData } = trajetData;

    if (!utilisateur_id) throw new Error('Utilisateur ID is required');

    return prisma.trajet.create({
        data: {
            utilisateur: { connect: { id: utilisateur_id } },
            vehicule: { connect: { id: vehicule_id } },
            point_depart,
            ville_depart,
            point_arrivee,
            ville_arrivee,
            temps_depart_prevu,
            temps_arrivee_prevu,
            ...restOfData,
        },
    });
};

export const updateTrajet = async (trajetId: string, trajetData: any): Promise<Trajet> => {
    const { utilisateur_id, vehicule_id, point_depart, ville_depart, point_arrivee, ville_arrivee, temps_depart_prevu, temps_arrivee_prevu, ...restOfData } = trajetData;

    const trajet = await prisma.trajet.findUnique({ where: { id: trajetId } });
    if (!trajet) throw new Error('Trajet not found');

    const updateData: Prisma.TrajetUpdateInput = { ...restOfData };

    if (utilisateur_id) {
        updateData.utilisateur = { connect: { id: utilisateur_id } };
    }

    if (vehicule_id) {
        updateData.vehicule = { connect: { id: vehicule_id } };
    }

    return prisma.trajet.update({
        where: { id: trajetId },
        data: {
            ...updateData,
            point_depart,
            ville_depart,
            point_arrivee,
            ville_arrivee,
            temps_depart_prevu,
            temps_arrivee_prevu,
        },
    });
};

export const getTrajets = async (): Promise<Trajet[]> => {
    return prisma.trajet.findMany();
};

export const getTrajetById = async (id: string): Promise<Trajet | null> => {
    return prisma.trajet.findUnique({
        where: { id },
        include: {
            commandes: true,
            vehicule: true, // Inclure le véhicule si nécessaire
        },
    });
};

export const deleteTrajet = async (id: string): Promise<void> => {
    await prisma.trajet.delete({ where: { id } });
};

export const searchTrajets = async (filters: {point_depart: { lat: number; lon: number };point_arrivee: { lat: number; lon: number }; temps_depart_prevu: string; nombre_de_places: number;}): Promise<Trajet[]> => {
    
    const { point_depart, point_arrivee, temps_depart_prevu, nombre_de_places } = filters;
    const dateDepartPrevu = new Date(temps_depart_prevu);

    // Rechercher les trajets avec des critères de base
    let trajets = await prisma.trajet.findMany({
        where: { temps_depart_prevu: { gte: dateDepartPrevu }, nombre_de_places: { gte: nombre_de_places }},
        include: {
            utilisateur: true,
            arrets: true,
            commandes: true,
            vehicule: true, // Inclure le véhicule si nécessaire
        },
    });

    // Filtrer les trajets basés sur les coordonnées si disponibles
    trajets = trajets.filter(trajet => {
        // Assurer que les points de départ et d'arrivée existent et sont valides
        if (trajet.point_depart && trajet.point_arrivee) {
            const pointDepartTrajet = JSON.parse(trajet.point_depart as unknown as string);
            const pointArriveeTrajet = JSON.parse(trajet.point_arrivee as unknown as string);
            const isWithinLatitudeRange = pointDepartTrajet.lat <= point_depart.lat && pointArriveeTrajet.lat >= point_arrivee.lat;
            const isWithinLongitudeRange = pointDepartTrajet.lon <= point_depart.lon && pointArriveeTrajet.lon >= point_arrivee.lon;
            return isWithinLatitudeRange && isWithinLongitudeRange;
        }
        // Si les coordonnées ne sont pas disponibles, ne pas inclure le trajet
        return false;
    });

    return trajets;
};


export const getDriverTrajet = async (conducteurId: string): Promise<Trajet[]> => {
    console.log(`Fetching commandes for conducteurId: ${conducteurId}`);
    
    const trajets = await prisma.trajet.findMany({
        where: { utilisateur_id: conducteurId },
        orderBy: {
            created_at: 'desc',
        },
        include: {
            commandes: true,
            utilisateur: true,
            vehicule: true,
        },
    });

    console.log(`Commandes fetched: ${trajets.length}`);
    return trajets;
};


