import mongoose from 'mongoose';

const ecommercePlatformSchema = new mongoose.Schema({
  platform: { type: String, required: true },
  percentage: { type: Number, required: true },
  sales: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const EcommercePlatform = mongoose.model('EcommercePlatform', ecommercePlatformSchema);
