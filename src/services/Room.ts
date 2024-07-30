import Room from '../models/Rooms';

class RoomService {
  async createRoom(roomData: any) {
    const room = new Room(roomData);
    return await room.save();
  }

  async getRooms() {
    return await Room.find();
  }

  async getRoomById(id: string) {
    return await Room.findById(id);
  }

  async updateRoom(id: string, updateData: any) {
    return await Room.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteRoom(id: string) {
    return await Room.findByIdAndDelete(id);
  }
}

export default new RoomService();
