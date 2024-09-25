import express, { Request, Response } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcrypt';  

const router = express.Router();

// Créer un utilisateur
router.post('/', async (req: Request, res: Response) => {
  try {
    const { username, email, password, bio, location } = req.body;

    // Hacher le mot de passe avant de sauvegarder
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,  // Utiliser le mot de passe haché
      bio,
      location
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
});

// Récupérer tous les utilisateurs
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

export default router;
