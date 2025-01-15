import mongoose from 'mongoose';

const salesRegionSchema = new mongoose.Schema({
  region: { type: String, required: true },
  value: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const SalesRegion = mongoose.model('SalesRegion', salesRegionSchema);
