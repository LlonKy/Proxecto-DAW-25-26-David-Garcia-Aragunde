const express = require('express')
const { getUserRatings, createRating } = require('../controllers/rating.controller')
const { authMiddleware } = require('../middlewares/auth.middleware')

const router = express.Router()

router.get('/user/:userId', getUserRatings)
router.post('/', authMiddleware, createRating)

module.exports = router