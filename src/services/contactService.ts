// src/services/contactService.ts
import prisma from '../Conn';
import { Contact } from '@prisma/client';

// Créer un nouveau contact
export const createContact = async (contactData: {nom: string;email: string;sujet: string;message: string;dateEnvoi?: Date;}): Promise<Contact> => {
    return prisma.contact.create({
        data: contactData,
    });
};

// Mettre à jour un contact existant
export const updateContact = async (id: string, contactData: {nom?: string;email?: string;sujet?: string;message?: string;dateEnvoi?: Date;}): Promise<Contact> => {
    const contact = await prisma.contact.findUnique({ where: { id } });
    if (!contact) throw new Error('Contact non trouvé');

    return prisma.contact.update({
        where: { id },
        data: contactData,
    });
};

// Récupérer tous les contacts
export const getContacts = async (): Promise<Contact[]> => {
    return prisma.contact.findMany();
};

// Récupérer un contact par ID
export const getContactById = async (id: string): Promise<Contact | null> => {
    return prisma.contact.findUnique({
        where: { id },
    });
};

// Supprimer un contact
export const deleteContact = async (id: string): Promise<void> => {
    await prisma.contact.delete({ where: { id } });
};
