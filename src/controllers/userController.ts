import express, { Request, Response } from 'express';
import UserService from '../services/User';

const router = express.Router();

router.get('/', (_req, res) => {
  const users = UserService.fetchAll();
  res.json(users);
});

router.get('/:id', (req: Request, res: Response, next) => {
  const user = UserService.fetchOne(req.params.id);
  if (!user) {
    next(res.status(404).json({ message: 'User not found' })) ;
  }
  res.json(user);
});

// router.post('/', (req, res) => {
//   const newUser = UserService.create(req.body);
//   res.status(201).json(newUser);
// });

// router.put('/:id', (req: Request , res: Response) => {
//   const updatedUser = UserService.update(req.params.id, req.body);
//   if (!updatedUser) {
//     return res.status(404).json({ message: 'User not found' });
//   }
//   res.json(updatedUser);
// });

// router.delete('/:id', (req, res) => {
//   const success = UserService.delete(req.params.id);
//   if (!success) {
//     return res.status(404).json({ message: 'User not found' });
//   }
//   res.status(204).send();
// });

export default router;

