// src/controllers/trajetController.ts
import { Request, Response } from 'express';
import { BaseResponse } from '../interfaces/BaseResponse';
import * as trajetService from '../services/trajetService';
import { z } from 'zod';
import { createTrajetSchema, updateTrajetSchema, getTrajetByIdSchema, searchTrajetSchema, updateTrajetDetailsSchema } from '../validation/trajetValidation';
import jwt from 'jsonwebtoken';
import { Trajet } from '@prisma/client';


interface DecodedToken {
    id: string;
    exp: number;
}

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

export const createTrajet = async (req: Request, res: Response) => {

    try {

        // Valider les données de la requête
        const parsedBody = createTrajetSchema.parse(req.body);
        // Convertir les chaînes de caractères en objets Date si nécessaire
        const convertToDate = (date: string | Date) => {
            return typeof date === 'string' ? new Date(date) : date;
        };

        const dataToSave = {
            ...parsedBody,
            temps_depart_prevu: convertToDate(parsedBody.temps_depart_prevu),
            temps_arrivee_prevu: convertToDate(parsedBody.temps_arrivee_prevu),
        };

        // Utiliser le service pour créer un trajet
        const newTrajet = await trajetService.createTrajet(dataToSave);

        // Construire la réponse
        const response = {
            code: 201,
            messages: 'Trajet created successfully',
            data: newTrajet,
        };

        // Envoyer la réponse
        res.status(201).json(response);

    } catch (error) {
        // Gérer les erreurs de validation
        if (error instanceof z.ZodError) {
            const errors = error.errors.map(e => `${e.path.join('.')} : ${e.message}`).join(', ');
            const response = {
                code: 400,
                messages: errors,
            };
            return res.status(400).json(response);
        }
        // Gérer les autres erreurs
        console.error(error);
        const response = {
            code: 500,
            messages: 'Internal server error',
        };
        res.status(500).json(response);
    }
};


// Fonction utilitaire pour convertir les dates
const convertToDate = (date: string | Date | undefined): Date | undefined => {
    return typeof date === 'string' ? new Date(date) : date;
};

// Fonction utilitaire pour convertir les chaînes en nombres
const convertToNumber = (value: string | number | undefined): number | undefined => {
    if (typeof value === 'string') {
        const num = parseFloat(value);
        return isNaN(num) ? undefined : num;
    }
    return value;
};

export const updateTrajet = async (req: Request, res: Response) => {
    try {
        // Valider les données de la requête
        const parsedBody = updateTrajetSchema.parse(req.body);

        // Préparer les données pour la mise à jour
        const dataToUpdate: Partial<TrajetData> = {
            ...(parsedBody.utilisateur_id && { utilisateur_id: parsedBody.utilisateur_id }),
            ...(parsedBody.vehicule_id && { vehicule_id: parsedBody.vehicule_id }),
            ...(parsedBody.point_depart && { point_depart: parsedBody.point_depart }),
            ...(parsedBody.ville_depart && { ville_depart: parsedBody.ville_depart }),
            ...(parsedBody.point_arrivee && { point_arrivee: parsedBody.point_arrivee }),
            ...(parsedBody.ville_arrivee && { ville_arrivee: parsedBody.ville_arrivee }),
            ...(parsedBody.temps_depart_prevu && { temps_depart_prevu: convertToDate(parsedBody.temps_depart_prevu) }),
            ...(parsedBody.temps_arrivee_prevu && { temps_arrivee_prevu: convertToDate(parsedBody.temps_arrivee_prevu) }),
            ...(parsedBody.duree_estimee !== undefined && { duree_estimee: convertToNumber(parsedBody.duree_estimee) }),
            ...(parsedBody.distance_estimee !== undefined && { distance_estimee: convertToNumber(parsedBody.distance_estimee) }),
            ...(parsedBody.etat_trajet && { etat_trajet: parsedBody.etat_trajet }),
            ...(parsedBody.historique_position && {
                historique_position: parsedBody.historique_position.map(pos => ({
                    ...pos,
                    timestamp: convertToDate(pos.timestamp) || new Date(), // Utiliser une valeur par défaut pour éviter `undefined`
                })),
            }),
            ...(parsedBody.mode_transport && { mode_transport: parsedBody.mode_transport }),
            ...(parsedBody.nombre_de_places !== undefined && { nombre_de_places: convertToNumber(parsedBody.nombre_de_places) }),
            ...(parsedBody.price !== undefined && { price: convertToNumber(parsedBody.price) }),
            ...(parsedBody.arrets && {
                arrets: parsedBody.arrets.map(arret => ({
                    lat: arret.lat,
                    lon: arret.lon,
                    ville: arret.ville,
                })),
            }),
        };

        // Utiliser le service pour mettre à jour le trajet
        const updatedTrajet = await trajetService.updateTrajet(req.params.id, dataToUpdate);

        // Construire la réponse
        const response: BaseResponse<typeof updatedTrajet> = {
            code: 200,
            messages: 'Trajet updated successfully',
            data: updatedTrajet,
        };

        // Envoyer la réponse
        res.status(200).json(response);

    } catch (error) {
        // Gérer les erreurs de validation
        if (error instanceof z.ZodError) {
            const response: BaseResponse<null> = {
                code: 400,
                messages: error.errors.map(e => e.message).join(', '),
            };
            return res.status(400).json(response);
        }
        // Gérer les autres erreurs
        console.error(error);
        const response: BaseResponse<null> = {
            code: 500,
            messages: 'Internal server error',
        };
        res.status(500).json(response);
    }
};


export const updateTrajetDetailsController = async (req: Request, res: Response) => {
    try {
        // Valider les données de la requête
        const parsedBody = updateTrajetDetailsSchema.parse(req.body);

        // Utiliser le service pour mettre à jour le trajet
        const updatedTrajet = await trajetService.updateTrajetDetails(req.params.id, parsedBody);

        // Construire la réponse
        const response: BaseResponse<typeof updatedTrajet> = {
            code: 200,
            messages: 'Trajet details updated successfully',
            data: updatedTrajet,
        };

        // Envoyer la réponse
        res.status(200).json(response);

    } catch (error) {
        // Gérer les erreurs de validation
        if (error instanceof z.ZodError) {
            const response: BaseResponse<null> = {
                code: 400,
                messages: error.errors.map(e => e.message).join(', '),
            };
            return res.status(400).json(response);
        }
        // Gérer les autres erreurs
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
        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = parseInt(req.query.limit as string, 10) || 10;

        // Vérifiez si page et limit sont des nombres positifs
        if (page < 1 || limit < 1) {
            return res.status(400).json({
                code: 400,
                messages: 'Page and limit must be positive numbers.',
                data: null,
                total: 0,
            });
        }

        const options = { page, limit };
        const result = await trajetService.getAllTrajets(options);

        return res.status(200).json({
            code: 200,
            messages: 'Trajets récupérés avec succès.',
            data: result.data,
            total: result.total,
        });
    } catch (error) {
        return res.status(500).json({
            code: 500,
            messages: 'Erreur interne du serveur',
            data: null,
            total: 0,
        });
    }
};

// export const getTrajets1 = async (req: Request, res: Response) => {

//     try {
//         const trajets = await trajetService.getTrajets();
//         const response: BaseResponse<typeof trajets> = {
//             code: 200,
//             messages: 'Trajets retrieved successfully',
//             data: trajets,
//         };
//         res.json(response);
//     } catch (error) {
//         const response: BaseResponse<null> = {
//             code: 500,
//             messages: 'Internal server error',
//         };
//         res.status(500).json(response);
//     }
// };

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
        // Extraction des paramètres de pagination (si nécessaire)
        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = parseInt(req.query.limit as string, 10) || 10;

        // Vérifiez si page et limit sont des nombres positifs
        if (page < 1 || limit < 1) {
            return res.status(400).json({
                code: 400,
                messages: 'Page and limit must be positive numbers.',
                data: null,
                total: 0,
            });
        }

        // Validation du token
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({
                code: 401,
                messages: 'Token manquant',
                data: null,
            });
        }

        // Décoder le token
        const decodedToken = jwt.decode(token) as DecodedToken | null;

        if (!decodedToken) {
            return res.status(401).json({
                code: 401,
                messages: 'Token invalide',
                data: null,
            });
        }

        // Validation de l'id de trajet
        getTrajetByIdSchema.parse({ id });

        // Récupérer les trajets avec pagination (admettant que cette fonction pourrait être modifiée pour inclure des options)
        const options = { page, limit };
        const trajet = await trajetService.getDriverTrajet(id, options);

        if (trajet) {
            return res.status(200).json({
                code: 200,
                messages: 'Trajet récupéré avec succès',
                data: trajet.data,
                total: trajet.total,
            });
        } else {
            return res.status(404).json({
                code: 404,
                messages: 'Trajet non trouvé',
                data: null,
            });
        }
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                code: 400,
                messages: error.errors.map(e => e.message).join(', '),
                data: null,
            });
        } else if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                code: 401,
                messages: 'Token invalide',
                data: null,
            });
        } else {
            return res.status(500).json({
                code: 500,
                messages: 'Erreur interne du serveur',
                data: null,
            });
        }
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
        // Valider les paramètres de requête avec le schéma Zod
        searchTrajetSchema.parse(req.body);

        // Extraire les paramètres de la requête
        const { point_depart, point_arrivee, temps_depart_prevu, nombre_de_places, page, limit } = req.body;

        // Assurez-vous que la date est valide
        const parsedTempsDepartPrevu = new Date(temps_depart_prevu);
        if (isNaN(parsedTempsDepartPrevu.getTime())) {
            return res.status(400).json({
                code: 400,
                messages: 'Invalid date format for temps_depart_prevu.',
            });
        }

        // Appeler le service de recherche avec les paramètres
        const result = await trajetService.searchTrajetsService({
            point_depart,
            point_arrivee,
            temps_depart_prevu,
            nombre_de_places,
            page,
            limit
        });

        // Vérifier que la réponse contient des trajets
        if (!result.trajets || result.trajets.length === 0) {
            return res.status(404).json({
                code: 404,
                messages: 'Aucun trajet trouvé correspondant aux critères.',
                data: [],
                total: 0
            });
        }

        // Répondre avec les trajets récupérés
        return res.status(200).json({
            code: 200,
            messages: 'Trajets récupérés avec succès.',
            data: result.trajets,
            total: result.total
        });

    } catch (error) {
        if (error instanceof z.ZodError) {
            // Gestion des erreurs de validation
            const response = {
                code: 400,
                messages: error.errors.map(e => e.message).join(', ')
            };
            return res.status(400).json(response);
        }
        console.error('Error searching trajets:', error);

        // Gestion des erreurs internes
        return res.status(500).json({
            code: 500,
            messages: 'Internal server error',
        });
    }
};

export const searchTrajets2 = async (req: Request, res: Response) => {
    try {
        // Valider les paramètres de requête avec le schéma Zod
        searchTrajetSchema.parse(req.body); // Utilisez `req.body` pour les données POST
        // Extraire les paramètres de la requête
        const { point_depart, point_arrivee, temps_depart_prevu, nombre_de_places, page, limit } = req.body;
        // Vérifier et valider les valeurs extraites
        if (!point_depart || !point_arrivee || !temps_depart_prevu || typeof nombre_de_places !== 'number' || typeof page !== 'number' || typeof limit !== 'number') {
            return res.status(400).json({
                code: 400,
                messages: 'Missing or invalid parameters.',
            });
        }
        // Assurez-vous que la date est valide
        const parsedTempsDepartPrevu = new Date(temps_depart_prevu);
        if (isNaN(parsedTempsDepartPrevu.getTime())) {
            return res.status(400).json({
                code: 400,
                messages: 'Invalid date format for temps_depart_prevu.',
            });
        }
        // Appeler le service de recherche avec les paramètres
        const result = await trajetService.searchTrajets({
            point_depart,          // Utilisez les valeurs directement
            point_arrivee,
            temps_depart_prevu,   // Passez la chaîne de caractères telle quelle
            nombre_de_places,
            page,
            limit
        });

        // Vérifier que la réponse contient des trajets
        if (!result.trajets || result.trajets.length === 0) {
            return res.status(404).json({
                code: 404,
                messages: 'Aucun trajet trouvé correspondant aux critères.',
                data: [],
                total: 0
            });
        }

        // Répondre avec les trajets récupérés
        return res.status(200).json({
            code: 200,
            messages: 'Trajets récupérés avec succès.',
            data: result.trajets,
            total: result.total
        });

    } catch (error) {
        if (error instanceof z.ZodError) {
            // Gestion des erreurs de validation
            const response = {
                code: 400,
                messages: error.errors.map(e => e.message).join(', ')
            };
            return res.status(400).json(response);
        }
        console.error('Error searching trajets:', error);

        // Gestion des erreurs internes
        return res.status(500).json({
            code: 500,
            messages: 'Internal server error',
        });
    }
};

// export const getTrajetDriverss = async (req: Request, res: Response) => {

//     const { id } = req.params;

//     try {

//         const token = req.headers.authorization?.split(' ')[1];
        
//         if (!token) {
//             return res.status(401).json({
//                 code: 401,
//                 messages: 'Token manquant',
//             });
//         }

//         // Décoder le token
//         const decodedToken = jwt.decode(token) as DecodedToken | null;

//         if (!decodedToken) {

//             throw new Error('Votre session a expiré, merci de vous reconnecter.');
//         }
        
//         const id = decodedToken.id;

//         getTrajetByIdSchema.parse({ id });

//         const trajet = await trajetService.getDriverTrajet(id);

//         if (trajet) {
//             const response: BaseResponse<typeof trajet> = {
//                 code: 200,
//                 messages: 'Trajet retrieved successfully',
//                 data: trajet,
//             };
//             res.json(response);
//         } else {
//             const response: BaseResponse<null> = {
//                 code: 404,
//                 messages: 'Trajet not found',
//             };
//             res.status(404).json(response);
//         }
//     } catch (error) {
//         if (error instanceof z.ZodError) {
//             const response: BaseResponse<null> = {
//                 code: 400,
//                 messages: error.errors.map(e => e.message).join(', '),
//             };
//             return res.status(400).json(response);
//         }
//         const response: BaseResponse<null> = {
//             code: 500,
//             messages: 'Internal server error',
//         };
//         res.status(500).json(response);
//     }

// };

