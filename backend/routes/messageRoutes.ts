import express from 'express';
import * as messageController from '../controllers/messageController';

const router = express.Router();

router.post('/:chatId/message', messageController.saveMessage);
router.get('/:chatId/messages', messageController.getChatMessages);

export default router;