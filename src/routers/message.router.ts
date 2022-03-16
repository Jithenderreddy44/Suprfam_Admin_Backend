import express from 'express';
import { createMessage } from '../controllers/message.controller';
const router = express.Router();

//create message endpoint
router.post('/messages',createMessage)

export default router;