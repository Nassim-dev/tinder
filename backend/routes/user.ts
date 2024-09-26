import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { verifyToken } from '../middlewares/authMiddleware';

const router = express.Router();  

// Inscription - Créer un utilisateur
router.post('/signup', async (req: Request, res: Response) => {
  try {
    const { username, email, password, bio, location } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'L\'utilisateur existe déjà' });
    }

    // Hacher le mot de passe avant de sauvegarder
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,  
      bio,
      location
    });

    const savedUser = await newUser.save();

    // Générer un token JWT pour l'utilisateur
    const token = jwt.sign(
      { id: savedUser._id, email: savedUser.email },
      process.env.JWT_SECRET!,  
      { expiresIn: '1h' }
    );

    res.status(201).json({
      message: 'Utilisateur créé avec succès',
      token,
      user: savedUser
    });
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur:', error);
    res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur' });
  }
});

// Connexion - Authentification d'un utilisateur
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Vérifier le mot de passe
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Générer un token JWT pour l'utilisateur
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    res.status(200).json({ token, user });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
});

// Route protégée - Récupérer le profil de l'utilisateur connecté
router.get('/profile', verifyToken, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    // Vérifier si l'utilisateur est authentifié
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: No valid user information' });
    }

    console.log("User ID from token:", userId);  // Debug log

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Error fetching user profile' });
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
