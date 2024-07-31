import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface CustomRequest extends Request {
  user?: any;
}

export const authenticateToken = (req: CustomRequest, res: Response, next: NextFunction): Response | void => {
  const token = req.cookies.authorization;
  if (!token) {
    return res.status(401).json({ error: true, message: 'Access denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.KEY || 'NotFound');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: true, message: 'Invalid token' });
  }
};
