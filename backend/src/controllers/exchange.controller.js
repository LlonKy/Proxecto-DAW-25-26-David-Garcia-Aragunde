const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Obtener intercambios del usuario
const getMyExchanges = async (req, res) => {
    try {
        const exchanges = await prisma.exchange.findMany({
            where: {
                OR: [
                    { requester_id: req.user.id },
                    { receiver_id: req.user.id }
                ]
            },
            include: {
                requester: { select: { id: true, name: true, photo: true } },
                receiver: { select: { id: true, name: true, photo: true } },
                skill_exchanges: { include: { skill: true } }
            },
            orderBy: { created_at: 'desc' }
        })
        res.json(exchanges)
    } catch (err) {
        console.error('Error al obtener intercambios:', err)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
}

// Obtener intercambio por id
const getExchangeById = async (req, res) => {
    const { id } = req.params
    try {
        const exchange = await prisma.exchange.findUnique({
            where: { id: parseInt(id) },
            include: {
                requester: { select: { id: true, name: true, photo: true } },
                receiver: { select: { id: true, name: true, photo: true } },
                skill_exchanges: { include: { skill: true } },
                ratings: true
            }
        })

        if (!exchange) {
            return res.status(404).json({ error: 'Intercambio no encontrado' })
        }

        // Solo los participantes pueden verlo
        if (exchange.requester_id !== req.user.id && exchange.receiver_id !== req.user.id) {
            return res.status(403).json({ error: 'No tienes acceso a este intercambio' })
        }

        res.json(exchange)
    } catch (err) {
        console.error('Error al obtener intercambio:', err)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
}

// Crear intercambio
const createExchange = async (req, res) => {
    const { receiver_id, offered_skill_id, requested_skill_id } = req.body

    if (!receiver_id || !offered_skill_id || !requested_skill_id) {
        return res.status(400).json({ error: 'receiver_id, offered_skill_id y requested_skill_id son obligatorios' })
    }

    if (receiver_id === req.user.id) {
        return res.status(400).json({ error: 'No puedes crear un intercambio contigo mismo' })
    }

    try {
        console.log('Creando intercambio entre usuarios:', req.user.id, 'y', receiver_id)

        const exchange = await prisma.exchange.create({
            data: {
                requester_id: req.user.id,
                receiver_id: parseInt(receiver_id),
                skill_exchanges: {
                    create: [
                        { skill_id: parseInt(offered_skill_id), role: 'offered' },
                        { skill_id: parseInt(requested_skill_id), role: 'received' }
                    ]
                }
            },
            include: {
                requester: { select: { id: true, name: true } },
                receiver: { select: { id: true, name: true } },
                skill_exchanges: { include: { skill: true } }
            }
        })

        res.status(201).json(exchange)
    } catch (err) {
        console.error('Error al crear intercambio:', err)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
}

// Actualizar estado del intercambio
const updateExchangeStatus = async (req, res) => {
    const { id } = req.params
    const { status } = req.body

    const validStatuses = ['accepted', 'rejected', 'in_progress', 'completed']
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Estado no válido' })
    }

    try {
        const exchange = await prisma.exchange.findUnique({ where: { id: parseInt(id) } })

        if (!exchange) {
            return res.status(404).json({ error: 'Intercambio no encontrado' })
        }

        // Solo los participantes pueden cambiar el estado
        if (exchange.requester_id !== req.user.id && exchange.receiver_id !== req.user.id) {
            return res.status(403).json({ error: 'No tienes permiso para modificar este intercambio' })
        }

        console.log('Actualizando estado del intercambio', id, 'a:', status)

        const updated = await prisma.exchange.update({
            where: { id: parseInt(id) },
            data: { status },
            include: {
                requester: { select: { id: true, name: true } },
                receiver: { select: { id: true, name: true } },
                skill_exchanges: { include: { skill: true } }
            }
        })

        res.json(updated)
    } catch (err) {
        console.error('Error al actualizar intercambio:', err)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
}

module.exports = { getMyExchanges, getExchangeById, createExchange, updateExchangeStatus }