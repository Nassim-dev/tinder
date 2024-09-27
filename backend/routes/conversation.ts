import express, { Request, Response } from 'express';
import { Conversation } from '../models/Conversation';
import { User } from '../models/User';

const router = express.Router();

// Créer une nouvelle conversation
router.post('/', async (req: Request, res: Response) => {
  try {
    const { participants } = req.body;

    // Vérifier si les utilisateurs existent
    const users = await User.find({ _id: { $in: participants } });
    if (users.length !== participants.length) {
      return res.status(400).json({ message: 'Un ou plusieurs utilisateurs non valides.' });
    }

    // Créer une nouvelle conversation
    const newConversation = new Conversation({
      participants,
    });

    const savedConversation = await newConversation.save();
    res.status(201).json(savedConversation);
  } catch (error) {
    console.error('Erreur lors de la création de la conversation:', error);
    res.status(500).json({ message: 'Erreur lors de la création de la conversation' });
  }
});

// Récupérer les conversations d'un utilisateur
router.get('/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const conversations = await Conversation.find({ participants: userId })
      .populate('participants', 'username')
      .populate('messages');

    res.json(conversations);
  } catch (error) {
    console.error('Erreur lors de la récupération des conversations:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des conversations' });
  }
});

// Récupérer une conversation spécifique et ses messages
router.get('/:conversationId/messages', async (req: Request, res: Response) => {
  try {
    const { conversationId } = req.params;

    const conversation = await Conversation.findById(conversationId).populate('messages');
    if (!conversation) {
      return res.status(404).json({ message: 'Conversation non trouvée' });
    }

    res.json(conversation.messages);
  } catch (error) {
    console.error('Erreur lors de la récupération des messages de la conversation:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des messages' });
  }
});

export default router;