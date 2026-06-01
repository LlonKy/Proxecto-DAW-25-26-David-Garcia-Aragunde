const express = require('express')
const cors = require('cors')
require('dotenv').config()

if (!process.env.JWT_SECRET) {
  console.error('FATAL: JWT_SECRET environment variable is not defined!')
  process.exit(1)
}

const authRoutes = require('./routes/auth.routes')
const skillRoutes = require('./routes/skill.routes')
const categoryRoutes = require('./routes/category.routes')
const exchangeRoutes = require('./routes/exchange.routes')
const messageRoutes = require('./routes/message.routes')
const ratingRoutes = require('./routes/rating.routes')
const userRoutes = require('./routes/user.routes')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/skills', skillRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/exchanges', exchangeRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/ratings', ratingRoutes)
app.use('/api/users', userRoutes)

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Swaply API running' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})