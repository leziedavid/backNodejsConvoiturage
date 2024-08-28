// types/express.d.ts
import { User } from '@prisma/client';

declare global {
    namespace Express {
        interface Request {
            user?: User; // Ajoute la propriété 'user' au type 'Request'
        }
    }
}
