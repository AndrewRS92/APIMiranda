import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

interface IUser extends Document {
  name: string;
  photo: string;
  email: string;
  workstation: string;
  number_phone: string;
  start_date: Date;
  description: string;
  state: boolean;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  photo: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  workstation: { type: String, required: true },
  number_phone: { type: String, required: true },
  start_date: { type: Date, required: true },
  description: { type: String, required: true },
  state: { type: Boolean, required: true },
  password: { type: String, required: true },
});

// Middleware para encriptar la contraseña antes de guardarla
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err as Error);
  }
});

// Método para comparar la contraseña ingresada con la encriptada
userSchema.methods.comparePassword = async function (candidatePassword: string) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = model<IUser>('User', userSchema);

export default User;
