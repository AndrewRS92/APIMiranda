import UserModel from '../models/User';
import { User as UserType } from '../interfaces/user';

class UserService {
  static async add(userData: UserType): Promise<UserType> {
    try {
      const newUser = new UserModel({
        ...userData,
        start_date: userData.start_date.toString() 
      });
      const savedUser = await newUser.save();
      return savedUser.toObject() as UserType;
    } catch (error) {
      console.error('Error adding user:', error);
      throw new Error('Error adding user');
    }
  }

  static async fetchAll(): Promise<UserType[]> {
    try {
      const users = await UserModel.find().exec();
      return users.map(user => user.toObject()) as UserType[];
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new Error('Error fetching users');
    }
  }

  static async getUserById(id: string): Promise<UserType> {
    try {
      const user = await UserModel.findById(id).exec();
      if (!user) {
        throw new Error(`User with id ${id} not found`);
      }
      return user.toObject() as UserType;
    } catch (error) {
      console.error(`Error fetching user #${id}:`, error);
      throw new Error(`Error fetching user #${id}`);
    }
  }

  static async updateUser(id: string, userData: Partial<UserType>): Promise<UserType> {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(id, userData, { new: true }).exec();
      if (!updatedUser) {
        throw new Error(`User with id ${id} not found`);
      }
      return updatedUser.toObject() as UserType;
    } catch (error) {
      console.error(`Error updating user #${id}:`, error);
      throw new Error(`Error updating user #${id}`);
    }
  }

  static async deleteUser(id: string): Promise<UserType> {
    try {
      const deletedUser = await UserModel.findByIdAndDelete(id).exec();
      if (!deletedUser) {
        throw new Error(`User with id ${id} not found`);
      }
      return deletedUser.toObject() as UserType;
    } catch (error) {
      console.error(`Error deleting user #${id}:`, error);
      throw new Error(`Error deleting user #${id}`);
    }
  }
}

export default UserService;
