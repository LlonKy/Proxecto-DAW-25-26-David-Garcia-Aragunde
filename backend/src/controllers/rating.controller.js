const prisma = require('../utils/prisma')

// Obtener valoraciones de un usuario
const getUserRatings = async (req, res) => {
    const { userId } = req.params

    try {
        const ratings = await prisma.rating.findMany({
            where: { recipient_id: parseInt(userId) },
            include: {
                author: { select: { id: true, name: true, photo: true } }
            },
            orderBy: { created_at: 'desc' }
        })

        res.json(ratings)
    } catch (err) {
        console.error('Error al obtener valoraciones:', err)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
}

// Crear valoración
const createRating = async (req, res) => {
    const { exchange_id, recipient_id, score, comment } = req.body

    if (!exchange_id || !recipient_id || !score) {
        return res.status(400).json({ error: 'exchange_id, recipient_id y score son obligatorios' })
    }

    if (score < 1 || score > 5) {
        return res.status(400).json({ error: 'El score debe estar entre 1 y 5' })
    }

    if (recipient_id === req.user.id) {
        return res.status(400).json({ error: 'No puedes valorarte a ti mismo' })
    }

    try {
        // Verificar que el intercambio existe y está completado
        const exchange = await prisma.exchange.findUnique({
            where: { id: parseInt(exchange_id) }
        })

        if (!exchange) {
            return res.status(404).json({ error: 'Intercambio no encontrado' })
        }

        if (exchange.status !== 'completed') {
            return res.status(400).json({ error: 'Solo puedes valorar intercambios completados' })
        }

        // Verificar que el usuario es participante
        if (exchange.requester_id !== req.user.id && exchange.receiver_id !== req.user.id) {
            return res.status(403).json({ error: 'No eres participante de este intercambio' })
        }

        // Verificar que no haya valorado ya
        const existing = await prisma.rating.findFirst({
            where: { exchange_id: parseInt(exchange_id), author_id: req.user.id }
        })

        if (existing) {
            return res.status(409).json({ error: 'Ya has valorado este intercambio' })
        }

        console.log('Creando valoración de', req.user.id, 'para', recipient_id)

        const rating = await prisma.rating.create({
            data: {
                exchange_id: parseInt(exchange_id),
                author_id: req.user.id,
                recipient_id: parseInt(recipient_id),
                score: parseInt(score),
                comment: comment || null
            },
            include: {
                author: { select: { id: true, name: true, photo: true } }
            }
        })

        // Actualizar average_rating del receptor
        const allRatings = await prisma.rating.aggregate({
            where: { recipient_id: parseInt(recipient_id) },
            _avg: { score: true }
        })

        await prisma.user.update({
            where: { id: parseInt(recipient_id) },
            data: { average_rating: allRatings._avg.score }
        })

        res.status(201).json(rating)
    } catch (err) {
        console.error('Error al crear valoración:', err)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
}

module.exports = { getUserRatings, createRating }