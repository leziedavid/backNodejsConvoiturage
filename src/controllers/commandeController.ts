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
        let response: BaseResponse<null>;

        if (error instanceof z.ZodError) {
            response = {
                code: 400,
                messages: 'Validation error',
                data: null,
            };
            return res.status(400).json(response);
        }

        response = {
            code: 500,
            messages: 'Internal server error',
            data: null,
        };
        return res.status(500).json(response);
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

            let response: BaseResponse<null>;

            if (error instanceof z.ZodError) {
                response = {
                    code: 400,
                    messages: 'Validation error',
                    data: null,
                };
                return res.status(400).json(response);
            }

            if (error instanceof Error) {
                if (error.message.includes('Cet trajet n\'accepte plus de commandes, le nombre de places est atteint')) {
                    response = {
                        code: 400,
                        messages: error.message,
                        data: null,
                    };
                    return res.status(400).json(response);
                }

                if (error.message.includes('Trajet not found')) {
                    response = {
                        code: 404,
                        messages: error.message,
                        data: null,
                    };
                    return res.status(404).json(response);
                }
            }

            console.error('Error creating commande:', error);

            response = {
                code: 500,
                messages: 'Internal server error',
                data: null,
            };
            return res.status(500).json(response);

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

// Obtenir toutes les commandes avec pagination
export const getCommandes = async (req: Request, res: Response) => {
    try {
        // Extraction des paramètres de pagination
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

        // Appeler le service de commande avec les paramètres de pagination
        const options = { page, limit };
        const commandes = await commandeService.getCommandes(options);

        if (!commandes) {
            return res.status(404).json({
                code: 404,
                messages: 'Commandes not found',
                data: null,
                total: 0,
            });
        }

        return res.status(200).json({
            code: 200,
            messages: 'Commandes retrieved successfully',
            data: commandes.data,
            total: commandes.total,
        });

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

// Mes fonction avec parggination
export const getAllCommandeByUserId = async (req: Request, res: Response) => {
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
            return res.status(401).json({
                code: 401,
                messages: 'Votre session a expiré, merci de vous reconnecter.',
            });
        }

        // Vous pouvez utiliser l'id du token ou celui passé en paramètres, ici nous utilisons celui du token
        const userId = decodedToken.id;

        // Appeler le service de commande avec les paramètres de pagination
        const options = { page, limit };
        const commandes = await commandeService.getAllCommandeByUsers(userId, options);

        if (!commandes) {
            return res.status(404).json({
                code: 404,
                messages: 'Commandes not found',
                data: null,
                total: 0,
            });
        }

        return res.status(200).json({
            code: 200,
            messages: 'Commandes retrieved successfully',
            data: commandes.data,
            total: commandes.total,
        });

    } catch (error: unknown) {
        return res.status(500).json(handleError(error));
    }
};

export const getCommandeByDriversId = async (req: Request, res: Response) => {
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
            return res.status(401).json({
                code: 401,
                messages: 'Votre session a expiré, merci de vous reconnecter.',
            });
        }

        // Vous pouvez utiliser l'id du token ou celui passé en paramètres, ici nous utilisons celui du token
        const conducteurId = decodedToken.id;

        // Appeler le service de commande avec les paramètres de pagination
        const options = { page, limit };
        const commande = await commandeService.getCommandesByConducteurId(conducteurId, options);

        if (!commande) {
            return res.status(404).json({
                code: 404,
                messages: 'Commande not found',
                data: null,
                total: 0,
            });
        }

        return res.status(200).json({
            code: 200,
            messages: 'Commande retrieved successfully',
            data: commande.data,
            total: commande.total,
        });

    } catch (error: unknown) {
        return res.status(500).json(handleError(error));
    }
};

// fin

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
    const { id } = req.params;
    try {

        const { commandeId, newStatus } = req.body;
        if (!newStatus) {
            return res.status(400).json({
                code: 400,
                messages: 'Commande ID and new status are required',
            });
        }

        // Appel du service pour mettre à jour le statut de la commande
        const updatedCommande = await commandeService.updateCommandeStatus(id, newStatus);

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
export const updateCommandeUsersStatus = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {

        const { commandeId, newStatus } = req.body;
        if (!newStatus) {
            return res.status(400).json({
                code: 400,
                messages: 'Commande ID and new status are required',
            });
        }

        // Appel du service pour mettre à jour le statut de la commande
        const updatedCommande = await commandeService.updateCommandeStatus(id, newStatus);

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


export const searchCommandesByOptions = async (req: Request, res: Response) => {
    try {
        // Extraction des paramètres de recherche et de pagination depuis le corps de la requête
        const {
            numeroCommande,
            dateCreation,
            username,
            page = 1,
            limit = 10
        } = req.body;

        // Validation des paramètres de pagination
        const pageNumber = parseInt(page as string, 10);
        const limitNumber = parseInt(limit as string, 10);

        if (pageNumber < 1 || limitNumber < 1) {
            return res.status(400).json({
                code: 400,
                messages: 'Page and limit must be positive numbers.',
                data: null,
                total: 0,
            });
        }

        // Préparer les paramètres pour la recherche
        const searchOptions = {
            page: pageNumber,
            limit: limitNumber
        };

        // Appeler le service de recherche avec les paramètres
        const commandes = await commandeService.searchCommandes(searchOptions, numeroCommande, dateCreation, username);

        if (!commandes) {
            return res.status(404).json({
                code: 404,
                messages: 'Commandes not found',
                data: null,
                total: 0,
            });
        }

        return res.status(200).json({
            code: 200,
            messages: 'Commandes retrieved successfully',
            data: commandes.data,
            total: commandes.total,
        });

    } catch (error: unknown) {
        console.error('Error searching commandes:', error);
        return res.status(500).json({
            code: 500,
            messages: 'Internal server error',
            data: null,
            total: 0,
        });
    }
};
