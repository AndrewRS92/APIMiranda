import User from '../models/User';

class UserService {
  async createUser(userData: any) {
    const user = new User(userData);
    return await user.save();
  }

  async getUsers() {
    return await User.find();
  }

  async getUserById(id: string) {
    return await User.findById(id);
  }

  async getUserByEmail(email: string) {
    return await User.findOne({ email });
  }

  async updateUser(id: string, updateData: any) {
    return await User.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteUser(id: string) {
    return await User.findByIdAndDelete(id);
  }
}

export default new UserService();
