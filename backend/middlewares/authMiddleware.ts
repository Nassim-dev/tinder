import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Extension de l'interface Request pour inclure le champ "user"
interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not token provided' });
  }

  const token = authHeader.split(' ')[1];  // Récupérer le token après "Bearer "
  
  try {
    // Vérifier et décoder le token JWT
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    // Ajouter les informations utilisateur déchiffrées dans req.user
    req.user = decodedToken;

    next();  // Continuer vers la route suivante
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: 'Le jeton a expiré' });
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'Jeton invalide' });
    }
    return res.status(500).json({ message: 'Erreur de serveur' });
  }
};
