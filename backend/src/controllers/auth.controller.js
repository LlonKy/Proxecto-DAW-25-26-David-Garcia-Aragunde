const bcrypt = require('bcryptjs')
const { PrismaClient } = require('@prisma/client')
const { generateToken } = require('../utils/jwt')

const prisma = new PrismaClient()

const register = async (req, res) => {
  const { name, email, password, description } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email and password are required' })
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return res.status(409).json({ error: 'Email already in use' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    console.log("usuario", email)
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        description: description || null,
        role: 'user_free'
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        created_at: true
      }
    })

    const token = generateToken({ id: user.id, email: user.email, role: user.role })

    res.status(201).json({ user, token })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal server error' })
  }
}

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' })
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      console.log('Intento de login:', email)
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = generateToken({ id: user.id, email: user.email, role: user.role })

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal server error' })
  }
}

const getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        photo: true,
        description: true,
        role: true,
        average_rating: true,
        created_at: true
      }
    })

    console.log(req.user.id)

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json(user)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = { register, login, getProfile }