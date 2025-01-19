import express from 'express';
import { dashboardController } from '../controllers/dashboardController';

const router = express.Router();

// Get all dashboard data
router.get('/dashboard', dashboardController.getDashboardData);

// Seed database
router.post('/seed', dashboardController.seedData);

export default router;
