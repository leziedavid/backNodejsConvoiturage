import { z } from 'zod';


// Validation pour la création d'un trajet
export const createTrajetSchema = z.object({
    utilisateur_id: z.string().uuid('Invalid User ID format'), // Utilisateur est requis et doit être un UUID
    point_depart: z.object({
        lat: z.number().min(-90, 'Latitude must be between -90 and 90').max(90, 'Latitude must be between -90 and 90'),
        lon: z.number().min(-180, 'Longitude must be between -180 and 180').max(180, 'Longitude must be between -180 and 180'),
    }),
    ville_depart: z.string().min(1, 'Departure city is required'),
    point_arrivee: z.object({
        lat: z.number().min(-90, 'Latitude must be between -90 and 90').max(90, 'Latitude must be between -90 and 90'),
        lon: z.number().min(-180, 'Longitude must be between -180 and 180').max(180, 'Longitude must be between -180 and 180'),
    }),
    ville_arrivee: z.string().min(1, 'Arrival city is required'),
    temps_depart_prevu: z.union([z.date(), z.string().refine(val => !isNaN(Date.parse(val)), {
        message: 'Invalid date format',
    })]),
    temps_arrivee_prevu: z.union([z.date(), z.string().refine(val => !isNaN(Date.parse(val)), {
        message: 'Invalid date format',
    })]),
    duree_estimee: z.number().min(0, 'Estimated duration must be a positive number'),
    distance_estimee: z.number().min(0, 'Estimated distance must be a positive number'),
    etat_trajet: z.string().min(1, 'Trip status is required'),
    historique_position: z.array(z.object({
        lat: z.number().min(-90, 'Latitude must be between -90 and 90').max(90, 'Latitude must be between -90 and 90'),
        lon: z.number().min(-180, 'Longitude must be between -180 and 180').max(180, 'Longitude must be between -180 and 180'),
        timestamp: z.date(),
    })).optional(),
    mode_transport: z.string().min(1, 'Transport mode is required'),
    nombre_de_places: z.number().min(1, 'Number of seats must be at least 1'),
    price: z.number().optional(),
    vehicule_id: z.string().uuid('Invalid Vehicle ID format').optional(), // ID du véhicule associé
});

// Validation pour la mise à jour d'un trajet
export const updateTrajetSchema = z.object({
    utilisateur_id: z.string().uuid('Invalid User ID format').optional(), // Utilisateur est optionnel
    point_depart: z.object({
        lat: z.number().min(-90, 'Latitude must be between -90 and 90').max(90, 'Latitude must be between -90 and 90'),
        lon: z.number().min(-180, 'Longitude must be between -180 and 180').max(180, 'Longitude must be between -180 and 180'),
    }).optional(),
    ville_depart: z.string().min(1, 'Departure city is required').optional(),
    point_arrivee: z.object({
        lat: z.number().min(-90, 'Latitude must be between -90 and 90').max(90, 'Latitude must be between -90 and 90'),
        lon: z.number().min(-180, 'Longitude must be between -180 and 180').max(180, 'Longitude must be between -180 and 180'),
    }).optional(),
    ville_arrivee: z.string().min(1, 'Arrival city is required').optional(),
    temps_depart_prevu: z.union([z.date(), z.string().refine(val => !isNaN(Date.parse(val)), {
        message: 'Invalid date format',
    })]).optional(),
    temps_arrivee_prevu: z.union([z.date(), z.string().refine(val => !isNaN(Date.parse(val)), {
        message: 'Invalid date format',
    })]).optional(),
    duree_estimee: z.number().min(0, 'Estimated duration must be a positive number').optional(),
    distance_estimee: z.number().min(0, 'Estimated distance must be a positive number').optional(),
    etat_trajet: z.string().min(1, 'Trip status is required').optional(),
    historique_position: z.array(z.object({
        lat: z.number().min(-90, 'Latitude must be between -90 and 90').max(90, 'Latitude must be between -90 and 90'),
        lon: z.number().min(-180, 'Longitude must be between -180 and 180').max(180, 'Longitude must be between -180 and 180'),
        timestamp: z.date(),
    })).optional(),
    mode_transport: z.string().min(1, 'Transport mode is required').optional(),
    nombre_de_places: z.number().min(1, 'Number of seats must be at least 1').optional(),
    price: z.number().optional(),
    vehicule_id: z.string().uuid('Invalid Vehicle ID format').optional(), // ID du véhicule associé
});


// Validation pour obtenir un trajet par ID
export const getTrajetByIdSchema = z.object({
    id: z.string().min(1, 'Trip ID is required'),
});

export const searchTrajetSchema = z.object({
    point_depart: z.object({
        lat: z.number().nonnegative('Latitude must be a non-negative number'),
        lon: z.number().nonnegative('Longitude must be a non-negative number'),
    }),
    point_arrivee: z.object({
        lat: z.number().nonnegative('Latitude must be a non-negative number'),
        lon: z.number().nonnegative('Longitude must be a non-negative number'),
    }),
    temps_depart_prevu: z.string().refine(val => !isNaN(Date.parse(val)), {
        message: 'Invalid date format',
    }),
    nombre_de_places: z.number().int().min(1, 'Number of places must be at least 1'),
});
