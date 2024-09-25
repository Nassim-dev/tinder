import express, { Request, Response } from 'express';
import { Photo } from '../models/Photo';  // Assurez-vous que le chemin est correct

const router = express.Router();

// Créer une nouvelle photo
router.post('/', async (req: Request, res: Response) => {
  try {
    const { url, userId } = req.body;
    
    // Créer une nouvelle instance de photo
    const newPhoto = new Photo({
      url,
      userId
    });

    // Sauvegarder la photo dans la base de données
    const savedPhoto = await newPhoto.save();
    res.status(201).json(savedPhoto);
  } catch (error) {
    console.error('Error creating photo:', error);
    res.status(500).json({ message: 'Error creating photo' });
  }
});

// Récupérer toutes les photos
router.get('/', async (req: Request, res: Response) => {
  try {
    const photos = await Photo.find();
    res.json(photos);
  } catch (error) {
    console.error('Error fetching photos:', error);
    res.status(500).json({ message: 'Error fetching photos' });
  }
});

export default router;
