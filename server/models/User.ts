import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  type: { type: String, enum: ['premium', 'basic'], default: 'basic' },
  registeredDate: { type: Date, default: Date.now },
  lastLoginDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const User = mongoose.model('User', userSchema);
