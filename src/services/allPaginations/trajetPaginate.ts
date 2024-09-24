import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export interface PaginationOptions {
    page: number;
    limit: number;
}

export const paginate = async <T>(
    query: (args: any) => Promise<T[]>, // Typage de la fonction query
    options: PaginationOptions
): Promise<{ data: T[]; total: number }> => {
    const { page, limit } = options;

    // Calculer l'offset pour la pagination
    const offset = (page - 1) * limit;

    // Exécuter la requête avec la pagination
    const [data, total] = await Promise.all([
        query({
            skip: offset,
            take: limit,
        }),
        prisma.trajet.count() // Compter le total directement via PrismaClient
    ]);

    return { data, total };
};
