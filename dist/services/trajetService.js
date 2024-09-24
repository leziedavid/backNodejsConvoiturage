"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTrajet = exports.searchTrajets = exports.searchTrajetsService = exports.getDriverTrajet = exports.getAllTrajets = exports.getTrajetById = exports.updateTrajetDetails = exports.updateTrajet = exports.createTrajet = void 0;
const geolib_1 = require("geolib");
const Conn_1 = __importDefault(require("../Conn"));
const trajetPaginate_1 = require("./allPaginations/trajetPaginate");
const createTrajet = (trajetData) => __awaiter(void 0, void 0, void 0, function* () {
    const { utilisateur_id, vehicule_id, point_depart, ville_depart, point_arrivee, ville_arrivee, temps_depart_prevu, temps_arrivee_prevu, duree_estimee, distance_estimee, etat_trajet, historique_position, mode_transport, nombre_de_places, price, arrets } = trajetData;
    if (!utilisateur_id)
        throw new Error('Utilisateur ID is required');
    // Construire les données pour Prisma
    const data = {
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
    return Conn_1.default.trajet.create({
        data,
    });
});
exports.createTrajet = createTrajet;
const updateTrajet = (trajetId, trajetData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!trajetId)
        throw new Error('Trajet ID is required');
    // Vérifier si le trajet existe
    const trajet = yield Conn_1.default.trajet.findUnique({ where: { id: trajetId } });
    if (!trajet)
        throw new Error('Trajet not found');
    // Construire les données pour la mise à jour
    const updateData = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (trajetData.utilisateur_id && { utilisateur: { connect: { id: trajetData.utilisateur_id } } })), (trajetData.vehicule_id && { vehicule: { connect: { id: trajetData.vehicule_id } } })), (trajetData.point_depart && { point_depart: trajetData.point_depart })), (trajetData.ville_depart && { ville_depart: trajetData.ville_depart })), (trajetData.point_arrivee && { point_arrivee: trajetData.point_arrivee })), (trajetData.ville_arrivee && { ville_arrivee: trajetData.ville_arrivee })), (trajetData.temps_depart_prevu && { temps_depart_prevu: trajetData.temps_depart_prevu })), (trajetData.temps_arrivee_prevu && { temps_arrivee_prevu: trajetData.temps_arrivee_prevu })), (trajetData.duree_estimee !== undefined && { duree_estimee: trajetData.duree_estimee })), (trajetData.distance_estimee !== undefined && { distance_estimee: trajetData.distance_estimee })), (trajetData.etat_trajet && { etat_trajet: trajetData.etat_trajet })), (trajetData.historique_position && { historique_position: trajetData.historique_position })), (trajetData.mode_transport && { mode_transport: trajetData.mode_transport })), (trajetData.nombre_de_places !== undefined && { nombre_de_places: trajetData.nombre_de_places })), (trajetData.price !== undefined && { price: trajetData.price })), (trajetData.arrets && {
        arrets: {
            updateMany: trajetData.arrets.map(arret => ({
                where: { /* Critères pour trouver l'arret existant, par exemple { lat: arret.lat, lon: arret.lon } */},
                data: {
                    lat: arret.lat,
                    lon: arret.lon,
                    ville: arret.ville,
                },
            })),
        },
    }));
    // Utiliser Prisma pour mettre à jour le trajet
    return Conn_1.default.trajet.update({
        where: { id: trajetId },
        data: updateData,
    });
});
exports.updateTrajet = updateTrajet;
const updateTrajetDetails = (trajetId, details) => __awaiter(void 0, void 0, void 0, function* () {
    if (!trajetId)
        throw new Error('Trajet ID is required');
    const trajet = yield Conn_1.default.trajet.findUnique({ where: { id: trajetId } });
    if (!trajet)
        throw new Error('Trajet not found');
    const updateData = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (details.temps_depart_prevu && { temps_depart_prevu: details.temps_depart_prevu })), (details.temps_arrivee_prevu && { temps_arrivee_prevu: details.temps_arrivee_prevu })), (details.nombre_de_places !== undefined && { nombre_de_places: details.nombre_de_places })), (details.price !== undefined && { price: details.price })), (details.vehicule_id && { vehicule: { connect: { id: details.vehicule_id } } }));
    return Conn_1.default.trajet.update({
        where: { id: trajetId },
        data: updateData,
    });
});
exports.updateTrajetDetails = updateTrajetDetails;
const getTrajetById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return Conn_1.default.trajet.findUnique({
        where: { id },
        include: {
            commandes: true,
            utilisateur: true,
            vehicule: true,
            arrets: true,
        },
    });
});
exports.getTrajetById = getTrajetById;
const getAllTrajets = (options) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, trajetPaginate_1.paginate)((args) => Conn_1.default.trajet.findMany(Object.assign(Object.assign({}, args), { orderBy: { created_at: 'desc' }, include: {
            commandes: true,
            utilisateur: true,
            vehicule: true,
        } })), options);
});
exports.getAllTrajets = getAllTrajets;
const getDriverTrajet = (conducteurId, options) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, trajetPaginate_1.paginate)((args) => Conn_1.default.trajet.findMany(Object.assign({ where: { utilisateur_id: conducteurId }, orderBy: { created_at: 'desc' }, include: {
            commandes: true,
            utilisateur: true,
            vehicule: true,
        } }, args)), options);
});
exports.getDriverTrajet = getDriverTrajet;
// Fonction pour vérifier si un point est entre deux autres points
const isPointBetween = (point, start, end) => {
    return (point.lat >= Math.min(start.lat, end.lat) &&
        point.lat <= Math.max(start.lat, end.lat) &&
        point.lon >= Math.min(start.lon, end.lon) &&
        point.lon <= Math.max(start.lon, end.lon));
};
const searchTrajetsService = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { point_depart, point_arrivee, temps_depart_prevu, nombre_de_places, page = 1, limit = 10 } = filters;
    const dateDepartPrevu = new Date(temps_depart_prevu);
    try {
        // Récupérer tous les trajets avec leurs arrêts
        const trajets = yield Conn_1.default.trajet.findMany({
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
                }
                catch (error) {
                    console.error(`Erreur lors du parsing des coordonnées du trajet ${trajet.id}: ${error}`);
                    return false;
                }
                const isWithinDistance = (0, geolib_1.isPointWithinRadius)(point_depart, pointDepartTrajet, 5000) && (0, geolib_1.isPointWithinRadius)(point_arrivee, pointArriveeTrajet, 5000);
                const hasValidArrets = trajet.arrets.some(arret => {
                    try {
                        const arretPoint = typeof arret.nom === 'string' ? JSON.parse(arret.nom) : arret.nom;
                        return isPointBetween(arretPoint, point_depart, point_arrivee);
                    }
                    catch (error) {
                        console.error(`Erreur lors du parsing des coordonnées d'arrêt ${arret.id}: ${error}`);
                        return false;
                    }
                });
                return isWithinDistance || hasValidArrets;
            }
            return false;
        });
        if (filteredTrajets.length === 0) {
            const randomTrajets = yield Conn_1.default.trajet.findMany({
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
    }
    catch (error) {
        console.error('Erreur lors de la recherche des trajets:', error);
        throw new Error('Erreur lors de la recherche des trajets');
    }
});
exports.searchTrajetsService = searchTrajetsService;
const searchTrajets = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { point_depart, point_arrivee, temps_depart_prevu, nombre_de_places, page = 1, limit = 10 } = filters;
    const dateDepartPrevu = new Date(temps_depart_prevu);
    // Fonction de requête pour pagination
    const query = (args) => Conn_1.default.trajet.findMany(Object.assign(Object.assign({}, args), { where: {
            temps_depart_prevu: { gte: dateDepartPrevu },
            nombre_de_places: { gte: nombre_de_places }
        }, orderBy: { created_at: 'desc' }, include: {
            utilisateur: true,
            arrets: true,
            commandes: true,
            vehicule: true
        } }));
    // Filtrer les trajets basés sur les coordonnées si disponibles
    const { data: trajets, total } = yield (0, trajetPaginate_1.paginate)(query, { page, limit });
    const filteredTrajets = trajets.filter(trajet => {
        if (trajet.point_depart && trajet.point_arrivee) {
            const pointDepartTrajet = trajet.point_depart; // Assumer que c'est déjà un objet
            const pointArriveeTrajet = trajet.point_arrivee; // Assumer que c'est déjà un objet
            // Comparer les coordonnées
            const isWithinLatitudeRange = pointDepartTrajet.lat <= point_depart.lat && pointArriveeTrajet.lat >= point_arrivee.lat;
            const isWithinLongitudeRange = pointDepartTrajet.lon <= point_depart.lon && pointArriveeTrajet.lon >= point_arrivee.lon;
            return isWithinLatitudeRange && isWithinLongitudeRange;
        }
        return false;
    });
    return { trajets: filteredTrajets, total };
});
exports.searchTrajets = searchTrajets;
const deleteTrajet = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield Conn_1.default.trajet.delete({ where: { id } });
});
exports.deleteTrajet = deleteTrajet;
//# sourceMappingURL=trajetService.js.map