import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies['authorization'];
 
  
  if (!token) {
    res.status(401).json({ message: 'Access denied' });
    return; 
  }

  try {
    const verified = jwt.verify(token, process.env.KEY || 'NotFound');
    (req as any).user = verified;
    next(); 
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
    return; 
  }
};
