import mongoose from 'mongoose';

const revenueSchema = new mongoose.Schema({
  month: { type: Date, required: true },
  totalRevenue: { type: Number, required: true },
  totalTarget: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Revenue = mongoose.model('Revenue', revenueSchema);
