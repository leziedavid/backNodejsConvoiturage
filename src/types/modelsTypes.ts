// types.ts

import { Trajet } from "@prisma/client/wasm";

// Point pour les coordonnées géographiques
export type Point = {
    lat: number;
    lon: number;
};

// Type pour un Arret
export type Arret = {
    id: string;
    trajet_id: string;
    nom: {
        lat: number;
        lon: number;
    }; // Adaptez selon la structure réelle de votre JSON
    ville: string;
    date_creation: Date;
    date_modification: Date;
};

// Type pour une Commande
export type Commande = {
    id: string;
    numeroCommande: string;
    trajet_id: string;
    utilisateur_id: string;
    conducteur_id: string;
    point_prise_en_charge?: Point;
    point_depose?: Point;
    temps_prise_en_charge: Date;
    temps_depose: Date;
    statut_commande: string;
    montant?: number;
    mode_paiement?: string;
    commentaires_instructions?: string;
    date_creation: Date;
    date_modification: Date;
    historique_statuts?: {
        // Adaptez selon la structure de votre JSON
    };
    evaluations?: {
        // Adaptez selon la structure de votre JSON
    };
    date_action?: Date;
};

// Type pour un Vehicule
export type Vehicule = {
    id: string;
    utilisateur_id: string;
    marque: string;
    modele: string;
    annee: number;
    plaque: string;
    couleur?: string;
    permis?: string;
    carte_grise?: string;
    date_creation: Date;
    date_modification: Date;
};

// Type pour un Utilisateur
export type Utilisateur = {
    id: string;
    username: string;
    email: string;
    password_hash: string;
    role: string;
    photo_url?: string;
    contact_number?: string;
    address?: string;
    bio?: string;
    date_of_birth?: Date;
    created_at: Date;
    updated_at: Date;
    last_login?: Date;
    is_active: boolean;
    verification_status: string;
    token?: string;
    wallet?: {
        id: string;
        user_id: string;
        balance: number;
        currency_id: string;
        created_at: Date;
        updated_at: Date;
    };
    rechargements?: {
        id: string;
        date: Date;
        description: string;
        amount: number;
        paymentMethod: string;
        status: string;
        wallet_id: string;
        utilisateur_id: string;
    }[];
    trajets: Trajet[];
    commandes: Commande[];
    reponsesConducteur: {
        id: string;
        commande_id: string;
        conducteur_id: string;
        temps_reponse: Date;
        statut_reponse: string;
        commentaires?: string;
    }[];
    commandesConducteur: Commande[];
    vehicules: Vehicule[];
};

// Type pour un Trajet
export type TrajetModel = {
    id: string;
    utilisateur_id: string;
    point_depart: Point;
    ville_depart: string;
    point_arrivee: Point;
    ville_arrivee: string;
    temps_depart_prevu: Date;
    temps_arrivee_prevu: Date;
    duree_estimee: number;
    distance_estimee: number;
    etat_trajet: string;
    historique_position?: {
        lat: number;
        lon: number;
        timestamp: Date;
    }[];
    mode_transport: string;
    nombre_de_places: number;
    price?: number;
    vehicule_id: string;
    arrets: Arret[]; // Liste non optionnelle
    commandes: Commande[];
    utilisateur: Utilisateur;
    vehicule: Vehicule;

    // Ajoutez d'autres champs si nécessaire
};
