const express = require('express')
const { getCategories, getCategoryById, createCategory, deleteCategory } = require('../controllers/category.controller')
const { authMiddleware, adminMiddleware } = require('../middlewares/auth.middleware')

const router = express.Router()

// Públicas
router.get('/', getCategories)
router.get('/:id', getCategoryById)

// Solo admin
router.post('/', authMiddleware, adminMiddleware, createCategory)
router.delete('/:id', authMiddleware, adminMiddleware, deleteCategory)

module.exports = router