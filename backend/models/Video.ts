import mongoose, { Schema, Document } from 'mongoose';

// Interface pour le modèle Video
export interface IVideo extends Document {
  url: string;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
}

// Schéma pour Video
const VideoSchema: Schema = new Schema({
  url: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

export const Video = mongoose.model<IVideo>('Video', VideoSchema);
