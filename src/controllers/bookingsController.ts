import express from 'express';
import BookingService from '../services/Booking';

const router = express.Router();

router.get('/', (_req, res) => {
  const bookings = BookingService.fetchAll();
  res.json(bookings);
});

router.get('/:id', (req, res, next) => {
  const booking = BookingService.fetchOne(Number(req.params.id));
  if (!booking) {
    next (res.status(404).json({ message: 'Booking not found' }));
  }
  res.json(booking);
});

// router.post('/', (req, res) => {
//   const newBooking = BookingService.create(req.body);
//   res.status(201).json(newBooking);
// });

// router.put('/:id', (req, res) => {
//   const updatedBooking = BookingService.update(Number(req.params.id), req.body);
//   if (!updatedBooking) {
//     return res.status(404).json({ message: 'Booking not found' });
//   }
//   res.json(updatedBooking);
// });

// router.delete('/:id', (req, res) => {
//   const success = BookingService.delete(Number(req.params.id));
//   if (!success) {
//     return res.status(404).json({ message: 'Booking not found' });
//   }
//   res.status(204).send();
// });

export default router;
