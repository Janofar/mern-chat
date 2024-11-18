import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from '../models/User';
import * as dotenv from 'dotenv';

dotenv.config();

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/chat-db';

const connectDatabase = async () => {
  try {
    await mongoose.connect(mongoUrl).then(async (res) => {
      console.log('Connected to MongoDB successfully!');
      //  const defaultUsers = [
      //     {
      //       username: 'meena',
      //       email: 'meena1@example.com',
      //       password: await bcrypt.hash('password987', 10),
      //       isOnline: true,
      //       avatar: 'https://example.com/avatar3.jpg',
      //     },
      //     {
      //       username: 'jane_doe',
      //       email: 'jane@example.com',
      //       password: await bcrypt.hash('password456', 10),
      //       isOnline: false,
      //       avatar: 'https://example.com/avatar2.jpg',
      //     },
      //   ];
      //  await User.insertMany(defaultUsers);      
    });

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};


export default connectDatabase;
