import mongoose, { Schema, Document } from 'mongoose';

// Interface pour le modèle Conversation
export interface IConversation extends Document {
  participants: mongoose.Types.ObjectId[];  // Tableau d'ID d'utilisateurs
  messages: mongoose.Types.ObjectId[];  // Tableau de références aux messages
  createdAt: Date;  // Date de création de la conversation
  updatedAt: Date;  // Dernière mise à jour de la conversation
}

// Schéma pour Conversation
const ConversationSchema: Schema = new Schema({
  participants: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }],  // Liste des utilisateurs dans la conversation
  messages: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Message', 
    required: false 
  }],  // Références aux messages dans cette conversation
  createdAt: { 
    type: Date, 
    default: Date.now 
  },  // Date de création de la conversation
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }  // Dernière mise à jour de la conversation
});

// Middleware pour mettre à jour 'updatedAt' à chaque modification de la conversation
ConversationSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

// Méthode statique pour ajouter un message à une conversation
ConversationSchema.methods.addMessage = async function(messageId: mongoose.Types.ObjectId) {
  this.messages.push(messageId);
  await this.save();
};

export const Conversation = mongoose.model<IConversation>('Conversation', ConversationSchema);