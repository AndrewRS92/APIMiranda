import Booking from '../models/Booking';

class BookingService {
  async createBooking(bookingData: any) {
    const booking = new Booking(bookingData);
    return await booking.save();
  }

  async getBookings() {
    return await Booking.find().populate('roomid');
  }

  async getBookingById(id: string) {
    return await Booking.findById(id).populate('roomid');
  }

  async updateBooking(id: string, updateData: any) {
    return await Booking.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteBooking(id: string) {
    return await Booking.findByIdAndDelete(id);
  }
}

export default new BookingService();
