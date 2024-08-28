// src/controllers/contactController.ts
import { Request, Response } from 'express';
import {
    createContact,
    updateContact,
    getContacts,
    getContactById,
    deleteContact,
} from '../services/contactService';
import { createContactSchema, updateContactSchema } from '../validation/contactValidation';
import { BaseResponse } from '../interfaces/BaseResponse';

export const handleGetContacts = async (req: Request, res: Response) => {
    try {
        const contacts = await getContacts();
        const response: BaseResponse<typeof contacts> = {
            code: 200,
            messages: 'Contacts récupérés avec succès',
            data: contacts,
        };
        res.json(response);
    } catch (error: any) {
        console.error('Erreur lors de la récupération des contacts:', error);
        const response: BaseResponse<null> = {
            code: 500,
            messages: 'Erreur interne du serveur',
        };
        res.status(500).json(response);
    }
};

export const handleGetContactById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const contact = await getContactById(id);
        if (contact) {
            const response: BaseResponse<typeof contact> = {
                code: 200,
                messages: 'Contact récupéré avec succès',
                data: contact,
            };
            res.json(response);
        } else {
            const response: BaseResponse<null> = {
                code: 404,
                messages: 'Contact non trouvé',
            };
            res.status(404).json(response);
        }
    } catch (error: any) {
        console.error('Erreur lors de la récupération du contact par ID:', error);
        const response: BaseResponse<null> = {
            code: 500,
            messages: 'Erreur interne du serveur',
        };
        res.status(500).json(response);
    }
};

export const handleCreateContact = async (req: Request, res: Response) => {
    try {
        const validatedData = createContactSchema.parse(req.body);
        const newContact = await createContact(validatedData);
        const response: BaseResponse<typeof newContact> = {
            code: 201,
            messages: 'Contact créé avec succès',
            data: newContact,
        };
        res.status(201).json(response);
    } catch (error: any) {
        console.error('Erreur lors de la création du contact:', error);
        res.status(400).json({
            code: 400,
            messages: error.errors ? error.errors.map((e: any) => e.message).join(', ') : error.message,
        });
    }
};

export const handleUpdateContact = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const validatedData = updateContactSchema.parse(req.body);
        const updatedContact = await updateContact(id, validatedData);
        const response: BaseResponse<typeof updatedContact> = {
            code: 200,
            messages: 'Contact mis à jour avec succès',
            data: updatedContact,
        };
        res.json(response);
    } catch (error: any) {
        console.error('Erreur lors de la mise à jour du contact:', error);
        res.status(400).json({
            code: 400,
            messages: error.errors ? error.errors.map((e: any) => e.message).join(', ') : error.message,
        });
    }
};

export const handleDeleteContact = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await deleteContact(id);
        const response: BaseResponse<null> = {
            code: 204,
            messages: 'Contact supprimé avec succès',
        };
        res.status(204).send(response);
    } catch (error: any) {
        console.error('Erreur lors de la suppression du contact:', error);
        const response: BaseResponse<null> = {
            code: 500,
            messages: 'Erreur interne du serveur',
        };
        res.status(500).json(response);
    }
};
