const express = require('express')
const { getMyExchanges, getExchangeById, createExchange, updateExchangeStatus } = require('../controllers/exchange.controller')
const { authMiddleware } = require('../middlewares/auth.middleware')

const router = express.Router()

// Todas protegidas
router.get('/', authMiddleware, getMyExchanges)
router.get('/:id', authMiddleware, getExchangeById)
router.post('/', authMiddleware, createExchange)
router.patch('/:id/status', authMiddleware, updateExchangeStatus)

module.exports = router