import express, { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import mustacheExpress from 'mustache-express';
import path from 'path';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import {roomsController} from './controllers/roomsController';
import { bookingController } from './controllers/bookingsController';
import { userController} from './controllers/userController';
import {commentController}  from './controllers/commentController';
import User from './models/User';
import { authenticateToken as authMiddleware } from './middleware/auth';

dotenv.config();

const app = express();

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  throw new Error('The MongoDB URI is not defined in .env file.');
}

mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Failed to connect to MongoDB', err));



app.post('/login', async (req: Request, res: Response, _next: NextFunction) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: true, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: true, message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.KEY || 'NotFound');
    res.cookie('authorization', token, { httpOnly: true });
    return res.json({ login: 'funciona' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});


app.post('/logout', (_req, res: Response) => {
  res.clearCookie('authorization');
  res.redirect('/');
});


app.use('/rooms', authMiddleware, roomsController);
app.use('/bookings', authMiddleware, bookingController);
app.use('/users', authMiddleware, userController);
app.use('/comments', authMiddleware, commentController);

app.get('/', (_req, res) => {
  res.render('index', { title: 'HOTEL MIRANDA API' });
});

export default app;
