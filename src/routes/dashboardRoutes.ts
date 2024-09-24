import express from 'express';
import { getDashboardStatsController } from '../controllers/dashboardController'; // Assurez-vous que le chemin est correct

const router = express.Router();

router.get('/', getDashboardStatsController);

export default router;
