"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboardController_1 = require("../controllers/dashboardController");
const router = (0, express_1.Router)();
// Main dashboard routes
router.get('/', dashboardController_1.getDashboardData);
router.put('/', dashboardController_1.updateDashboardData);
// Individual section routes
router.get('/overview', dashboardController_1.getOverviewStats);
router.get('/revenue', dashboardController_1.getRevenueData);
router.get('/sessions', dashboardController_1.getSessionsByCountry);
router.get('/sales', dashboardController_1.getSalesByRegion);
router.get('/platforms', dashboardController_1.getEcommercePlatformData);
router.get('/users', dashboardController_1.getUserStats);
exports.default = router;
