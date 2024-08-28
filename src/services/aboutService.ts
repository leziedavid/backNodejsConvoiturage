// src/services/aboutService.ts
import prisma from '../Conn';
import { About, Prisma } from '@prisma/client';

export const createAbout = async (aboutData: Prisma.AboutCreateInput): Promise<About> => {
    return prisma.about.create({ data: aboutData });
};

export const updateAbout = async (aboutId: string, aboutData: Prisma.AboutUpdateInput): Promise<About> => {
    const about = await prisma.about.findUnique({ where: { id: aboutId } });
    if (!about) throw new Error('About not found');

    return prisma.about.update({
        where: { id: aboutId },
        data: aboutData,
    });
};

export const getAbouts = async (): Promise<About[]> => {
    return prisma.about.findMany();
};

export const getAboutById = async (id: string): Promise<About | null> => {
    return prisma.about.findUnique({ where: { id } });
};

export const deleteAbout = async (id: string): Promise<void> => {
    await prisma.about.delete({ where: { id } });
};
