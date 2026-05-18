const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const prisma = new PrismaClient()

async function main() {
  // Categorías
  await prisma.category.createMany({
    data: [
      { name: 'Tecnología', description: 'Programación, desarrollo web e informática' },
      { name: 'Música', description: 'Instrumentos, teoría musical y producción' },
      { name: 'Idiomas', description: 'Lenguas extranjeras y lingüística' },
      { name: 'Diseño', description: 'Diseño gráfico, UI/UX e ilustración' },
      { name: 'Deporte', description: 'Entrenamiento físico y deportes de equipo' },
      { name: 'Cocina', description: 'Gastronomía, repostería y nutrición' },
      { name: 'Educación', description: 'Tutoría y materias académicas' },
      { name: 'Negocios', description: 'Emprendimiento, marketing y finanzas' },
    ]
  })

  // Usuario admin
  const hashedPassword = await bcrypt.hash('admin1234', 10)
  await prisma.user.create({
    data: {
      name: 'Admin Swaply',
      email: 'admin@swaply.com',
      password: hashedPassword,
      role: 'admin'
    }
  })

  console.log('Seed completado')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())