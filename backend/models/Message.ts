import mongoose, { Schema, Document } from 'mongoose';

// Enum pour MessageType
export enum MessageType {
  TEXT = 'TEXT',
  PHOTO = 'PHOTO',
  VIDEO = 'VIDEO'
}

// Interface pour le modèle Message
export interface IMessage extends Document {
  matchId: mongoose.Types.ObjectId;
  senderId: mongoose.Types.ObjectId;
  content: string;
  type: MessageType;
  timestamp: Date;
}

// Schéma pour Message
const MessageSchema: Schema = new Schema({
  matchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Match', required: true },  // Référence à un match
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Référence à un utilisateur
  content: { type: String, required: true },  // Contenu du message
  type: { type: String, enum: Object.values(MessageType), required: true },  // Type de message
  timestamp: { type: Date, default: Date.now }  // Timestamp pour la date de création
});

export const Message = mongoose.model<IMessage>('Message', MessageSchema);
