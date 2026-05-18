const express = require('express')
const { getSkills, getSkillById, createSkill, updateSkill, deleteSkill } = require('../controllers/skill.controller')
const { authMiddleware } = require('../middlewares/auth.middleware')

const router = express.Router()

// Públicas
router.get('/', getSkills)
router.get('/:id', getSkillById)

// Protegidas
router.post('/', authMiddleware, createSkill)
router.put('/:id', authMiddleware, updateSkill)
router.delete('/:id', authMiddleware, deleteSkill)

module.exports = router