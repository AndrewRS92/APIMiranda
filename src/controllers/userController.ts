import { Router, Request, Response, NextFunction } from 'express';
import User from '../models/User';

const router = Router();

router.post('/create', async (req: Request, res: Response, _next: NextFunction) => {
  const userData = req.body;
  try {
    const newUser = await User.create(userData);
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating user', error });
  }
});

router.get('/', async (_req: Request, res: Response, _next: NextFunction) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching users', error });
  }
});

export default router;
