"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const DashboardSchema = new mongoose_1.Schema({
    overview: {
        totalIncome: {
            value: { type: Number, required: true },
            percentageChange: { type: Number, required: true },
            trend: { type: String, enum: ['up', 'down', null], required: true }
        },
        profit: {
            value: { type: Number, required: true },
            percentageChange: { type: Number, required: true },
            trend: { type: String, enum: ['up', 'down', null], required: true }
        },
        totalViews: {
            value: { type: Number, required: true },
            percentageChange: { type: Number, required: true },
            trend: { type: String, enum: ['up', 'down', null], required: true }
        },
        conversionRate: {
            value: { type: Number, required: true },
            percentageChange: { type: Number, required: true },
            trend: { type: String, enum: ['up', 'down', null], required: true }
        }
    },
    revenueOverTime: {
        months: [{ type: String, required: true }],
        totalRevenue: [{ type: Number, required: true }],
        totalTarget: [{ type: Number, required: true }]
    },
    sessionsByCountry: [{
            country: { type: String, required: true },
            value: { type: Number, required: true },
            percentage: { type: Number, required: true }
        }],
    salesByRegion: {
        regions: [{ type: String, required: true }],
        values: [{ type: Number, required: true }]
    },
    ecommercePlatform: [{
            platform: { type: String, required: true },
            percentage: { type: Number, required: true }
        }],
    registeredUsers: {
        total: { type: Number, required: true },
        active: { type: Number, required: true },
        inactive: { type: Number, required: true }
    }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Dashboard', DashboardSchema);
