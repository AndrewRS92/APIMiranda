import express from 'express';
import Room from '../services/Room';

const router = express.Router();

router.get('/', (_req, res, _next) => {
  const rooms = Room.fetchAll();
  return res.json(rooms);
});
router.get('/:id', (req, res, next) => {
  const room = Room.fetchOne(Number(req.params.id));
  if (!room) {
    next (res.status(404).json({ message: 'room not found' }));
  }
  res.json(room);
});

export default router; 
