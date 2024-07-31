import { Router, Request, Response, NextFunction } from 'express';
import UserService from '../services/User';
import { User as UserType } from '../interfaces/user';

export const userController = Router();

userController.post('/create', async (req: Request, res: Response, _next: NextFunction) => {
  const userData: UserType = req.body;
  try {
    const newUser = await UserService.add(userData);
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating user', error });
  }
});

userController.get('/', async (_req: Request, res: Response, _next: NextFunction) => {
  try {
    const users = await UserService.fetchAll();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching users', error });
  }
});

userController.get('/:id', async (req: Request, res: Response, _next: NextFunction) => {
  const id = req.params.id;
  try {
    const user = await UserService.getUserById(id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `Error fetching user #${id}`, error });
  }
});

userController.put('/update/:id', async (req: Request, res: Response, _next: NextFunction) => {
  const id = req.params.id;
  const userData: Partial<UserType> = req.body;
  try {
    const updatedUser = await UserService.updateUser(id, userData);
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: `Error updating user #${id}`, error });
  }
});

userController.delete('/delete/:id', async (req: Request, res: Response, _next: NextFunction) => {
  const id = req.params.id;
  try {
    const deletedUser = await UserService.deleteUser(id);
    return res.status(200).json(deletedUser);
  } catch (error) {
    return res.status(500).json({ message: `Error deleting user #${id}`, error });
  }
});
