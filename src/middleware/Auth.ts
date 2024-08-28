import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface DecodedToken {
    id: string;
}

interface UserPayload {
    id: string;
    username: string;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: UserPayload;
        }
    }
}

const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;

            // Rechercher l'utilisateur dans la base de données en utilisant Prisma
            const user = await prisma.user.findUnique({
                where: { id: decodedToken.id },
                select: {
                    id: true,
                    username: true,
                    email: true,
                    // Vous pouvez exclure des propriétés sensibles ici
                }
            });

            if (!user) {
                res.status(401).json({ message: 'Not authorized, user not found' });
                return;
            }

            req.user = user;  // Ajouter l'utilisateur à l'objet req
            next();
        } catch (err) {
            console.log(err);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        if (!token) {
            res.status(401).json({ message: 'Not authorized, no token' });
        }
    }
});

export default protect;
