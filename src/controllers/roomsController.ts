import { Router, Request, Response, NextFunction } from 'express';
import Room from '../models/Rooms';

const router = Router();

router.get('/:id', async (req: Request, res: Response, _next: NextFunction) => {
  const id = req.params.id;
  try {
    const room = await Room.findById(id);
    if (room) {
      return res.status(200).json(room);
    } else {
      return res.status(404).json({ message: `Room with id ${id} not found` });
    }
  } catch (error) {
    return res.status(500).json({ message: `Error fetching room #${id}`, error });
  }
});

router.post('/create', async (req: Request, res: Response, _next: NextFunction) => {
  const roomData = req.body;
  try {
    const newRoom = await Room.create(roomData);
    return res.status(201).json(newRoom);
  } catch (error) {
    return res.status(500).json({ message: 'Error adding new room', error });
  }
});

router.delete('/:id', async (req: Request, res: Response, _next: NextFunction) => {
  const id = req.params.id;
  try {
    const deletedRoom = await Room.findByIdAndDelete(id);
    if (deletedRoom) {
      return res.status(200).json(deletedRoom);
    } else {
      return res.status(404).json({ message: `Room with id ${id} not found` });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting room', error });
  }
});

export default router;
