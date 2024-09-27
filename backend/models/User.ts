import mongoose, { Schema, Document } from 'mongoose';

// Interface pour le modèle User
export interface IUser extends Document {
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
  gender: string;
  birthdate: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Schéma pour User
const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String, default: null },
  location: { type: String, default: null },
  photos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Photo' }],
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
  matchesA: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Match' }],
  matchesB: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Match' }],
  sentMessages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
  gender: { type: String, required: true, enum: ['homme', 'femme'] },
  birthdate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

export const User = mongoose.model<IUser>('User', UserSchema);