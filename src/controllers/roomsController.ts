import { Router, Request, Response, NextFunction } from 'express';
import RoomService from '../services/Room';

const roomsController = Router();

roomsController.get('/', async (_req: Request, res: Response, _next: NextFunction) => {
  try {
    const rooms = await RoomService.getRooms();
    if (rooms) {
      return res.status(200).json(rooms);
    } else {
      return res.status(404).json({ message: 'Rooms not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching rooms', error });
  }
});

roomsController.get('/:id', async (req: Request, res: Response, _next: NextFunction) => {
  const id = req.params.id;
  try {
    const room = await RoomService.getRoomById(id);
    if (room) {
      return res.status(200).json(room);
    } else {
      return res.status(404).json({ message: `Room with id ${id} not found` });
    }
  } catch (error) {
    return res.status(500).json({ message: `Error fetching room #${id}`, error });
  }
});

roomsController.post('/create', async (req: Request, res: Response, _next: NextFunction) => {
  const roomData = req.body;
  try {
    const newRoom = await RoomService.createRoom(roomData);
    return res.status(201).json(newRoom);
  } catch (error) {
    return res.status(500).json({ message: 'Error adding new room', error });
  }
});

roomsController.put('/update/:id', async (req: Request, res: Response, _next: NextFunction) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const updatedRoom = await RoomService.updateRoom(id, data);
    if (updatedRoom) {
      return res.status(200).json(updatedRoom);
    } else {
      return res.status(404).json({ message: `Room with id ${id} not found` });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error updating room', error });
  }
});

roomsController.delete('/delete/:id', async (req: Request, res: Response, _next: NextFunction) => {
  const id = req.params.id;
  try {
    const deletedRoom = await RoomService.deleteRoom(id);
    if (deletedRoom) {
      return res.status(200).json(deletedRoom);
    } else {
      return res.status(404).json({ message: `Room with id ${id} not found` });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting room', error });
  }
});

export { roomsController };
