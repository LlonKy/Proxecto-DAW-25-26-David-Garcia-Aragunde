const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed...')

  // ─── CATEGORÍAS ───────────────────────────────────────────────────────────
  await prisma.category.createMany({
    data: [
      { name: 'Tecnología',  description: 'Programación, desarrollo web e informática' },
      { name: 'Música',      description: 'Instrumentos, teoría musical y producción' },
      { name: 'Idiomas',     description: 'Lenguas extranjeras y lingüística' },
      { name: 'Diseño',      description: 'Diseño gráfico, UI/UX e ilustración' },
      { name: 'Deporte',     description: 'Entrenamiento físico y deportes de equipo' },
      { name: 'Cocina',      description: 'Gastronomía, repostería y nutrición' },
      { name: 'Educación',   description: 'Tutoría y materias académicas' },
      { name: 'Negocios',    description: 'Emprendimiento, marketing y finanzas' },
    ],
    skipDuplicates: true,
  })
  console.log('✅ Categorías creadas')

  const cats = await prisma.category.findMany()
  const catMap = Object.fromEntries(cats.map(c => [c.name, c.id]))

  // ─── USUARIOS ─────────────────────────────────────────────────────────────
  const password = await bcrypt.hash('password123', 10)
  const adminPassword = await bcrypt.hash('admin1234', 10)

  const usersData = [
    {
      name: 'Admin Swaply',
      email: 'admin@swaply.com',
      password: adminPassword,
      role: 'admin',
      description: 'Administrador de la plataforma Swaply.',
    },
    {
      name: 'Carlos Méndez',
      email: 'carlos@swaply.com',
      password,
      role: 'user_free',
      description: 'Desarrollador web con pasión por React y Node.js.',
    },
    {
      name: 'Laura Gómez',
      email: 'laura@swaply.com',
      password,
      role: 'user_premium',
      description: 'Diseñadora UX/UI con 5 años de experiencia en startups.',
    },
    {
      name: 'Iván Torres',
      email: 'ivan@swaply.com',
      password,
      role: 'user_free',
      description: 'Guitarrista y productor musical aficionado.',
    },
    {
      name: 'Sofía Ruiz',
      email: 'sofia@swaply.com',
      password,
      role: 'user_premium',
      description: 'Profesora de inglés y francés, amante de los viajes.',
    },
    {
      name: 'Marcos Delgado',
      email: 'marcos@swaply.com',
      password,
      role: 'user_free',
      description: 'Entrenador personal y nutricionista amateur.',
    },
    {
      name: 'Elena Vidal',
      email: 'elena@swaply.com',
      password,
      role: 'user_free',
      description: 'Chef casera especializada en repostería francesa.',
    },
    {
      name: 'Pablo Serrano',
      email: 'pablo@swaply.com',
      password,
      role: 'user_premium',
      description: 'Emprendedor en serie, mentor de startups.',
    },
    {
      name: 'Nadia Ortiz',
      email: 'nadia@swaply.com',
      password,
      role: 'user_free',
      description: 'Estudiante de matemáticas, tutora de bachillerato.',
    },
    {
      name: 'Diego Fernández',
      email: 'diego@swaply.com',
      password,
      role: 'user_free',
      description: 'Ilustrador digital y fanático del pixel art.',
    },
  ]

  for (const userData of usersData) {
    await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: userData,
    })
  }
  console.log('✅ Usuarios creados')

  const users = await prisma.user.findMany({ where: { role: { not: 'admin' } } })
  const [carlos, laura, ivan, sofia, marcos, elena, pablo, nadia, diego] = users

  // ─── SKILLS ───────────────────────────────────────────────────────────────
  const skillsData = [
    // Carlos
    { name: 'Desarrollo React',        description: 'Componentes, hooks y gestión de estado con Redux.',   type: 'offering', user_id: carlos.id, category_id: catMap['Tecnología'] },
    { name: 'Clases de guitarra',       description: 'Quiero aprender guitarra desde cero.',               type: 'seeking',  user_id: carlos.id, category_id: catMap['Música'] },
    // Laura
    { name: 'Diseño de interfaces',     description: 'Figma, prototipado y sistemas de diseño.',           type: 'offering', user_id: laura.id,  category_id: catMap['Diseño'] },
    { name: 'Programación backend',     description: 'Busco aprender Node.js y bases de datos.',           type: 'seeking',  user_id: laura.id,  category_id: catMap['Tecnología'] },
    // Iván
    { name: 'Guitarra eléctrica',       description: 'Enseño desde nivel básico hasta avanzado.',          type: 'offering', user_id: ivan.id,   category_id: catMap['Música'] },
    { name: 'Diseño de flyers',         description: 'Necesito ayuda para promocionar mis clases.',        type: 'seeking',  user_id: ivan.id,   category_id: catMap['Diseño'] },
    // Sofía
    { name: 'Clases de inglés B2-C1',   description: 'Preparación para Cambridge y conversación fluida.',  type: 'offering', user_id: sofia.id,  category_id: catMap['Idiomas'] },
    { name: 'Nutrición deportiva',      description: 'Quiero mejorar mi alimentación para correr.',        type: 'seeking',  user_id: sofia.id,  category_id: catMap['Deporte'] },
    // Marcos
    { name: 'Entrenamiento funcional',  description: 'Planes personalizados de fuerza y cardio.',          type: 'offering', user_id: marcos.id, category_id: catMap['Deporte'] },
    { name: 'Inglés para viajes',       description: 'Necesito inglés básico conversacional.',             type: 'seeking',  user_id: marcos.id, category_id: catMap['Idiomas'] },
    // Elena
    { name: 'Repostería francesa',      description: 'Croissants, macarons y tartas artesanales.',         type: 'offering', user_id: elena.id,  category_id: catMap['Cocina'] },
    { name: 'Excel y hojas de cálculo', description: 'Quiero gestionar mejor mi negocio.',                 type: 'seeking',  user_id: elena.id,  category_id: catMap['Tecnología'] },
    // Pablo
    { name: 'Mentoría de negocios',     description: 'Validación de ideas, pitching e inversión.',         type: 'offering', user_id: pablo.id,  category_id: catMap['Negocios'] },
    { name: 'Cocina saludable',         description: 'Busco recetas rápidas y equilibradas.',              type: 'seeking',  user_id: pablo.id,  category_id: catMap['Cocina'] },
    // Nadia
    { name: 'Tutoría de matemáticas',   description: 'Álgebra, cálculo y estadística para bachillerato.', type: 'offering', user_id: nadia.id,  category_id: catMap['Educación'] },
    { name: 'Ilustración digital',      description: 'Me gustaría aprender a dibujar en tablet.',          type: 'seeking',  user_id: nadia.id,  category_id: catMap['Diseño'] },
    // Diego
    { name: 'Ilustración y pixel art',  description: 'Procreate, Aseprite y composición visual.',          type: 'offering', user_id: diego.id,  category_id: catMap['Diseño'] },
    { name: 'Marketing digital',        description: 'Quiero vender mis ilustraciones online.',            type: 'seeking',  user_id: diego.id,  category_id: catMap['Negocios'] },
  ]

  await prisma.skill.createMany({ data: skillsData, skipDuplicates: true })
  console.log('✅ Skills creadas')

  const skills = await prisma.skill.findMany()
  const skillByNameUser = (name, userId) => skills.find(s => s.name === name && s.user_id === userId)

  // ─── EXCHANGES ────────────────────────────────────────────────────────────
  // Carlos (React) ↔ Iván (Guitarra)
  const exchange1 = await prisma.exchange.create({
    data: {
      requester_id: carlos.id,
      receiver_id:  ivan.id,
      status: 'accepted',
      skill_exchanges: {
        create: [
          { skill_id: skillByNameUser('Desarrollo React',  carlos.id).id, role: 'offered'  },
          { skill_id: skillByNameUser('Guitarra eléctrica', ivan.id).id,  role: 'received' },
        ],
      },
    },
  })

  // Laura (Diseño) ↔ Carlos (React)
  const exchange2 = await prisma.exchange.create({
    data: {
      requester_id: laura.id,
      receiver_id:  carlos.id,
      status: 'in_progress',
      skill_exchanges: {
        create: [
          { skill_id: skillByNameUser('Diseño de interfaces', laura.id).id, role: 'offered'  },
          { skill_id: skillByNameUser('Desarrollo React',     carlos.id).id, role: 'received' },
        ],
      },
    },
  })

  // Sofía (Inglés) ↔ Marcos (Entrenamiento)
  const exchange3 = await prisma.exchange.create({
    data: {
      requester_id: sofia.id,
      receiver_id:  marcos.id,
      status: 'completed',
      skill_exchanges: {
        create: [
          { skill_id: skillByNameUser('Clases de inglés B2-C1',  sofia.id).id,  role: 'offered'  },
          { skill_id: skillByNameUser('Entrenamiento funcional', marcos.id).id, role: 'received' },
        ],
      },
    },
  })

  // Elena (Repostería) ↔ Pablo (Mentoría)
  const exchange4 = await prisma.exchange.create({
    data: {
      requester_id: elena.id,
      receiver_id:  pablo.id,
      status: 'pending',
      skill_exchanges: {
        create: [
          { skill_id: skillByNameUser('Repostería francesa', elena.id).id, role: 'offered'  },
          { skill_id: skillByNameUser('Mentoría de negocios', pablo.id).id, role: 'received' },
        ],
      },
    },
  })

  // Nadia (Mates) ↔ Diego (Ilustración)
  const exchange5 = await prisma.exchange.create({
    data: {
      requester_id: nadia.id,
      receiver_id:  diego.id,
      status: 'accepted',
      skill_exchanges: {
        create: [
          { skill_id: skillByNameUser('Tutoría de matemáticas',  nadia.id).id, role: 'offered'  },
          { skill_id: skillByNameUser('Ilustración y pixel art', diego.id).id, role: 'received' },
        ],
      },
    },
  })

  console.log('✅ Exchanges creados')

  // ─── MENSAJES ─────────────────────────────────────────────────────────────
  await prisma.message.createMany({
    data: [
      // Exchange 1 — Carlos ↔ Iván
      { sender_id: carlos.id, receiver_id: ivan.id,   exchange_id: exchange1.id, content: '¡Hola Iván! Vi que ofreces clases de guitarra, me encantaría intercambiar con React.' },
      { sender_id: ivan.id,   receiver_id: carlos.id, exchange_id: exchange1.id, content: 'Claro Carlos, llevo tiempo queriendo aprender React para mi web. ¡Me parece perfecto!' },
      { sender_id: carlos.id, receiver_id: ivan.id,   exchange_id: exchange1.id, content: '¿Cuándo empezamos? Yo puedo los martes y jueves por la tarde.' },
      { sender_id: ivan.id,   receiver_id: carlos.id, exchange_id: exchange1.id, content: 'Perfecto, el martes a las 18h me viene genial. ¿Quedamos por videollamada?' },

      // Exchange 2 — Laura ↔ Carlos
      { sender_id: laura.id,  receiver_id: carlos.id, exchange_id: exchange2.id, content: 'Hola Carlos, soy Laura. Propongo intercambio: yo te enseño Figma y tú me ayudas con Node.js.' },
      { sender_id: carlos.id, receiver_id: laura.id,  exchange_id: exchange2.id, content: '¡Genial Laura! Necesito mejorar mis diseños. Acepto sin dudar.' },
      { sender_id: laura.id,  receiver_id: carlos.id, exchange_id: exchange2.id, content: 'Empezamos la semana que viene. Te mando un Notion con el temario.' },

      // Exchange 3 — Sofía ↔ Marcos
      { sender_id: sofia.id,  receiver_id: marcos.id, exchange_id: exchange3.id, content: 'Marcos, ¿seguimos con la última sesión? Me quedé con dudas sobre el calentamiento.' },
      { sender_id: marcos.id, receiver_id: sofia.id,  exchange_id: exchange3.id, content: 'Claro Sofía, el viernes te explico la rutina completa. ¿Cómo vas con el inglés?' },
      { sender_id: sofia.id,  receiver_id: marcos.id, exchange_id: exchange3.id, content: '¡Muy bien! Ya me defiendo con los tiempos verbales. Ha sido un intercambio genial.' },
      { sender_id: marcos.id, receiver_id: sofia.id,  exchange_id: exchange3.id, content: 'Totalmente de acuerdo, ha sido muy productivo para los dos. ¡Gracias!' },

      // Exchange 4 — Elena ↔ Pablo
      { sender_id: elena.id,  receiver_id: pablo.id,  exchange_id: exchange4.id, content: 'Hola Pablo, me gustaría aprender a monetizar mi negocio de repostería. ¿Te interesa el intercambio?' },
      { sender_id: pablo.id,  receiver_id: elena.id,  exchange_id: exchange4.id, content: '¡Hola Elena! Me encanta la idea. Los croissants caseros me tienen loco. Te ayudo con el plan de negocio.' },

      // Exchange 5 — Nadia ↔ Diego
      { sender_id: nadia.id,  receiver_id: diego.id,  exchange_id: exchange5.id, content: 'Diego, ¿puedes recomendarme una tablet para empezar con la ilustración digital?' },
      { sender_id: diego.id,  receiver_id: nadia.id,  exchange_id: exchange5.id, content: 'Para empezar una Wacom Intuus Small va perfecta y no es cara. ¿Cómo va el cálculo?' },
      { sender_id: nadia.id,  receiver_id: diego.id,  exchange_id: exchange5.id, content: 'Muy bien, la semana que viene hacemos derivadas. Ya verás que no es tan difícil 😄' },
    ],
  })
  console.log('✅ Mensajes creados')

  console.log('🎉 Seed completado con éxito')
}

main()
  .catch((e) => {
    console.error('❌ Error en el seed:', e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())