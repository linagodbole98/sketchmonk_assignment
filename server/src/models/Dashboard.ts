import mongoose, { Schema, Document } from 'mongoose';

export interface IOverviewStats {
  value: number;
  percentageChange: number;
  trend: 'up' | 'down' | null;
}

export interface IRevenue {
  months: string[];
  totalRevenue: number[];
  totalTarget: number[];
}

export interface ISessionCountry {
  country: string;
  value: number;
  percentage: number;
}

export interface ISalesByRegion {
  regions: string[];
  values: number[];
}

export interface IEcommercePlatform {
  platform: string;
  percentage: number;
}

export interface IRegisteredUsers {
  total: number;
  active: number;
  inactive: number;
}

export interface IDashboard extends Document {
  overview: {
    totalIncome: IOverviewStats;
    profit: IOverviewStats;
    totalViews: IOverviewStats;
    conversionRate: IOverviewStats;
  };
  revenueOverTime: IRevenue;
  sessionsByCountry: ISessionCountry[];
  salesByRegion: ISalesByRegion;
  ecommercePlatform: IEcommercePlatform[];
  registeredUsers: IRegisteredUsers;
  createdAt: Date;
  updatedAt: Date;
}

const DashboardSchema: Schema = new Schema({
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

export default mongoose.model<IDashboard>('Dashboard', DashboardSchema);
