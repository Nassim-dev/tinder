import express, { Request, Response } from 'express';
import { Message } from '../models/Message';  // Assurez-vous que le chemin est correct
import { Conversation } from '../models/Conversation';  // Assurez-vous que le chemin est correct
import mongoose from 'mongoose';

const router = express.Router();

// Créer un nouveau message
router.post('/', async (req: Request, res: Response) => {
  try {
    const { conversationId, matchId, senderId, content, type } = req.body;

    // Vérifier si la conversation existe
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ message: 'Conversation non trouvée' });
    }

    // Créer une nouvelle instance de message
    const newMessage = new Message({
      matchId,
      senderId,
      content,
      type
    });

    // Sauvegarder le message dans la base de données
    const savedMessage = await newMessage.save();

    // Ajouter le message à la conversation
    conversation.messages.push(savedMessage._id as mongoose.Types.ObjectId);
    await conversation.save();

    res.status(201).json(savedMessage);
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({ message: 'Error creating message' });
  }
});

// Récupérer tous les messages d'une conversation spécifique
router.get('/:conversationId', async (req: Request, res: Response) => {
  try {
    const { conversationId } = req.params;

    // Récupérer la conversation et les messages liés
    const conversation = await Conversation.findById(conversationId).populate('messages');
    if (!conversation) {
      return res.status(404).json({ message: 'Conversation non trouvée' });
    }

    res.json(conversation.messages);
  } catch (error) {
    console.error('Erreur lors de la récupération des messages:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des messages' });
  }
});

export default router;
