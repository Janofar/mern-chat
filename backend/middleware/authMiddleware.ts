import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import * as dotenv from 'dotenv';
declare global {
  namespace Express {
    interface Request {
      user?: { _id: Types.ObjectId };
    }
  }
}
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const authenticate = (req: any, res: any, next: any) => {

  if (req.path === '/login' || req.path === '/logout') {
    return next();
  }

  const token = req.cookies.authToken;

  if (!token) {
    return res.status(401).json({ message: 'Authentication required.' });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET as string);
    req.user = verified;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      console.log("Token expired");
    } else {
      console.log("JWT verification error:", error);
    }
    res.status(401).json({ message: 'Invalid token.' });
  }
};
