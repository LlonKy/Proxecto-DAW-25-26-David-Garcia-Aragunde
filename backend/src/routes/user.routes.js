const express = require('express')
const { getUserById, getAllUsers, updateProfile, changePassword, deleteUser } = require('../controllers/user.controller')
const { authMiddleware, adminMiddleware } = require('../middlewares/auth.middleware')

const router = express.Router()

// Públicas
router.get('/:id', getUserById)

// Protegidas
router.put('/profile', authMiddleware, updateProfile)
router.put('/profile/password', authMiddleware, changePassword)

// Solo admin
router.get('/', authMiddleware, adminMiddleware, getAllUsers)
router.delete('/:id', authMiddleware, adminMiddleware, deleteUser)

module.exports = router