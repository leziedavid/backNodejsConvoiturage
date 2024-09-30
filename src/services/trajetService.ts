import { Arret, Prisma, Trajet } from '@prisma/client';
import { isPointWithinRadius } from 'geolib';
import prisma from '../Conn';
import { paginate, PaginationOptions } from './allPaginations/trajetPaginate';


// Définir le type pour un trajet avec arrets
type TrajetWithArrets = Trajet & {
    arrets: Arret[];
};


type TrajetData = {
    utilisateur_id: string;
    point_depart: { lat: number; lon: number; };
    ville_depart: string;
    point_arrivee: { lat: number; lon: number; };
    ville_arrivee: string;
    temps_depart_prevu: Date;
    temps_arrivee_prevu: Date;
    duree_estimee: number;
    distance_estimee: number;
    etat_trajet: string;
    historique_position?: { lat: number; lon: number; timestamp: Date; }[];
    mode_transport: string;
    nombre_de_places: number;
    price?: number;
    vehicule_id: string; // Non optionnel
    arrets?: { lat: number; lon: number; ville: string; }[];
};

type TrajetUpdateDetails = {
    temps_depart_prevu?: Date;
    temps_arrivee_prevu?: Date;
    nombre_de_places?: number;
    price?: number;
    vehicule_id?: string; // ID du véhicule à mettre à jour
};

export const createTrajet = async (trajetData: TrajetData): Promise<any> => {
    const {
        utilisateur_id,
        vehicule_id,
        point_depart,
        ville_depart,
        point_arrivee,
        ville_arrivee,
        temps_depart_prevu,
        temps_arrivee_prevu,
        duree_estimee,
        distance_estimee,
        etat_trajet,
        historique_position,
        mode_transport,
        nombre_de_places,
        price,
        arrets
    } = trajetData;

    if (!utilisateur_id) throw new Error('Utilisateur ID is required');


    // Construire les données pour Prisma
    const data: Prisma.TrajetCreateInput = {
        utilisateur: { connect: { id: utilisateur_id } },
        vehicule: { connect: { id: vehicule_id } },
        point_depart,
        ville_depart,
        point_arrivee,
        ville_arrivee,
        temps_depart_prevu,
        temps_arrivee_prevu,
        duree_estimee,
        distance_estimee,
        etat_trajet,
        historique_position,
        mode_transport,
        nombre_de_places,
        price,
        arrets: arrets ? {
            create: arrets.map(arret => ({
                nom: { lat: arret.lat, lon: arret.lon }, // Assurez-vous que le champ 'nom' est correctement défini
                ville: arret.ville,
            })),
        } : undefined, // Exclure 'arrets' s'il est undefined
    };

    // Utiliser Prisma pour créer le trajet
    return prisma.trajet.create({
        data,
    });
};

export const updateTrajet = async (trajetId: string, trajetData: Partial<TrajetData>): Promise<any> => {
    if (!trajetId) throw new Error('Trajet ID is required');

    // Vérifier si le trajet existe
    const trajet = await prisma.trajet.findUnique({ where: { id: trajetId } });
    if (!trajet) throw new Error('Trajet not found');

    // Construire les données pour la mise à jour
    const updateData: Prisma.TrajetUpdateInput = {
        ...(trajetData.utilisateur_id && { utilisateur: { connect: { id: trajetData.utilisateur_id } } }),
        ...(trajetData.vehicule_id && { vehicule: { connect: { id: trajetData.vehicule_id } } }),
        ...(trajetData.point_depart && { point_depart: trajetData.point_depart }),
        ...(trajetData.ville_depart && { ville_depart: trajetData.ville_depart }),
        ...(trajetData.point_arrivee && { point_arrivee: trajetData.point_arrivee }),
        ...(trajetData.ville_arrivee && { ville_arrivee: trajetData.ville_arrivee }),
        ...(trajetData.temps_depart_prevu && { temps_depart_prevu: trajetData.temps_depart_prevu }),
        ...(trajetData.temps_arrivee_prevu && { temps_arrivee_prevu: trajetData.temps_arrivee_prevu }),
        ...(trajetData.duree_estimee !== undefined && { duree_estimee: trajetData.duree_estimee }),
        ...(trajetData.distance_estimee !== undefined && { distance_estimee: trajetData.distance_estimee }),
        ...(trajetData.etat_trajet && { etat_trajet: trajetData.etat_trajet }),
        ...(trajetData.historique_position && { historique_position: trajetData.historique_position }),
        ...(trajetData.mode_transport && { mode_transport: trajetData.mode_transport }),
        ...(trajetData.nombre_de_places !== undefined && { nombre_de_places: trajetData.nombre_de_places }),
        ...(trajetData.price !== undefined && { price: trajetData.price }),
        ...(trajetData.arrets && {
            arrets: {
                updateMany: trajetData.arrets.map(arret => ({
                    where: { /* Critères pour trouver l'arret existant, par exemple { lat: arret.lat, lon: arret.lon } */ },
                    data: {
                        lat: arret.lat,
                        lon: arret.lon,
                        ville: arret.ville,
                    },
                })),
            },
        }),
    };

    // Utiliser Prisma pour mettre à jour le trajet
    return prisma.trajet.update({
        where: { id: trajetId },
        data: updateData,
    });
};

export const updateTrajetDetails = async (trajetId: string, details: TrajetUpdateDetails): Promise<any> => {
    if (!trajetId) throw new Error('Trajet ID is required');

    const trajet = await prisma.trajet.findUnique({ where: { id: trajetId } });
    if (!trajet) throw new Error('Trajet not found');

    const updateData: Prisma.TrajetUpdateInput = {
        ...(details.temps_depart_prevu && { temps_depart_prevu: details.temps_depart_prevu }),
        ...(details.temps_arrivee_prevu && { temps_arrivee_prevu: details.temps_arrivee_prevu }),
        ...(details.nombre_de_places !== undefined && { nombre_de_places: details.nombre_de_places }),
        ...(details.price !== undefined && { price: details.price }),
        ...(details.vehicule_id && { vehicule: { connect: { id: details.vehicule_id } } }),
    };

    return prisma.trajet.update({
        where: { id: trajetId },
        data: updateData,
    });
};


export const getTrajetById = async (id: string): Promise<Trajet | null> => {
    return prisma.trajet.findUnique({
        where: { id },
        include: {
            commandes: true,
            utilisateur: true,
            vehicule: true,
            arrets : true,
        },
    });
};

export const getAllTrajets = async (options: PaginationOptions): Promise<{ data: Trajet[]; total: number }> => {
    return paginate(
        (args) => prisma.trajet.findMany({
            ...args,
            orderBy: { created_at: 'desc' },
            include: {
                commandes: true,
                utilisateur: true,
                vehicule: true,
            },
        }),
        options
    );
};

export const getDriverTrajet = async (
    conducteurId: string,
    options: PaginationOptions
): Promise<{ data: Trajet[]; total: number }> => {
    return paginate(
        (args) => prisma.trajet.findMany({
            where: { utilisateur_id: conducteurId },
            orderBy: { created_at: 'desc' },
            include: {
                commandes: true,
                utilisateur: true,
                vehicule: true,
            },
            ...args,
        }),
        options
    );
};

// Fonction pour vérifier si un point est entre deux autres points
const isPointBetween = (point: { lat: number; lon: number }, start: { lat: number; lon: number }, end: { lat: number; lon: number }): boolean => {
    return (
        point.lat >= Math.min(start.lat, end.lat) &&
        point.lat <= Math.max(start.lat, end.lat) &&
        point.lon >= Math.min(start.lon, end.lon) &&
        point.lon <= Math.max(start.lon, end.lon)
    );
};

export const searchTrajetsService = async (filters: {
    
    point_depart: { lat: number; lon: number };
    point_arrivee: { lat: number; lon: number };
    temps_depart_prevu: string;
    nombre_de_places: number;
    page?: number;
    limit?: number;
}): Promise<{ trajets: any[]; total: number }> => {
    const { point_depart, point_arrivee, temps_depart_prevu, nombre_de_places, page = 1, limit = 10 } = filters;
    const dateDepartPrevu = new Date(temps_depart_prevu);

    try {
        // Récupérer tous les trajets avec leurs arrêts
        const trajets = await prisma.trajet.findMany({
            where: {
                temps_depart_prevu: { gte: dateDepartPrevu },
                nombre_de_places: { gte: nombre_de_places }
            },
            orderBy: { created_at: 'desc' },
            include: {
                utilisateur: true,
                arrets: true,
                commandes: true,
                vehicule: true
            }
        });

        // Filtrer les trajets basés sur les points d'arrêt
        const filteredTrajets = trajets.filter(trajet => {
            if (trajet.point_depart && trajet.point_arrivee) {
                let pointDepartTrajet, pointArriveeTrajet;

                try {
                    pointDepartTrajet = typeof trajet.point_depart === 'string' ? JSON.parse(trajet.point_depart) : trajet.point_depart;
                    pointArriveeTrajet = typeof trajet.point_arrivee === 'string' ? JSON.parse(trajet.point_arrivee) : trajet.point_arrivee;
                } catch (error) {
                    console.error(`Erreur lors du parsing des coordonnées du trajet ${trajet.id}: ${error}`);
                    return false;
                }

                const isWithinDistance = isPointWithinRadius(point_depart, pointDepartTrajet, 5000) && isPointWithinRadius(point_arrivee, pointArriveeTrajet, 5000);

                const hasValidArrets = trajet.arrets.some(arret => {
                    try {
                        const arretPoint = typeof arret.nom === 'string' ? JSON.parse(arret.nom) : arret.nom;
                        return isPointBetween(arretPoint, point_depart, point_arrivee);
                    } catch (error) {
                        console.error(`Erreur lors du parsing des coordonnées d'arrêt ${arret.id}: ${error}`);
                        return false;
                    }
                });

                return isWithinDistance || hasValidArrets;
            }
            return false;
        });

        if (filteredTrajets.length === 0) {
            const randomTrajets = await prisma.trajet.findMany({
                take: limit,
                orderBy: { created_at: 'desc' },
                include: {
                    utilisateur: true,
                    arrets: true,
                    commandes: true,
                    vehicule: true
                }
            });

            return { trajets: randomTrajets, total: randomTrajets.length };
        }

        return { trajets: filteredTrajets, total: filteredTrajets.length };
    } catch (error) {
        console.error('Erreur lors de la recherche des trajets:', error);
        throw new Error('Erreur lors de la recherche des trajets');
    }
};

export const searchTrajets = async (filters: {
    point_depart: { lat: number; lon: number };
    point_arrivee: { lat: number; lon: number };
    temps_depart_prevu: string;
    nombre_de_places: number;
    page?: number; // Paramètre optionnel pour la page
    limit?: number; // Paramètre optionnel pour la limite par page
}): Promise<{ trajets: Trajet[]; total: number }> => {
    const { point_depart, point_arrivee, temps_depart_prevu, nombre_de_places, page = 1, limit = 10 } = filters;
    const dateDepartPrevu = new Date(temps_depart_prevu);
    // Fonction de requête pour pagination
    const query = (args: any) => prisma.trajet.findMany({
        ...args,
        where: {
            temps_depart_prevu: { gte: dateDepartPrevu },
            nombre_de_places: { gte: nombre_de_places }
        },
        orderBy: { created_at: 'desc' },
        include: {
            utilisateur: true,
            arrets: true,
            commandes: true,
            vehicule: true
        }
    });

    // Filtrer les trajets basés sur les coordonnées si disponibles
    const { data: trajets, total } = await paginate(query, { page, limit });

    const filteredTrajets = trajets.filter(trajet => {
        if (trajet.point_depart && trajet.point_arrivee) {
            const pointDepartTrajet = trajet.point_depart as { lat: number; lon: number }; // Assumer que c'est déjà un objet
            const pointArriveeTrajet = trajet.point_arrivee as { lat: number; lon: number }; // Assumer que c'est déjà un objet

            // Comparer les coordonnées
            const isWithinLatitudeRange = pointDepartTrajet.lat <= point_depart.lat && pointArriveeTrajet.lat >= point_arrivee.lat;
            const isWithinLongitudeRange = pointDepartTrajet.lon <= point_depart.lon && pointArriveeTrajet.lon >= point_arrivee.lon;

            return isWithinLatitudeRange && isWithinLongitudeRange;
        }
        return false;
    });

    return { trajets: filteredTrajets, total };
};

export const deleteTrajet = async (id: string): Promise<void> => {
    await prisma.trajet.delete({ where: { id } });
};



export const updateTrajetStatus = async (trajetId: string, newStatus: string): Promise<Trajet> => {
    try {
        // Vérifiez que le trajet existe
        const existingTrajet = await prisma.trajet.findUnique({
            where: { id: trajetId },
        });

        if (!existingTrajet) {
            throw new Error('Trajet not found');
        }

        // Mettre à jour l'état du trajet
        const updatedTrajet = await prisma.trajet.update({
            where: { id: trajetId },
            data: { etat_trajet: newStatus },
        });

        return updatedTrajet;
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error('Error updating trajet status:', err);
            throw new Error('Internal server error');
        }
        throw new Error('Internal server error');
    }
};
