import { Router, Request, Response, NextFunction } from 'express';
import Booking from '../services/Booking';

 export const bookingController = Router();

 bookingController.get('/', async (_req: Request, res: Response, _next: NextFunction) => {

  try {
    const booking = await Booking.getBookings();
    if (booking) {
      return res.status(200).json(booking);
    } else {
      return res.status(404).json({ message: `bookings not found` });
    }
  } catch (error) {
    return res.status(500).json({ message: `Error fetching bookings`, error });
  }
});




bookingController.get('/:id', async (req: Request, res: Response, _next: NextFunction) => {
  const id = req.params.id;
  try {
    const booking = await Booking.getBookingById(id);
    if (booking) {
      return res.status(200).json(booking);
    } else {
      return res.status(404).json({ message: `booking with id ${id} not found` });
    }
  } catch (error) {
    return res.status(500).json({ message: `Error fetching booking #${id}`, error });
  }
});

bookingController.post('/create', async (req: Request, res: Response, _next: NextFunction) => {
  const bookingData = req.body;
  try {
    const newbooking = await Booking.createBooking(bookingData);
    return res.status(201).json(newbooking);
  } catch (error) {
    return res.status(500).json({ message: 'Error adding new booking', error });
  }
});

bookingController.put('/update/:id', async (req: Request, res: Response, _next: NextFunction) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const deletedbooking = await Booking.updateBooking(id,data);
    if (deletedbooking) {
      return res.status(200).json(deletedbooking);
    } else {
      return res.status(404).json({ message: `booking with id ${id} not found` });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting booking', error });
  }
});



bookingController.delete('/delete/:id', async (req: Request, res: Response, _next: NextFunction) => {
  const id = req.params.id;
  try {
    const deletedbooking = await Booking.deleteBooking(id);
    if (deletedbooking) {
      return res.status(200).json(deletedbooking);
    } else {
      return res.status(404).json({ message: `booking with id ${id} not found` });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting booking', error });
  }
});
