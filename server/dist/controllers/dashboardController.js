"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserStats = exports.getEcommercePlatformData = exports.getSalesByRegion = exports.getSessionsByCountry = exports.getRevenueData = exports.getOverviewStats = exports.updateDashboardData = exports.getDashboardData = void 0;
const Dashboard_1 = __importDefault(require("../models/Dashboard"));
const getDashboardData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dashboardData = yield Dashboard_1.default.findOne().sort({ createdAt: -1 });
        if (!dashboardData) {
            res.status(404).json({ message: 'No dashboard data found' });
            return;
        }
        res.json(dashboardData);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching dashboard data', error });
    }
});
exports.getDashboardData = getDashboardData;
const updateDashboardData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedData = yield Dashboard_1.default.findOneAndUpdate({}, { $set: req.body }, { new: true, upsert: true });
        res.json(updatedData);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating dashboard data', error });
    }
});
exports.updateDashboardData = updateDashboardData;
const getOverviewStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dashboardData = yield Dashboard_1.default.findOne().select('overview');
        if (!dashboardData) {
            res.status(404).json({ message: 'No overview stats found' });
            return;
        }
        res.json(dashboardData.overview);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching overview stats', error });
    }
});
exports.getOverviewStats = getOverviewStats;
const getRevenueData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dashboardData = yield Dashboard_1.default.findOne().select('revenueOverTime');
        if (!dashboardData) {
            res.status(404).json({ message: 'No revenue data found' });
            return;
        }
        res.json(dashboardData.revenueOverTime);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching revenue data', error });
    }
});
exports.getRevenueData = getRevenueData;
const getSessionsByCountry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dashboardData = yield Dashboard_1.default.findOne().select('sessionsByCountry');
        if (!dashboardData) {
            res.status(404).json({ message: 'No sessions data found' });
            return;
        }
        res.json(dashboardData.sessionsByCountry);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching sessions data', error });
    }
});
exports.getSessionsByCountry = getSessionsByCountry;
const getSalesByRegion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dashboardData = yield Dashboard_1.default.findOne().select('salesByRegion');
        if (!dashboardData) {
            res.status(404).json({ message: 'No sales data found' });
            return;
        }
        res.json(dashboardData.salesByRegion);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching sales data', error });
    }
});
exports.getSalesByRegion = getSalesByRegion;
const getEcommercePlatformData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dashboardData = yield Dashboard_1.default.findOne().select('ecommercePlatform');
        if (!dashboardData) {
            res.status(404).json({ message: 'No platform data found' });
            return;
        }
        res.json(dashboardData.ecommercePlatform);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching platform data', error });
    }
});
exports.getEcommercePlatformData = getEcommercePlatformData;
const getUserStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dashboardData = yield Dashboard_1.default.findOne().select('registeredUsers');
        if (!dashboardData) {
            res.status(404).json({ message: 'No user stats found' });
            return;
        }
        res.json(dashboardData.registeredUsers);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching user stats', error });
    }
});
exports.getUserStats = getUserStats;
