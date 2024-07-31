import RoomModel from '../models/Rooms';
import { Room as RoomType } from '../interfaces/room';

class RoomService {
  static async getRooms(): Promise<RoomType[]> {
    try {
      const rooms = await RoomModel.find().exec();
      return rooms.map(room => room.toObject()) as RoomType[];
    } catch (error) {
      console.error('Error fetching rooms:', error);
      throw new Error('Error fetching rooms');
    }
  }

  static async getRoomById(id: string): Promise<RoomType> {
    try {
      const room = await RoomModel.findById(id).exec();
      if (!room) throw new Error(`Room with id ${id} not found`);
      return room.toObject() as RoomType;
    } catch (error) {
      console.error(`Error fetching room #${id}:`, error);
      throw new Error(`Error fetching room #${id}`);
    }
  }

  static async createRoom(roomData: RoomType): Promise<RoomType> {
    try {
      const newRoom = new RoomModel(roomData);
      const savedRoom = await newRoom.save();
      return savedRoom.toObject() as RoomType;
    } catch (error) {
      console.error('Error adding new room:', error);
      throw new Error('Error adding new room');
    }
  }

  static async updateRoom(id: string, roomData: Partial<RoomType>): Promise<RoomType> {
    try {
      const updatedRoom = await RoomModel.findByIdAndUpdate(id, roomData, { new: true }).exec();
      if (!updatedRoom) throw new Error(`Room with id ${id} not found`);
      return updatedRoom.toObject() as RoomType;
    } catch (error) {
      console.error(`Error updating room #${id}:`, error);
      throw new Error(`Error updating room #${id}`);
    }
  }

  static async deleteRoom(id: string): Promise<RoomType> {
    try {
      const deletedRoom = await RoomModel.findByIdAndDelete(id).exec();
      if (!deletedRoom) throw new Error(`Room with id ${id} not found`);
      return deletedRoom.toObject() as RoomType;
    } catch (error) {
      console.error(`Error deleting room #${id}:`, error);
      throw new Error(`Error deleting room #${id}`);
    }
  }
}

export default RoomService;
