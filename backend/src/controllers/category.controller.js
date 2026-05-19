const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Obtener todas las categorías
const getCategories = async (req, res) => {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { name: 'asc' }
        })
        res.json(categories)
    } catch (err) {
        console.error('Error al obtener categorías:', err)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
}

// Obtener categoría por id
const getCategoryById = async (req, res) => {
    const { id } = req.params
    try {
        const category = await prisma.category.findUnique({
            where: { id: parseInt(id) },
            include: { skills: true }
        })
        if (!category) {
            return res.status(404).json({ error: 'Categoría no encontrada' })
        }
        res.json(category)
    } catch (err) {
        console.error('Error al obtener categoría:', err)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
}

// Crear categoría (solo admin)
const createCategory = async (req, res) => {
    const { name, description } = req.body
    if (!name) {
        return res.status(400).json({ error: 'El nombre es obligatorio' })
    }
    try {
        const category = await prisma.category.create({
            data: { name, description: description || null }
        })
        res.status(201).json(category)
    } catch (err) {
        console.error('Error al crear categoría:', err)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
}

// Eliminar categoría (solo admin)
const deleteCategory = async (req, res) => {
    const { id } = req.params
    try {
        const category = await prisma.category.findUnique({ where: { id: parseInt(id) } })
        if (!category) {
            return res.status(404).json({ error: 'Categoría no encontrada' })
        }
        await prisma.category.delete({ where: { id: parseInt(id) } })
        res.json({ message: 'Categoría eliminada correctamente' })
    } catch (err) {
        console.error('Error al eliminar categoría:', err)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
}

module.exports = { getCategories, getCategoryById, createCategory, deleteCategory }