// authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];  // Récupérer le token depuis l'en-tête Authorization
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Vérifier et décoder le token JWT
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);

    // Vérifier que le token décodé contient bien l'ID utilisateur
    if (typeof decodedToken === 'string') {
      return res.status(401).json({ message: 'Invalid token format' });
    }

    // Ajouter les informations utilisateur, y compris l'ID, dans req.user
    req.user = decodedToken as JwtPayload & { _id: string };

    next();  // Continuer vers la route suivante
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
