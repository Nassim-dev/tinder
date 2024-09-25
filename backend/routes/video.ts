import express, { Request, Response } from 'express';
import { Video } from '../models/Video';  // Assurez-vous que le chemin est correct

const router = express.Router();

// Créer une nouvelle vidéo
router.post('/', async (req: Request, res: Response) => {
  try {
    const { url, userId } = req.body;
    
    // Créer une nouvelle instance de vidéo
    const newVideo = new Video({
      url,
      userId
    });

    // Sauvegarder la vidéo dans la base de données
    const savedVideo = await newVideo.save();
    res.status(201).json(savedVideo);
  } catch (error) {
    console.error('Error creating video:', error);
    res.status(500).json({ message: 'Error creating video' });
  }
});

// Récupérer toutes les vidéos
router.get('/', async (req: Request, res: Response) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ message: 'Error fetching videos' });
  }
});

export default router;
