import { Request, Response } from 'express';
import { reponseConducteurSchema } from '../validation/reponseConducteurValidation';
import { BaseResponse } from '../interfaces/BaseResponse';
import {createReponseConducteur,getReponsesConducteur,getReponseConducteurById,deleteReponseConducteur} from '../services/reponseConducteurService';

export const createReponse = async (req: Request, res: Response) => {
    // Validation des données de la requête
    const validation = reponseConducteurSchema.safeParse(req.body);

    if (!validation.success) {
        return res.status(400).json({
            code: 400,
            messages: `Validation error: ${validation.error.errors.map(e => e.message).join(', ')}`
        });
    }

    try {
        const { commande_id, conducteur_id, statut_reponse, commentaires } = validation.data;

        // Appel à la fonction de création sans `temps_reponse`
        const newReponse = await createReponseConducteur({
            commande_id,
            conducteur_id,
            statut_reponse,
            commentaires, // Ce champ est optionnel
        });

        const response: BaseResponse<typeof newReponse> = {
            code: 201,
            messages: 'Réponse créée avec succès',
            data: newReponse,
        };

        res.status(201).json(response);
    } catch (error) {
        console.error('Erreur lors de la création de la réponse conducteur :', error);

        const response: BaseResponse<null> = {
            code: 500,
            messages: 'Erreur interne du serveur',
        };
        res.status(500).json(response);
    }
};

export const getReponses = async (_req: Request, res: Response) => {
    try {
        const reponses = await getReponsesConducteur();
        const response: BaseResponse<typeof reponses> = {
            code: 200,
            messages: 'Réponses récupérées avec succès',
            data: reponses,
        };
        res.json(response);
    } catch (error) {
        console.error('Erreur lors de la récupération des réponses :', error);

        const response: BaseResponse<null> = {
            code: 500,
            messages: 'Erreur interne du serveur',
        };
        res.status(500).json(response);
    }
};

export const getReponseById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const reponse = await getReponseConducteurById(id);
        if (reponse) {
            const response: BaseResponse<typeof reponse> = {
                code: 200,
                messages: 'Réponse récupérée avec succès',
                data: reponse,
            };
            res.json(response);
        } else {
            const response: BaseResponse<null> = {
                code: 404,
                messages: 'Réponse non trouvée',
            };
            res.status(404).json(response);
        }
    } catch (error) {
        console.error('Erreur lors de la récupération de la réponse conducteur :', error);

        const response: BaseResponse<null> = {
            code: 500,
            messages: 'Erreur interne du serveur',
        };
        res.status(500).json(response);
    }
};

export const deleteReponse = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await deleteReponseConducteur(id);
        const response: BaseResponse<null> = {
            code: 204,
            messages: 'Réponse supprimée avec succès',
        };
        res.status(204).send(response);
    } catch (error) {
        console.error('Erreur lors de la suppression de la réponse conducteur :', error);

        const response: BaseResponse<null> = {
            code: 500,
            messages: 'Erreur interne du serveur',
        };
        res.status(500).json(response);
    }
};
