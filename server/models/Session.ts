import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  country: { type: String, required: true },
  value: { type: Number, required: true },
  percentage: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Session = mongoose.model('Session', sessionSchema);
