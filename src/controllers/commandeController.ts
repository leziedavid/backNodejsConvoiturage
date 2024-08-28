import { Request, Response } from 'express';
import { BaseResponse } from '../interfaces/BaseResponse';
import * as commandeService from '../services/commandeService';
import { z } from 'zod';
import { commandeValidation } from '../validation/commandeValidation';
import jwt from 'jsonwebtoken';
import { Commande } from '@prisma/client';



interface DecodedToken {
    id: string;
    exp: number;
}


// Gestion des erreurs pour les réponses
const handleValidationError = (error: z.ZodError): BaseResponse<null> => ({
    code: 400,
    messages: error.errors.map(e => e.message).join(', '),
});

const handleError = (error: unknown): BaseResponse<null> => {
    console.error(error);
    return {
        code: 500,
        messages: 'Internal server error',
    };
};

// Créer une commande
export const createCommandes = async (req: Request, res: Response) => {
    try {
        // Validation des données de la requête
        const validatedData = commandeValidation.createSchema.parse(req.body);

        // Utiliser le service pour créer une commande
        const newCommande = await commandeService.createCommande(validatedData);

        const response: BaseResponse<typeof newCommande> = {
            code: 201,
            messages: 'Commande created successfully',
            data: newCommande,
        };
        return res.status(201).json(response);

    } catch (error: unknown) {
        if (error instanceof z.ZodError) {
            return res.status(400).json(handleValidationError(error));
        }
        return res.status(500).json(handleError(error));
    }
};

export const createCommande = async (req: Request, res: Response) => {
    try {
        // Validation des données de la requête
        const validatedData = commandeValidation.createSchema.parse(req.body);

        // Utiliser le service pour créer une commande
        const newCommande = await commandeService.createCommande(validatedData);

        const response: BaseResponse<typeof newCommande> = {
            code: 201,
            messages: 'Commande created successfully',
            data: newCommande,
        };
        return res.status(201).json(response);
        
    } catch (error: unknown) {

        if (error instanceof z.ZodError) {
            return res.status(400).json(handleValidationError(error));
        }

        // Vérifier si l'erreur est une instance d'Error et contient le message spécifique
        if (error instanceof Error) {
            
            if (error.message.includes('Cet trajet n\'accepte plus de commandes, le nombre de places est atteint')) {
                return res.status(400).json({
                    code: 400,
                    messages: error.message,
                });
            }

            if (error.message.includes('Trajet not found')) {
                return res.status(404).json({
                    code: 404,
                    messages: error.message,
                });
            }
        }

        // Gestion des erreurs générales
        console.error('Error creating commande:', error);
        return res.status(500).json({
            code: 500,
            messages: 'Internal server error',
        });
    }
};
// Mettre à jour une commande
export const updateCommande = async (req: Request, res: Response) => {
    try {
        // Valider les données de la requête
        const validatedData = commandeValidation.updateSchema.parse(req.body);

        // Utiliser le service pour mettre à jour une commande
        const updatedCommande = await commandeService.updateCommande(req.params.id, validatedData);

        const response: BaseResponse<typeof updatedCommande> = {
            code: 200,
            messages: 'Commande updated successfully',
            data: updatedCommande,
        };
        return res.status(200).json(response);
    } catch (error: unknown) {
        if (error instanceof z.ZodError) {
            return res.status(400).json(handleValidationError(error));
        } else if (error instanceof Error && error.message.includes('not found')) {
            const response: BaseResponse<null> = {
                code: 404,
                messages: 'Commande not found',
            };
            return res.status(404).json(response);
        }
        return res.status(500).json(handleError(error));
    }
};

// Obtenir toutes les commandes
export const getCommandes = async (_req: Request, res: Response) => {
    try {
        const commandes = await commandeService.getCommandes();
        const response: BaseResponse<typeof commandes> = {
            code: 200,
            messages: 'Commandes retrieved successfully',
            data: commandes,
        };
        return res.status(200).json(response);
    } catch (error: unknown) {
        return res.status(500).json(handleError(error));
    }
};

// Obtenir une commande par ID
export const getCommandeById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const commande = await commandeService.getCommandeById(id);
        if (!commande) {
            const response: BaseResponse<null> = {
                code: 404,
                messages: 'Commande not found',
            };
            return res.status(404).json(response);
        }
        const response: BaseResponse<typeof commande> = {
            code: 200,
            messages: 'Commande retrieved successfully',
            data: commande,
        };
        return res.status(200).json(response);
    } catch (error: unknown) {
        return res.status(500).json(handleError(error));
    }
};

export const getCommandeByUsersId = async (req: Request, res: Response) => {

    const { id } = req.params;

    try {

        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({
                code: 401,
                messages: 'Token manquant',
            });
        }

        // Décoder le token
        const decodedToken = jwt.decode(token) as DecodedToken | null;

        if (!decodedToken) {

            throw new Error('Votre session a expiré, merci de vous reconnecter.');
        }
        
        const id = decodedToken.id;
        const commande = await commandeService.getCommandeByUsers(id);

        if (!commande) {

            const response: BaseResponse<null> = {
                code: 404,
                messages: 'Commande not found',
            };
            return res.status(404).json(response);
        }
        const response: BaseResponse<typeof commande> = {
            code: 200,
            messages: 'Commande retrieved successfully',
            data: commande,
        };

        return res.status(200).json(response);

    } catch (error: unknown) {
        return res.status(500).json(handleError(error));
    }
};

export const getAllCommandeByUserId = async (req: Request, res: Response) => {

    const { id } = req.params;

    try {

        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({
                code: 401,
                messages: 'Token manquant',
            });
        }

        // Décoder le token
        const decodedToken = jwt.decode(token) as DecodedToken | null;

        if (!decodedToken) {

            throw new Error('Votre session a expiré, merci de vous reconnecter.');
        }
        
        const id = decodedToken.id;
        const commande = await commandeService.getAllCommandeByUsers(id);

        if (!commande) {

            const response: BaseResponse<null> = {
                code: 404,
                messages: 'Commande not found',
            };
            return res.status(404).json(response);
        }
        const response: BaseResponse<typeof commande> = {
            code: 200,
            messages: 'Commande retrieved successfully',
            data: commande,
        };

        return res.status(200).json(response);

    } catch (error: unknown) {
        return res.status(500).json(handleError(error));
    }
};

export const getCommandeByDriversId = async (req: Request, res: Response) => {

    const { id } = req.params;

    try {

        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({
                code: 401,
                messages: 'Token manquant',
            });
        }

        // Décoder le token
        const decodedToken = jwt.decode(token) as DecodedToken | null;

        if (!decodedToken) {

            throw new Error('Votre session a expiré, merci de vous reconnecter.');
        }
        
        const id = decodedToken.id;
        const commande = await commandeService.getCommandesByConducteurId(id);

        if (!commande) {

            const response: BaseResponse<null> = {
                code: 404,
                messages: 'Commande not found',
            };
            return res.status(404).json(response);
        }
        const response: BaseResponse<typeof commande> = {
            code: 200,
            messages: 'Commande retrieved successfully',
            data: commande,
        };

        return res.status(200).json(response);

    } catch (error: unknown) {
        return res.status(500).json(handleError(error));
    }
};

// Supprimer une commande
export const deleteCommande = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await commandeService.deleteCommande(id);
        const response: BaseResponse<null> = {
            code: 204,
            messages: 'Commande deleted successfully',
        };
        return res.status(204).json(response);
    } catch (error: unknown) {
        if (error instanceof Error && error.message.includes('not found')) {
            const response: BaseResponse<null> = {
                code: 404,
                messages: 'Commande not found',
            };
            return res.status(404).json(response);
        }
        return res.status(500).json(handleError(error));
    }
};

// mise a jour des status de la commande :
export const updateCommandeStatus = async (req: Request, res: Response) => {

    try {

        const { commandeId, newStatus } = req.body;

        // Validation des paramètres requis
        if (!commandeId || !newStatus) {
            return res.status(400).json({
                code: 400,
                messages: 'Commande ID and new status are required',
            });
        }

        // Appel du service pour mettre à jour le statut de la commande
        const updatedCommande = await commandeService.updateCommandeStatus(commandeId, newStatus);

        // Préparation de la réponse
        const response: BaseResponse<typeof updatedCommande> = {
            code: 200,
            messages: 'Commande status updated successfully',
            data: updatedCommande,
        };

        return res.status(200).json(response);

    } catch (error: unknown) {
        
        return res.status(500).json(handleError(error));
    }

};
