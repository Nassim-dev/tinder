import express, { Request, Response } from 'express';
import { Message } from '../models/Message';  // Assurez-vous que le chemin est correct

const router = express.Router();

// Créer un nouveau message
router.post('/', async (req: Request, res: Response) => {
  try {
    const { matchId, senderId, content, type } = req.body;

    // Créer une nouvelle instance de message
    const newMessage = new Message({
      matchId,
      senderId,
      content,
      type
    });

    // Sauvegarder le message dans la base de données
    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({ message: 'Error creating message' });
  }
});

// Récupérer tous les messages
router.get('/', async (req: Request, res: Response) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Error fetching messages' });
  }
});

export default router;
