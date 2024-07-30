import Booking from '../models/Booking';
import {Booking as Ibooking}  from '../interfaces/booking';

class BookingService {
  async createBooking(bookingData: any) {
    const booking = new Booking(bookingData);
    return await booking.save();
  }

  async getBookings() {
    return await Booking.find().exec()
  }

  async getBookingById(id: string) {
    return await Booking.findById(id).exec()
  }

  async updateBooking(id: string, updateData: Partial<Ibooking>) {
    return await Booking.findByIdAndUpdate(id,updateData, {new:true}).exec();
  }

  async deleteBooking(id: string) {
    return await Booking.findByIdAndDelete(id).exec();
  }
}

export default new BookingService();
