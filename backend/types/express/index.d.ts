// types/express/index.d.ts
import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload & { _id?: string }; // Inclure l'ID de l'utilisateur dans JwtPayload
    }
  }
}
