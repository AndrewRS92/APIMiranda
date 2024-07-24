import { User } from '../interfaces/user';
import usersData from '../data/users.json';

export default class UserService {
  static fetchAll(): User[] {
    return usersData;
  }

  static fetchOne(id: string): User | undefined {
    return usersData.find(user => user.id === id);
  }

//   static create(user: User): User {
//     const newUser = { ...user, id: (usersData.length + 1).toString() };
//     usersData.push(newUser);
//     return newUser;
//   }

//   static update(id: string, updatedUser: Partial<User>): User | undefined {
//     const userIndex = usersData.findIndex(user => user.id === id);
//     if (userIndex === -1) {
//       return undefined;
//     }
//     const updated = { ...usersData[userIndex], ...updatedUser };
//     usersData[userIndex] = updated;
//     return updated;
//   }

//   static delete(id: string): boolean {
//     const userIndex = usersData.findIndex(user => user.id === id);
//     if (userIndex === -1) {
//       return false;
//     }
//     usersData.splice(userIndex, 1);
//     return true;
//   }
}
