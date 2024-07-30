import { Schema, model, Document } from 'mongoose';

interface IBooking extends Document {
  guest: string;
  picture: string;
  orderdate: Date;
  checkin: Date;
  checkout: Date;
  note: string;
  roomtype: string;
  roomid: Schema.Types.ObjectId;
  status: string;
}

const bookingSchema = new Schema<IBooking>({
  guest: { type: String, required: true },
  picture: { type: String, required: true },
  orderdate: { type: Date, required: true },
  checkin: { type: Date, required: true },
  checkout: { type: Date, required: true },
  note: { type: String, required: true },
  roomtype: { type: String, required: true },
  roomid: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
  status: { type: String, required: true },
});

const Booking = model<IBooking>('Booking', bookingSchema);

export default Booking;
