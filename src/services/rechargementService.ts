import { Rechargement } from '@prisma/client';
import prisma from '../Conn';
import { paginate, PaginationOptions } from './allPaginations/trajetPaginate';

export const createRechargement = async (rechargementData: {
    description: string;
    amount: number;
    status: string;
    paymentMethod: string;
    utilisateur_id: string;
    date?: Date;
}): Promise<Rechargement> => {
    const { description, amount, status, paymentMethod,utilisateur_id, date } = rechargementData;

    return prisma.$transaction(async (prisma) => {
        // Récupérer le solde actuel du portefeuille
        const wallet = await prisma.wallet.findUnique({
            where: { user_id: utilisateur_id }
        });

        if (!wallet) {
            throw new Error('Wallet not found');
        }

        // Calculer le nouveau solde
        const newBalance = wallet.balance.add(amount);

        // Création du rechargement
        const newRechargement = await prisma.rechargement.create({
            data: {
                description,
                amount,
                paymentMethod,
                status,
                date,
                wallet: {
                    connect: { user_id: utilisateur_id }
                },
                utilisateur: {
                    connect: { id: utilisateur_id }
                }
            }
        });

        // Mise à jour du solde du portefeuille
        await prisma.wallet.update({
            where: { user_id: utilisateur_id },
            data: {
                balance: newBalance
            }
        });

        return newRechargement;
    });
};


export const getAllRechargements = async (
    options: PaginationOptions
): Promise<{ data: Rechargement[]; total: number }> => {
    return paginate(
        (args) => prisma.rechargement.findMany({
            orderBy: { date: 'desc' },
            include: {
                utilisateur: true,
                wallet: true,
            },
            ...args,
        }),
        options
    );
};


