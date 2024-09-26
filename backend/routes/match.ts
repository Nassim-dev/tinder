import express, { Request, Response } from 'express';
import { Match } from '../models/Match';
import { Conversation } from '../models/Conversation';  // Assurez-vous que le chemin est correct
import { MatchStatus } from '../models/Match';
import mongoose from 'mongoose';  // Assurez-vous que mongoose est importé

const router = express.Router();

// Confirmer un match
router.post('/:matchId/confirm', async (req: Request, res: Response) => {
  try {
    const { matchId } = req.params;

    // Vérifier si le match existe
    const match = await Match.findById(matchId);
    if (!match) {
      return res.status(404).json({ message: 'Match non trouvé' });
    }

    // Vérifier si le match a déjà été confirmé ou rejeté
    if (match.status !== MatchStatus.PENDING) {
      return res.status(400).json({ message: `Le match est déjà ${match.status.toLowerCase()}.` });
    }

    // Créer une conversation lorsque le match est confirmé
    const conversation = new Conversation({
      participants: [match.userAId, match.userBId]
    });

    const savedConversation = await conversation.save();

    // Mettre à jour le match avec la conversationId et changer le statut à MATCHED
    match.conversationId = savedConversation._id as mongoose.Types.ObjectId;  // Utiliser un typecasting pour ObjectId
    match.status = MatchStatus.MATCHED;

    const updatedMatch = await match.save();

    res.status(200).json(updatedMatch);
  } catch (error) {
    console.error('Error confirming match:', error);
    res.status(500).json({ message: 'Error confirming match' });
  }
});

export default router;
