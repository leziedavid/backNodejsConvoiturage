"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTrajetDetailsSchema = exports.searchTrajetSchema = exports.getTrajetByIdSchema = exports.updateTrajetSchema = exports.createTrajetSchema = void 0;
const zod_1 = require("zod");
// Validation pour un arrêt
const arretSchema = zod_1.z.object({
    lat: zod_1.z.number().min(-90, 'Latitude must be between -90 and 90').max(90, 'Latitude must be between -90 and 90'),
    lon: zod_1.z.number().min(-180, 'Longitude must be between -180 and 180').max(180, 'Longitude must be between -180 and 180'),
    ville: zod_1.z.string().min(1, 'City is required'),
});
// Validation pour la création d'un trajet
exports.createTrajetSchema = zod_1.z.object({
    utilisateur_id: zod_1.z.string().uuid('Invalid User ID format'), // Utilisateur est requis et doit être un UUID
    point_depart: zod_1.z.object({
        lat: zod_1.z.number().min(-90, 'Latitude must be between -90 and 90').max(90, 'Latitude must be between -90 and 90'),
        lon: zod_1.z.number().min(-180, 'Longitude must be between -180 and 180').max(180, 'Longitude must be between -180 and 180'),
    }),
    ville_depart: zod_1.z.string().min(1, 'Departure city is required'),
    point_arrivee: zod_1.z.object({
        lat: zod_1.z.number().min(-90, 'Latitude must be between -90 and 90').max(90, 'Latitude must be between -90 and 90'),
        lon: zod_1.z.number().min(-180, 'Longitude must be between -180 and 180').max(180, 'Longitude must be between -180 and 180'),
    }),
    ville_arrivee: zod_1.z.string().min(1, 'Arrival city is required'),
    temps_depart_prevu: zod_1.z.union([zod_1.z.date(), zod_1.z.string().refine(val => !isNaN(Date.parse(val)), {
            message: 'Invalid date format',
        })]),
    temps_arrivee_prevu: zod_1.z.union([zod_1.z.date(), zod_1.z.string().refine(val => !isNaN(Date.parse(val)), {
            message: 'Invalid date format',
        })]),
    duree_estimee: zod_1.z.number().min(0, 'Estimated duration must be a positive number'),
    distance_estimee: zod_1.z.number().min(0, 'Estimated distance must be a positive number'),
    etat_trajet: zod_1.z.string().min(1, 'Trip status is required'),
    historique_position: zod_1.z.array(zod_1.z.object({
        lat: zod_1.z.number().min(-90, 'Latitude must be between -90 and 90').max(90, 'Latitude must be between -90 and 90'),
        lon: zod_1.z.number().min(-180, 'Longitude must be between -180 and 180').max(180, 'Longitude must be between -180 and 180'),
        timestamp: zod_1.z.date(),
    })).optional(),
    mode_transport: zod_1.z.string().min(1, 'Transport mode is required'),
    nombre_de_places: zod_1.z.number().min(1, 'Number of seats must be at least 1'),
    price: zod_1.z.number().optional(),
    vehicule_id: zod_1.z.string().uuid('Invalid Vehicle ID format'), // ID du véhicule associé
    arrets: zod_1.z.array(arretSchema).optional(), // Validation des arrêts
});
// Validation pour la mise à jour d'un trajet
exports.updateTrajetSchema = zod_1.z.object({
    utilisateur_id: zod_1.z.string().uuid('Invalid User ID format').optional(), // Utilisateur est optionnel
    point_depart: zod_1.z.object({
        lat: zod_1.z.number().min(-90, 'Latitude must be between -90 and 90').max(90, 'Latitude must be between -90 and 90'),
        lon: zod_1.z.number().min(-180, 'Longitude must be between -180 and 180').max(180, 'Longitude must be between -180 and 180'),
    }).optional(),
    ville_depart: zod_1.z.string().min(1, 'Departure city is required').optional(),
    point_arrivee: zod_1.z.object({
        lat: zod_1.z.number().min(-90, 'Latitude must be between -90 and 90').max(90, 'Latitude must be between -90 and 90'),
        lon: zod_1.z.number().min(-180, 'Longitude must be between -180 and 180').max(180, 'Longitude must be between -180 and 180'),
    }).optional(),
    ville_arrivee: zod_1.z.string().min(1, 'Arrival city is required').optional(),
    temps_depart_prevu: zod_1.z.union([
        zod_1.z.date(),
        zod_1.z.string().refine(val => !isNaN(Date.parse(val)), {
            message: 'Invalid date format',
        })
    ]).optional(),
    temps_arrivee_prevu: zod_1.z.union([
        zod_1.z.date(),
        zod_1.z.string().refine(val => !isNaN(Date.parse(val)), {
            message: 'Invalid date format',
        })
    ]).optional(),
    duree_estimee: zod_1.z.number().min(0, 'Estimated duration must be a positive number').optional(),
    distance_estimee: zod_1.z.union([
        zod_1.z.number().min(0, 'Estimated distance must be a positive number'),
        zod_1.z.string().refine(val => !isNaN(parseFloat(val)), {
            message: 'Invalid distance format',
        })
    ]).optional(),
    etat_trajet: zod_1.z.string().min(1, 'Trip status is required').optional(),
    historique_position: zod_1.z.array(zod_1.z.object({
        lat: zod_1.z.number().min(-90, 'Latitude must be between -90 and 90').max(90, 'Latitude must be between -90 and 90'),
        lon: zod_1.z.number().min(-180, 'Longitude must be between -180 and 180').max(180, 'Longitude must be between -180 and 180'),
        timestamp: zod_1.z.union([
            zod_1.z.date(),
            zod_1.z.string().refine(val => !isNaN(Date.parse(val)), {
                message: 'Invalid date format for timestamp',
            })
        ])
    })).optional(),
    mode_transport: zod_1.z.string().min(1, 'Transport mode is required').optional(),
    nombre_de_places: zod_1.z.number().min(1, 'Number of seats must be at least 1').optional(),
    price: zod_1.z.union([
        zod_1.z.number(),
        zod_1.z.string().refine(val => !isNaN(parseFloat(val)), {
            message: 'Invalid price format',
        })
    ]).optional(),
    vehicule_id: zod_1.z.string().uuid('Invalid Vehicle ID format').optional(), // ID du véhicule associé
    arrets: zod_1.z.array(arretSchema).optional(), // Validation des arrêts
});
// Validation pour obtenir un trajet par ID
exports.getTrajetByIdSchema = zod_1.z.object({
    id: zod_1.z.string().min(1, 'Trip ID is required'),
});
// Validation pour rechercher un trajet
exports.searchTrajetSchema = zod_1.z.object({
    point_depart: zod_1.z.object({
        lat: zod_1.z.number()
            .min(-90, 'La latitude du point de départ doit être entre -90 et 90.')
            .max(90, 'La latitude du point de départ doit être entre -90 et 90.'),
        lon: zod_1.z.number()
            .min(-180, 'La longitude du point de départ doit être entre -180 et 180.')
            .max(180, 'La longitude du point de départ doit être entre -180 et 180.'),
    }),
    point_arrivee: zod_1.z.object({
        lat: zod_1.z.number()
            .min(-90, 'La latitude du point d\'arrivée doit être entre -90 et 90.')
            .max(90, 'La latitude du point d\'arrivée doit être entre -90 et 90.'),
        lon: zod_1.z.number()
            .min(-180, 'La longitude du point d\'arrivée doit être entre -180 et 180.')
            .max(180, 'La longitude du point d\'arrivée doit être entre -180 et 180.'),
    }),
    temps_depart_prevu: zod_1.z.string()
        .refine(val => !isNaN(Date.parse(val)), {
        message: 'Le format de la date de départ est invalide.',
    }),
    nombre_de_places: zod_1.z.number()
        .int({ message: 'Le nombre de places doit être un entier.' })
        .min(1, { message: 'Le nombre de places doit être au moins 1.' }),
    page: zod_1.z.number().optional().default(1), // Paramètre optionnel pour la page
    limit: zod_1.z.number().optional().default(10) // Paramètre optionnel pour la limite par page
});
// Schéma de validation pour les données de mise à jour
exports.updateTrajetDetailsSchema = zod_1.z.object({
    temps_depart_prevu: zod_1.z.string().optional().transform(value => value ? new Date(value) : undefined),
    temps_arrivee_prevu: zod_1.z.string().optional().transform(value => value ? new Date(value) : undefined),
    nombre_de_places: zod_1.z.number().int().optional(),
    price: zod_1.z.union([zod_1.z.string(), zod_1.z.number()]).optional().transform(value => typeof value === 'string' ? parseFloat(value) : value),
    vehicule_id: zod_1.z.string().optional(),
});
//# sourceMappingURL=trajetValidation.js.map