import roomData from '../data/RoomData.json';

export default class Room {
  static fetchAll() {
    return roomData;
  }

  static fetchOne(id: number) {
    const room = roomData.find(room => room.id === id);
    if (!room) {
      throw new Error('Room not found');
    }
    return room;
  }
}
