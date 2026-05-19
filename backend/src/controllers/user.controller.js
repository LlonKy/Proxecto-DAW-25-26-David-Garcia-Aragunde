const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const prisma = new PrismaClient()

// Obtener perfil de un usuario por id
const getUserById = async (req, res) => {
  const { id } = req.params

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        name: true,
        photo: true,
        description: true,
        role: true,
        average_rating: true,
        created_at: true,
        skills: {
          include: { category: true }
        }
      }
    })

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }

    res.json(user)
  } catch (err) {
    console.error('Error al obtener usuario:', err)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

// Obtener todos los usuarios (solo admin)
const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        photo: true,
        role: true,
        average_rating: true,
        created_at: true
      },
      orderBy: { created_at: 'desc' }
    })

    res.json(users)
  } catch (err) {
    console.error('Error al obtener usuarios:', err)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

// Editar perfil propio
const updateProfile = async (req, res) => {
  const { name, description, photo } = req.body

  try {
    console.log('Actualizando perfil del usuario:', req.user.id)

    const updated = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        ...(name && { name }),
        ...(description && { description }),
        ...(photo && { photo })
      },
      select: {
        id: true,
        name: true,
        email: true,
        photo: true,
        description: true,
        role: true,
        average_rating: true
      }
    })

    res.json(updated)
  } catch (err) {
    console.error('Error al actualizar perfil:', err)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

// Cambiar contraseña
const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Las contraseñas son obligatorias' })
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ error: 'La nueva contraseña debe tener al menos 6 caracteres' })
  }

  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } })

    const valid = await bcrypt.compare(currentPassword, user.password)
    if (!valid) {
      return res.status(401).json({ error: 'La contraseña actual no es correcta' })
    }

    const hashed = await bcrypt.hash(newPassword, 10)
    await prisma.user.update({
      where: { id: req.user.id },
      data: { password: hashed }
    })

    res.json({ message: 'Contraseña actualizada correctamente' })
  } catch (err) {
    console.error('Error al cambiar contraseña:', err)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

// Eliminar usuario (solo admin)
const deleteUser = async (req, res) => {
  const { id } = req.params

  try {
    const user = await prisma.user.findUnique({ where: { id: parseInt(id) } })
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }

    await prisma.user.delete({ where: { id: parseInt(id) } })
    res.json({ message: 'Usuario eliminado correctamente' })
  } catch (err) {
    console.error('Error al eliminar usuario:', err)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

module.exports = { getUserById, getAllUsers, updateProfile, changePassword, deleteUser }