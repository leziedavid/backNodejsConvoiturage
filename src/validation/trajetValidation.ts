import { z } from 'zod';

// Validation pour un arrêt
const arretSchema = z.object({
    lat: z.number().min(-90, 'Latitude must be between -90 and 90').max(90, 'Latitude must be between -90 and 90'),
    lon: z.number().min(-180, 'Longitude must be between -180 and 180').max(180, 'Longitude must be between -180 and 180'),
    ville: z.string().min(1, 'City is required'),
});

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
    vehicule_id: z.string().uuid('Invalid Vehicle ID format'), // ID du véhicule associé
    arrets: z.array(arretSchema).optional(), // Validation des arrêts
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
    temps_depart_prevu: z.union([
        z.date(),
        z.string().refine(val => !isNaN(Date.parse(val)), {
            message: 'Invalid date format',
        })
    ]).optional(),
    temps_arrivee_prevu: z.union([
        z.date(),
        z.string().refine(val => !isNaN(Date.parse(val)), {
            message: 'Invalid date format',
        })
    ]).optional(),
    duree_estimee: z.number().min(0, 'Estimated duration must be a positive number').optional(),
    distance_estimee: z.union([
        z.number().min(0, 'Estimated distance must be a positive number'),
        z.string().refine(val => !isNaN(parseFloat(val)), {
            message: 'Invalid distance format',
        })
    ]).optional(),
    etat_trajet: z.string().min(1, 'Trip status is required').optional(),
    historique_position: z.array(z.object({
        lat: z.number().min(-90, 'Latitude must be between -90 and 90').max(90, 'Latitude must be between -90 and 90'),
        lon: z.number().min(-180, 'Longitude must be between -180 and 180').max(180, 'Longitude must be between -180 and 180'),
        timestamp: z.union([
            z.date(),
            z.string().refine(val => !isNaN(Date.parse(val)), {
                message: 'Invalid date format for timestamp',
            })
        ])
    })).optional(),
    mode_transport: z.string().min(1, 'Transport mode is required').optional(),
    nombre_de_places: z.number().min(1, 'Number of seats must be at least 1').optional(),
    price: z.union([
        z.number(),
        z.string().refine(val => !isNaN(parseFloat(val)), {
            message: 'Invalid price format',
        })
    ]).optional(),
    vehicule_id: z.string().uuid('Invalid Vehicle ID format').optional(), // ID du véhicule associé
    arrets: z.array(arretSchema).optional(), // Validation des arrêts
});


// Validation pour obtenir un trajet par ID
export const getTrajetByIdSchema = z.object({
    id: z.string().min(1, 'Trip ID is required'),
});

// Validation pour rechercher un trajet
export const searchTrajetSchema = z.object({
    point_depart: z.object({
        lat: z.number()
            .min(-90, 'La latitude du point de départ doit être entre -90 et 90.')
            .max(90, 'La latitude du point de départ doit être entre -90 et 90.'),
        lon: z.number()
            .min(-180, 'La longitude du point de départ doit être entre -180 et 180.')
            .max(180, 'La longitude du point de départ doit être entre -180 et 180.'),
    }),
    point_arrivee: z.object({
        lat: z.number()
            .min(-90, 'La latitude du point d\'arrivée doit être entre -90 et 90.')
            .max(90, 'La latitude du point d\'arrivée doit être entre -90 et 90.'),
        lon: z.number()
            .min(-180, 'La longitude du point d\'arrivée doit être entre -180 et 180.')
            .max(180, 'La longitude du point d\'arrivée doit être entre -180 et 180.'),
    }),
    
    temps_depart_prevu: z.string()
        .refine(val => !isNaN(Date.parse(val)), {
            message: 'Le format de la date de départ est invalide.',
        }),
    nombre_de_places: z.number()
        .int({ message: 'Le nombre de places doit être un entier.' })
        .min(1, { message: 'Le nombre de places doit être au moins 1.' }),
        
    page: z.number().optional().default(1), // Paramètre optionnel pour la page
    limit: z.number().optional().default(10) // Paramètre optionnel pour la limite par page
});


// Schéma de validation pour les données de mise à jour
export const  updateTrajetDetailsSchema = z.object({
    temps_depart_prevu: z.string().optional().transform(value => value ? new Date(value) : undefined),
    temps_arrivee_prevu: z.string().optional().transform(value => value ? new Date(value) : undefined),
    nombre_de_places: z.number().int().optional(),
    price: z.union([z.string(), z.number()]).optional().transform(value => typeof value === 'string' ? parseFloat(value) : value),
    vehicule_id: z.string().optional(),
});
