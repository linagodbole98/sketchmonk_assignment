import { Router } from 'express';
import {
  getDashboardData,
  updateDashboardData,
  getOverviewStats,
  getRevenueData,
  getSessionsByCountry,
  getSalesByRegion,
  getEcommercePlatformData,
  getUserStats
} from '../controllers/dashboardController';

const router = Router();

// Main dashboard routes
router.get('/', getDashboardData);
router.put('/', updateDashboardData);

// Individual section routes
router.get('/overview', getOverviewStats);
router.get('/revenue', getRevenueData);
router.get('/sessions', getSessionsByCountry);
router.get('/sales', getSalesByRegion);
router.get('/platforms', getEcommercePlatformData);
router.get('/users', getUserStats);

export default router;
