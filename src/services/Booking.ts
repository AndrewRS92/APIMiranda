import BookingModel from '../models/Booking';
import { Booking as BookingType } from '../interfaces/booking';

class BookingService {
  static async createBooking(bookingData: BookingType): Promise<BookingType> {
    try {
      const newBooking = new BookingModel(bookingData);
      const savedBooking = await newBooking.save();
      return savedBooking.toObject() as BookingType;
    } catch (error) {
      console.error('Error adding new booking:', error);
      throw new Error('Error adding new booking');
    }
  }

  static async getBookings(): Promise<BookingType[]> {
    try {
      const bookings = await BookingModel.find().exec();
      return bookings.map(booking => booking.toObject()) as BookingType[];
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw new Error('Error fetching bookings');
    }
  }

  static async getBookingById(id: string): Promise<BookingType> {
    try {
      const booking = await BookingModel.findById(id).exec();
      if (!booking) {
        throw new Error(`Booking with id ${id} not found`);
      }
      return booking.toObject() as BookingType;
    } catch (error) {
      console.error(`Error fetching booking #${id}:`, error);
      throw new Error(`Error fetching booking #${id}`);
    }
  }

  static async updateBooking(id: string, bookingData: Partial<BookingType>): Promise<BookingType> {
    try {
      const updatedBooking = await BookingModel.findByIdAndUpdate(id, bookingData, { new: true }).exec();
      if (!updatedBooking) {
        throw new Error(`Error updating booking #${id}`);
      }
      return updatedBooking.toObject() as BookingType;
    } catch (error) {
      console.error(`Error updating booking #${id}:`, error);
      throw new Error(`Error updating booking #${id}`);
    }
  }

  static async deleteBooking(id: string): Promise<BookingType> {
    try {
      const deletedBooking = await BookingModel.findByIdAndDelete(id).exec();
      if (!deletedBooking) {
        throw new Error(`Error deleting booking #${id}`);
      }
      return deletedBooking.toObject() as BookingType;
    } catch (error) {
      console.error(`Error deleting booking #${id}:`, error);
      throw new Error(`Error deleting booking #${id}`);
    }
  }
}

export default BookingService;
