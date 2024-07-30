import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import RoomService from './services/Room';
import BookingService from './services/Booking';
import UserService from './services/User';
import CommentService from './services/Comment';
import authRoutes from './routes/auth'; // Importar las rutas de autenticación

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

// Conexión a la base de datos
mongoose.connect('mongodb://localhost:27017/apimiranda')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Rutas para Room
app.post('/rooms', async (req, res) => {
  try {
    const savedRoom = await RoomService.createRoom(req.body);
    res.status(201).json(savedRoom);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'Unknown error occurred' });
    }
  }
});

app.get('/rooms', async (_req, res) => {
  try {
    const rooms = await RoomService.getRooms();
    res.status(200).json(rooms);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'Unknown error occurred' });
    }
  }
});

// Rutas para Booking
app.post('/bookings', async (req, res) => {
  try {
    const savedBooking = await BookingService.createBooking(req.body);
    res.status(201).json(savedBooking);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'Unknown error occurred' });
    }
  }
});

app.get('/bookings', async (_req, res) => {
  try {
    const bookings = await BookingService.getBookings();
    res.status(200).json(bookings);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'Unknown error occurred' });
    }
  }
});

// Rutas para User
app.post('/users', async (req, res) => {
  try {
    const savedUser = await UserService.createUser(req.body);
    res.status(201).json(savedUser);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'Unknown error occurred' });
    }
  }
});

app.get('/users', async (_req, res) => {
  try {
    const users = await UserService.getUsers();
    res.status(200).json(users);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'Unknown error occurred' });
    }
  }
});

// Rutas para Comment
app.post('/postcomments', async (req, res) => {
  try {
    const savedComment = await CommentService.createComment(req.body);
    res.status(201).json(savedComment);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'Unknown error occurred' });
    }
  }
});

app.get('/comments', async (_req, res) => {
  try {
    const comments = await CommentService.getComments();
    res.status(200).json(comments);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'Unknown error occurred' });
    }
  }
});

// Usar las rutas de autenticación
app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
