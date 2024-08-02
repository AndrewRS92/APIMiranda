import User from '../models/User';
const bcrypt = require ("bcrypt");
class AuthService {
  async register(userData: any) {
    const user = new User(userData);
    return await user.save();
  }

  async login(email: string, password: string) {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found');
      throw new Error('User not found');
    }
    
    console.log('User found:', user); 

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch); 

    if (!isMatch) {
      throw new Error('Invalid password');
    }

    return { message: 'Login successful', userId: user._id };
  }
}

export default new AuthService();
