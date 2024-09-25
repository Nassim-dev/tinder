import express, { Request, Response } from 'express';
import { Match } from '../models/Match';  // Assurez-vous que le chemin est correct

const router = express.Router();

// Créer un nouveau match
router.post('/', async (req: Request, res: Response) => {
  try {
    const { userAId, userBId, scoreElo, status } = req.body;

    // Créer une nouvelle instance de match
    const newMatch = new Match({
      userAId,
      userBId,
      scoreElo,
      status
    });

    // Sauvegarder le match dans la base de données
    const savedMatch = await newMatch.save();
    res.status(201).json(savedMatch);
  } catch (error) {
    console.error('Error creating match:', error);
    res.status(500).json({ message: 'Error creating match' });
  }
});

// Récupérer tous les matchs
router.get('/', async (req: Request, res: Response) => {
  try {
    const matches = await Match.find();
    res.json(matches);
  } catch (error) {
    console.error('Error fetching matches:', error);
    res.status(500).json({ message: 'Error fetching matches' });
  }
});

export default router;
