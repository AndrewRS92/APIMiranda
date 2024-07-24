import express, { NextFunction,Request,Response } from 'express';
import cookieParser from 'cookie-parser';
import mustacheExpress from 'mustache-express';
import path from 'path';
import roomsController from './controllers/roomsController';
import bookingsController from './controllers/bookingsController';
import userController from './controllers/userController';
import commentController from './controllers/commentController';
import { authenticateToken as authMiddleware } from './middleware/auth';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const app = express();


app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.post('/login', (req: Request, res: Response, _next: NextFunction) => {
  const { email, password } = req.body;
  console.log(req.body)
  if (email === 'adw@gmail.com' && password === '1234') {
      const token = jwt.sign({email, password},process.env.KEY || 'NotFound');
       res.cookie('authorization', token, {httpOnly:true});
      return res.redirect('/')
  } else {
      return res.status(401).json({error: true, message: 'Invalid credentials'});
  }
});
app.post('/logout', (_req, res: Response) => {
  res.clearCookie('authorization');
  res.redirect('/');
});
app.use('/rooms', authMiddleware, roomsController);
app.use('/bookings', authMiddleware, bookingsController);
app.use('/users', authMiddleware, userController);
app.use('/comments', authMiddleware, commentController);


app.get('/', (_req, res) => {
  res.render('index', { title: 'HOTEL MIRANDA API' });
});

export default app;
