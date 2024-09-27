import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Interface pour typer req.user
interface JwtPayloadWithId extends jwt.JwtPayload {
  id: string;
  email: string;
}

// Middleware pour vérifier le token JWT
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]; // Récupérer le token du header Authorization
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayloadWithId;
    req.user = decoded; // Ajouter l'objet décodé à req.user
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
