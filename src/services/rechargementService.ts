import prisma from '../Conn';
import { Prisma, Rechargement, Wallet } from '@prisma/client';

export const createRechargement = async (rechargementData: {
    description: string;
    amount: number;
    status: string;
    paymentMethod: string;
    wallet_id: string;
    utilisateur_id: string;
    date?: Date;
}): Promise<Rechargement> => {
    const { description, amount, status, paymentMethod, wallet_id, utilisateur_id, date } = rechargementData;

    return prisma.$transaction(async (prisma) => {
        // Récupérer le solde actuel du portefeuille
        const wallet = await prisma.wallet.findUnique({
            where: { id: wallet_id }
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
                    connect: { id: wallet_id }
                },
                utilisateur: {
                    connect: { id: utilisateur_id }
                }
            }
        });

        // Mise à jour du solde du portefeuille
        await prisma.wallet.update({
            where: { id: wallet_id },
            data: {
                balance: newBalance
            }
        });

        return newRechargement;
    });
};
