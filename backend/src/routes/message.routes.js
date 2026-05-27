const express = require('express')
const { getConversation, getMyConversations, sendMessage, getUnreadCount } = require('../controllers/message.controller')
const { authMiddleware } = require('../middlewares/auth.middleware')

const router = express.Router()

router.get('/unread/count', authMiddleware, getUnreadCount)
router.get('/', authMiddleware, getMyConversations)
router.get('/:userId', authMiddleware, getConversation)
router.post('/', authMiddleware, sendMessage)

module.exports = router