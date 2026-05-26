const prisma = require('../utils/prisma')

// Obtener conversación entre dos usuarios
const getConversation = async (req, res) => {
    const { userId } = req.params

    try {
        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    { sender_id: req.user.id, receiver_id: parseInt(userId) },
                    { sender_id: parseInt(userId), receiver_id: req.user.id }
                ]
            },
            include: {
                sender: { select: { id: true, name: true, photo: true } },
                receiver: { select: { id: true, name: true, photo: true } }
            },
            orderBy: { created_at: 'asc' }
        })

        res.json(messages)
    } catch (err) {
        console.error('Error al obtener conversación:', err)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
}

// Obtener todas las conversaciones del usuario
const getMyConversations = async (req, res) => {
    try {
        // Obtenemos el último mensaje de cada conversación
        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    { sender_id: req.user.id },
                    { receiver_id: req.user.id }
                ]
            },
            include: {
                sender: { select: { id: true, name: true, photo: true } },
                receiver: { select: { id: true, name: true, photo: true } }
            },
            orderBy: { created_at: 'desc' }
        })

        // Agrupamos por conversación (par de usuarios)
        const conversationsMap = new Map()
        for (const msg of messages) {
            const otherUser = msg.sender_id === req.user.id ? msg.receiver : msg.sender
            if (!conversationsMap.has(otherUser.id)) {
                conversationsMap.set(otherUser.id, { otherUser, lastMessage: msg })
            }
        }

        res.json(Array.from(conversationsMap.values()))
    } catch (err) {
        console.error('Error al obtener conversaciones:', err)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
}

// Enviar mensaje
const sendMessage = async (req, res) => {
    const { receiver_id, content, exchange_id } = req.body

    if (!receiver_id || !content) {
        return res.status(400).json({ error: 'receiver_id y content son obligatorios' })
    }

    if (receiver_id === req.user.id) {
        return res.status(400).json({ error: 'No puedes enviarte mensajes a ti mismo' })
    }

    try {
        console.log('Mensaje enviado de', req.user.id, 'a', receiver_id)

        const message = await prisma.message.create({
            data: {
                sender_id: req.user.id,
                receiver_id: parseInt(receiver_id),
                content,
                exchange_id: exchange_id ? parseInt(exchange_id) : null
            },
            include: {
                sender: { select: { id: true, name: true, photo: true } },
                receiver: { select: { id: true, name: true, photo: true } }
            }
        })

        res.status(201).json(message)
    } catch (err) {
        console.error('Error al enviar mensaje:', err)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
}

module.exports = { getConversation, getMyConversations, sendMessage }