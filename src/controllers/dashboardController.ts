import { Request, Response } from 'express';
import { getDashboardStats } from '../services/dashboardService'; // Assurez-vous que le chemin est correct
import { BaseResponse } from '../interfaces/BaseResponse';

export const getDashboardStatsController = async (req: Request, res: Response) => {
    try {
        const stats = await getDashboardStats();
        const response: BaseResponse<typeof stats> = {
            code: 200,
            messages: 'Dashboard stats retrieved successfully',
            data: stats,
        };
        res.json(response);
    } catch (error) {
        const response: BaseResponse<null> = {
            code: 500,
            messages: `Internal server error: ${error}`,
        };
        res.status(500).json(response);
    }
};
