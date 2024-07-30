import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import Room from './models/Rooms';
import Booking from './models/Booking';
import User from './models/User';
import Comment from './models/CommentsData';

const mongoUri = 'mongodb://localhost:27017/apimiranda';

mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

const seedRooms = async () => {
  for (let i = 0; i < 10; i++) {
    const room = new Room({
      name: faker.commerce.productName(),
      images: [faker.image.url()],
      bedType: faker.helpers.arrayElement(['Single Bed', 'Double Bed', 'Queen Bed', 'King Bed']),
      price: parseFloat(faker.commerce.price()),
      offerPrice: parseFloat(faker.commerce.price()),
      facilities: [
        'AC', 'Shower', 'Double bed', 'Towel', 'Bathup', 'Coffee Set', 'LED TV', 'Wifi'
      ],
      available: faker.datatype.boolean(),
    });
    await room.save();
  }
  console.log('Rooms seeded');
};

const seedBookings = async () => {
  const rooms = await Room.find();
  for (let i = 0; i < 10; i++) {
    const booking = new Booking({
      guest: faker.person.fullName(),
      picture: faker.image.avatar(),
      orderdate: faker.date.past(),
      checkin: faker.date.future(),
      checkout: faker.date.future(),
      note: faker.lorem.sentence(),
      roomtype: faker.helpers.arrayElement(['Single Bed', 'Double Bed', 'Queen Bed', 'King Bed']),
      roomid: faker.helpers.arrayElement(rooms)._id,
      status: faker.helpers.arrayElement(['Check In', 'Check Out']),
    });
    await booking.save();
  }
  console.log('Bookings seeded');
};

const seedUsers = async () => {
  for (let i = 0; i < 10; i++) {
    const hashedPassword = faker.internet.password();
    const user = new User({
      name: faker.person.fullName(),
      photo: faker.image.avatar(),
      email: faker.internet.email(),
      workstation: faker.person.jobTitle(),
      number_phone: faker.phone.number(),
      start_date: faker.date.past(),
      description: faker.lorem.sentence(),
      state: faker.datatype.boolean(),
      password: hashedPassword,
    });
    await user.save();
  }

  // Crear el usuario específico
  const examplePassword = "1234";
  const specificUser = new User({
    name: 'Admin User',
    photo: faker.image.avatar(),
    email: 'adw@gmail.com',
    workstation: 'Administrator',
    number_phone: faker.phone.number(),
    start_date: faker.date.past(),
    description: 'This is a predefined admin user.',
    state: true,
    password: examplePassword,
  });
  await specificUser.save();

  console.log('Users seeded');
};

const seedComments = async () => {
  for (let i = 0; i < 10; i++) {
    const comment = new Comment({
      date: faker.date.past(),
      customer: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      comment: faker.lorem.paragraph(),
      archived: faker.datatype.boolean(),
    });
    await comment.save();
  }
  console.log('Comments seeded');
};

const seedDatabase = async () => {
  await mongoose.connection.dropDatabase();
  console.log('Database dropped');

  await seedRooms();
  await seedBookings();
  await seedUsers();
  await seedComments();

  mongoose.disconnect()
    .then(() => {
      console.log('MongoDB disconnected');
    });
};

seedDatabase().catch(err => {
  console.error(err);
  mongoose.disconnect();
});
