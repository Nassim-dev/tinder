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

    // Vérifiez si le token décodé est un objet JwtPayload et non une chaîne
    if (typeof decodedToken === 'string') {
      return res.status(401).json({ message: 'Invalid token format' });
    }

    // Ajouter les informations utilisateur déchiffrées dans req.user
    req.user = decodedToken as JwtPayload;  // Forcer le type JwtPayload ici

    next();  // Continuer vers la route suivante
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
