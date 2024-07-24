import { Booking } from '../interfaces/booking';
import bookingsData from '../data/BookingsData.json';

export default class BookingService {
  static fetchAll(): Booking[] {
    return bookingsData;
  }

  static fetchOne(id: number): Booking | undefined {
    return bookingsData.find(booking => booking.id === id);
  }

  static create(booking: Booking): Booking {
    const newBooking = { ...booking, id: bookingsData.length + 1 };
    bookingsData.push(newBooking);
    return newBooking;
  }

  static update(id: number, updatedBooking: Partial<Booking>): Booking | undefined {
    const bookingIndex = bookingsData.findIndex(booking => booking.id === id);
    if (bookingIndex === -1) {
      return undefined;
    }
    const updated = { ...bookingsData[bookingIndex], ...updatedBooking };
    bookingsData[bookingIndex] = updated;
    return updated;
  }

  static delete(id: number): boolean {
    const bookingIndex = bookingsData.findIndex(booking => booking.id === id);
    if (bookingIndex === -1) {
      return false;
    }
    bookingsData.splice(bookingIndex, 1);
    return true;
  }
}
