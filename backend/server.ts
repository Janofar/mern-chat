import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';
import chatRoutes from './routes/chatRoutes';
import messageRoutes from './routes/messageRoutes';
import connectDatabase from './config/db';
import authRoutes from './routes/userRoutes';
import { authenticate } from './middleware/authMiddleware';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
const corsOptions = {
  //origin : '*',
  origin: 'http://localhost:5173',
  credentials: true, 
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ['Content-Type', 'Authorization'], 
};

app.use(cors(corsOptions));

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

connectDatabase()

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('joinChat', ({chatId}) => {
    console.log(chatId)
    socket.join(chatId);
    console.log(`User ${socket.id} joined chat: ${chatId}`);
  });

  socket.on('sendMessage', async ({ chatId, message }) => {
    //const savedMessage = await getRecentChatMessages(chatId,1,userId);
   // console.log('savedMessage');
    //const savedMessage = await saveMessage(message.sender._id, chatId, message.content);
    io.to(chatId).emit('messageReceived', message);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/api', authRoutes);
app.use(authenticate);
app.use('/api/chats', chatRoutes);
app.use('/api/messages',messageRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
