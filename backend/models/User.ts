import mongoose, { Schema, Document } from 'mongoose';

// Interface pour le modèle User
export interface IUser extends Document {
  id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  bio?: string;
  location?: string;
  photos: mongoose.Types.ObjectId[];
  videos: mongoose.Types.ObjectId[];
  matchesA: mongoose.Types.ObjectId[];
  matchesB: mongoose.Types.ObjectId[];
  sentMessages: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

// Schéma pour User
const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String, default: null },
  location: { type: String, default: null },
  photos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Photo' }],
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
  matchesA: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Match' }],
  matchesB: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Match' }],
  sentMessages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true // Active `createdAt` et `updatedAt`
});

export const User = mongoose.model<IUser>('User', UserSchema);
