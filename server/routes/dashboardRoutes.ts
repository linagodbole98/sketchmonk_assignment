import express from 'express';
import { dashboardController } from '../controllers/dashboardController';

const router = express.Router();

router.get('/dashboard', dashboardController.getDashboardData);
router.put('/dashboard', dashboardController.updateDashboardData);

export default router;
