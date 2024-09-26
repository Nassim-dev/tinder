import mongoose, { Schema, Document } from 'mongoose';
import { Conversation } from './Conversation';  // Assurez-vous que le chemin est correct

// Enum pour le statut du match
export enum MatchStatus {
  PENDING = 'PENDING',
  MATCHED = 'MATCHED',
  REJECTED = 'REJECTED'
}

// Interface pour le modèle Match
export interface IMatch extends Document {
  userAId: mongoose.Types.ObjectId;
  userBId: mongoose.Types.ObjectId;
  scoreElo: number;
  status: MatchStatus;
  conversationId: mongoose.Types.ObjectId;  // Nouveau champ pour stocker la conversation associée
  createdAt: Date;
  updatedAt: Date;
}

// Schéma pour Match
const MatchSchema: Schema = new Schema({
  userAId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userBId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  scoreElo: { type: Number, default: 1000 },
  status: { type: String, enum: Object.values(MatchStatus), default: MatchStatus.PENDING },
  conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' },  // Référence à la conversation
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

export const Match = mongoose.model<IMatch>('Match', MatchSchema);
