import mongoose, { Schema, Document } from 'mongoose';

// Enum pour le statut du match
export enum MatchStatus {
  PENDING = 'PENDING',
  MATCHED = 'MATCHED',
  REJECTED = 'REJECTED'
}

// Interface pour le modèle Match
export interface IMatch extends Document {
  userAId: mongoose.Types.ObjectId;  // Référence à l'utilisateur A
  userBId: mongoose.Types.ObjectId;  // Référence à l'utilisateur B
  scoreElo: number;  // Score Elo du match
  status: MatchStatus;  // Statut du match (PENDING, MATCHED, REJECTED)
  messages: mongoose.Types.ObjectId[];  // Référence aux messages du match
  createdAt: Date;
  updatedAt: Date;
}

// Schéma pour Match
const MatchSchema: Schema = new Schema({
  userAId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Référence utilisateur A
  userBId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Référence utilisateur B
  scoreElo: { type: Number, default: 1000 },  // Score Elo initialisé à 1000
  status: { type: String, enum: Object.values(MatchStatus), default: MatchStatus.PENDING },  // Statut du match
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],  // Référence aux messages du match
  createdAt: { type: Date, default: Date.now },  // Date de création
  updatedAt: { type: Date, default: Date.now }  // Date de mise à jour
}, {
  timestamps: true  // Active automatiquement `createdAt` et `updatedAt`
});

export const Match = mongoose.model<IMatch>('Match', MatchSchema);
