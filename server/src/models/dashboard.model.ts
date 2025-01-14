import mongoose from 'mongoose';

export interface Widget {
  id: string;
  type: string;
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  config: Record<string, any>;
}

export interface DashboardLayout {
  userId: string;
  widgets: Widget[];
  lastModified: Date;
}

const dashboardSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  widgets: [{
    id: { type: String, required: true },
    type: { type: String, required: true },
    position: {
      x: { type: Number, required: true },
      y: { type: Number, required: true },
      width: { type: Number, required: true },
      height: { type: Number, required: true }
    },
    config: { type: Map, of: mongoose.Schema.Types.Mixed }
  }],
  lastModified: { type: Date, default: Date.now }
});

export const Dashboard = mongoose.model('Dashboard', dashboardSchema);
