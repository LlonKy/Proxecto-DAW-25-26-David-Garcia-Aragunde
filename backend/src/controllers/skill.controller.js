const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Obtener todas las skills (con filtros opcionales)
const getSkills = async (req, res) => {
    const { type, category_id, user_id } = req.query;

    try {
        const skills = await prisma.skill.findMany({
            where: {
                ...(type && { type }),
                ...(category_id && { category_id: parseInt(category_id) }),
                ...(user_id && { user_id: parseInt(user_id) }),
            },
            include: {
                user: {
                    select: { id: true, name: true, photo: true, average_rating: true },
                },
                category: true,
            },
            orderBy: { created_at: "desc" },
        });

        res.json(skills);
    } catch (err) {
        console.error("Error al obtener skills:", err);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Obtener una skill por id
const getSkillById = async (req, res) => {
    const { id } = req.params;

    try {
        const skill = await prisma.skill.findUnique({
            where: { id: parseInt(id) },
            include: {
                user: {
                    select: { id: true, name: true, photo: true, average_rating: true },
                },
                category: true,
            },
        });

        if (!skill) {
            return res.status(404).json({ error: "Skill no encontrada" });
        }

        res.json(skill);
    } catch (err) {
        console.error("Error al obtener skill:", err);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Crear skill
const createSkill = async (req, res) => {
    const { name, description, type, category_id } = req.body;

    if (!name || !type || !category_id) {
        return res
            .status(400)
            .json({ error: "Nombre, tipo y categoría son obligatorios" });
    }

    try {
        console.log("Creando skill para usuario:", req.user.id);

        const skill = await prisma.skill.create({
            data: {
                name,
                description: description || null,
                type,
                user_id: req.user.id,
                category_id: parseInt(category_id),
            },
            include: { category: true },
        });

        res.status(201).json(skill);
    } catch (err) {
        console.error("Error al crear skill:", err);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Actualizar skill
const updateSkill = async (req, res) => {
    const { id } = req.params;
    const { name, description, type, category_id } = req.body;

    try {
        const skill = await prisma.skill.findUnique({
            where: { id: parseInt(id) },
        });

        if (!skill) {
            return res.status(404).json({ error: "Skill no encontrada" });
        }

        // Solo el dueño puede editar
        if (skill.user_id !== req.user.id) {
            return res
                .status(403)
                .json({ error: "No tienes permiso para editar esta skill" });
        }

        const updated = await prisma.skill.update({
            where: { id: parseInt(id) },
            data: {
                ...(name && { name }),
                ...(description && { description }),
                ...(type && { type }),
                ...(category_id && { category_id: parseInt(category_id) }),
            },
            include: { category: true },
        });

        res.json(updated);
    } catch (err) {
        console.error("Error al actualizar skill:", err);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Eliminar skill
const deleteSkill = async (req, res) => {
    const { id } = req.params;

    try {
        const skill = await prisma.skill.findUnique({
            where: { id: parseInt(id) },
        });

        if (!skill) {
            return res.status(404).json({ error: "Skill no encontrada" });
        }

        // Solo el dueño o admin puede eliminar
        if (skill.user_id !== req.user.id && req.user.role !== "admin") {
            return res
                .status(403)
                .json({ error: "No tienes permiso para eliminar esta skill" });
        }

        await prisma.skill.delete({ where: { id: parseInt(id) } });
        res.json({ message: "Skill eliminada correctamente" });
    } catch (err) {
        console.error("Error al eliminar skill:", err);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

module.exports = {
    getSkills,
    getSkillById,
    createSkill,
    updateSkill,
    deleteSkill,
};
