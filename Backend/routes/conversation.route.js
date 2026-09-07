const express = require('express');
const conversationController = require('../controllers/conversation.controller');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.post('/conversation',authMiddleware,conversationController.createOrGetConversation);
router.get('/conversations',authMiddleware,conversationController.getConversations);
router.get('/conversation/:conversationId/messages',authMiddleware,conversationController.getMessages);
module.exports = router;