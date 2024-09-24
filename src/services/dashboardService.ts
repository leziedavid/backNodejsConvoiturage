

import prisma from '../Conn';
import { Contact } from '@prisma/client';

export const getDashboardStats = async () => {
    try {
        // Comptage des utilisateurs
        const usersCount = await prisma.user.count();
        const conducteursCount = await prisma.user.count({ where: { role: 'DRIVER' } });
        const passagersCount = await prisma.user.count({ where: { role: 'USER' } });
        const vehiculesCount = await prisma.vehicule.count();
        const commandesCount = await prisma.commande.count();
        const trajetsCount = await prisma.trajet.count();

        // Calcul du solde total des portefeuilles
        const totalBalance = await prisma.wallet.aggregate({
            _sum: {
                balance: true
            }
        });

         // Calcul du montant total des soldes
        const totalSolde = await prisma.solde.aggregate({
            _sum: {
                montant: true
            }
        });

        return {
            usersCount,
            conducteursCount,
            passagersCount,
            vehiculesCount,
            commandesCount,
            trajetsCount,
            totalBalance: totalBalance._sum.balance || 0, // Utilisation de nombre normal
            totalSolde: totalSolde._sum.montant || 0, // Montant total des soldes

        };
    } catch (error) {
        throw new Error(`Failed to retrieve dashboard stats: ${error}`);
    }
};