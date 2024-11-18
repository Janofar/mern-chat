import express from 'express';
import * as chatController from '../controllers/chatController';
import * as messageController from '../controllers/messageController';

const router = express.Router();

router.post('/direct', chatController.createDirectChat);
router.post('/group', chatController.createGroupChat);
router.get('/user', chatController.getAllChats);
router.get('/:chatId', chatController.fetchChatHistory);
router.post('/:chatId/message', messageController.saveMessage);
router.get('/:chatId/messages', messageController.getChatMessages);


export default router;
