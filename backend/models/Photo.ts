import mongoose, { Schema, Document } from 'mongoose';

// Interface pour le modèle Photo
export interface IPhoto extends Document {
  url: string;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
}

// Schéma pour Photo
const PhotoSchema: Schema = new Schema({
  url: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Référence à l'utilisateur
  createdAt: { type: Date, default: Date.now }
});

// Export du modèle Photo
export const Photo = mongoose.model<IPhoto>('Photo', PhotoSchema);
