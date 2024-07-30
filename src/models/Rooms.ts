import { Schema, model, Document } from 'mongoose';

interface IRoom extends Document {
  name: string;
  images: string[];
  bedType: string;
  price: number;
  offerPrice: number;
  facilities: string[];
  available: boolean;
}

const roomSchema = new Schema<IRoom>({
  name: { type: String, required: true },
  images: { type: [String], required: true },
  bedType: { type: String, required: true },
  price: { type: Number, required: true },
  offerPrice: { type: Number, required: true },
  facilities: { type: [String], required: true },
  available: { type: Boolean, required: true },
});

const Room = model<IRoom>('Room', roomSchema);

export default Room;
