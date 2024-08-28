import { z } from 'zod';

export const paymentValidation = {
    launchSchema: z.object({
        amount: z.number().positive(),
    }),
};
