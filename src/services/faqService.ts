import prisma from '../Conn';
import { FAQ, Prisma } from '@prisma/client';

// Fonction pour créer une FAQ
export const createFAQService = async (faqData: {
    question: string;
    reponse: string;
}): Promise<FAQ> => {
    const { question, reponse } = faqData;

    return prisma.fAQ.create({
        data: {
            question,
            reponse,
        },
    });
};

// Fonction pour mettre à jour une FAQ
export const updateFAQService = async (faqId: string, faqData: {
    question?: string;
    reponse?: string;
}): Promise<FAQ> => {
    const { question, reponse } = faqData;

    // Vérifier si la FAQ existe avant la mise à jour
    const existingFAQ = await prisma.fAQ.findUnique({ where: { id: faqId } });
    if (!existingFAQ) throw new Error('FAQ not found');

    return prisma.fAQ.update({
        where: { id: faqId },
        data: {
            question: question ?? existingFAQ.question,
            reponse: reponse ?? existingFAQ.reponse,
        },
    });
};

// Fonction pour obtenir toutes les FAQ
export const getAllFAQsService = async (): Promise<FAQ[]> => {
    return prisma.fAQ.findMany();
};

// Fonction pour obtenir une FAQ par ID
export const getFAQByIdService = async (id: string): Promise<FAQ | null> => {
    return prisma.fAQ.findUnique({
        where: { id },
    });
};

// Fonction pour supprimer une FAQ
export const deleteFAQService = async (id: string): Promise<void> => {
    await prisma.fAQ.delete({ where: { id } });
};
