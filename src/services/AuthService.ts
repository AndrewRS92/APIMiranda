import User from '../models/User';
import UserService from './User';

class AuthService {
  async register(userData: any) {
    const user = new User(userData);
    return await user.save();
  }

  async login(email: string, password: string) {
    const user = await UserService.getUserByEmail(email);
    if (user && await user.comparePassword(password)) {
      // Aquí puedes generar y devolver un token de autenticación (por ejemplo, JWT)
      return { message: 'Login successful', userId: user._id };
    } else {
      throw new Error('Invalid email or password');
    }
  }
}

export default new AuthService();
