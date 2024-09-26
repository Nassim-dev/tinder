import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Define your custom AuthenticatedRequest
interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}


export function verifyToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1]; // Extract the token after "Bearer "

  try {
    // Verify and decode the JWT
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);

    // Ensure the token is a valid JwtPayload and not a string
    if (typeof decodedToken === 'string') {
      return res.status(401).json({ message: 'Invalid token format' });
    }

    // Attach user info to the request object
    req.user = decodedToken as JwtPayload; // Type casting to JwtPayload

    next(); // Proceed to the next middleware or route
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: 'Token expired' });
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    return res.status(500).json({ message: 'Server error' });
  }
}
