# Proyecto fin de ciclo — Swaply

- [Proyecto fin de ciclo — Swaply](#proyecto-fin-de-ciclo--swaply)
  - [Estado del proyecto](#estado-del-proyecto)
  - [Descripción](#descripción)
  - [Instalación / Puesta en marcha](#instalación--puesta-en-marcha)
  - [Uso](#uso)
  - [Sobre el autor](#sobre-el-autor)
  - [Licencia](#licencia)
  - [Índice](#índice)
  - [Guía de contribución](#guía-de-contribución)
  - [Links](#links)

---

## Estado del proyecto

El proyecto está **finalizado** en su versión inicial, aunque puede retomarse en el futuro para añadir nuevas funcionalidades.

---

## Descripción

Swaply es una plataforma web para el intercambio de habilidades entre personas. La idea es sencilla: si sabes algo que otros quieren aprender, y quieres aprender algo que otros saben, Swaply te pone en contacto con ellos para que ambos saquéis partido del intercambio sin que haya dinero de por medio.

Los usuarios pueden registrarse, crear su perfil y publicar las habilidades que ofrecen o que buscan, como programación, idiomas, música, cocina o diseño, entre otras categorías. Desde el explorador de habilidades se pueden encontrar otros usuarios, proponerles un intercambio y comunicarse con ellos mediante un chat integrado.

El proyecto está desarrollado con una arquitectura moderna separada en frontend y backend. La interfaz está construida con **Angular**, la API con **Node.js** y **Express**, y los datos se guardan en una base de datos **PostgreSQL** gestionada mediante **Prisma ORM**. Todo el sistema está contenerizado con **Docker**, lo que hace que ponerlo en marcha sea muy sencillo.

---

## Instalación / Puesta en marcha

Solo se necesita tener **Git** y **Docker** instalados en la máquina.

```bash
git clone https://github.com/LlonKy/Proxecto-DAW-25-26-David-Garcia-Aragunde.git
cd Proxecto-DAW-25-26-David-Garcia-Aragunde
docker compose up --build
```

Acceder a [http://localhost:4200](http://localhost:4200)

Docker se encarga de todo lo demás: base de datos, backend, frontend y datos iniciales de prueba.

---

## Uso

Regístrate o inicia sesión y accede a tu perfil para publicar las habilidades que ofreces y las que buscas. Desde el explorador de skills puedes buscar y filtrar lo que ofrecen otros usuarios, proponer un intercambio o enviarle un mensaje directamente. Tus intercambios activos y su estado puedes seguirlos desde la sección de intercambios, y todas tus conversaciones quedan guardadas en la sección de mensajes.

---

## Sobre el autor

Soy David García Aragunde, estudiante de Desarrollo de Aplicaciones Web. Tengo especial interés en el desarrollo fullstack, y durante este proyecto trabajé con tecnologías que eran nuevas para mí, como Angular, Prisma ORM y Docker, aprendiéndolas directamente en la práctica.

La idea de Swaply surgió de querer crear algo útil y con sentido real: una plataforma donde el conocimiento sea la moneda de cambio. Creo que hay un nicho interesante en facilitar este tipo de intercambios de forma estructurada, algo que las redes sociales generales no cubren bien.

Contacto:
- Email: davicicho11@gmail.com
- GitHub: [https://github.com/LlonKy](https://github.com/LlonKy)

---

## Licencia

Este proyecto no está licenciado de momento.

---

## Índice

1. [Anteproyecto](templates/1_Anteproxecto.md)
2. [Empresa](templates/2_Empresa.md)
3. [Análisis](templates/3_Analise.md)
4. [Diseño](templates/4_Deseño.md)
5. [Codificación y pruebas](templates/5_Codificacion_e_probas.md)
6. [Implantación](templates/6_Implantación.md)
7. [Referencias](templates/7_Referencias.md)
8. [Incidencias](templates/8_Incidencias.md)

---

## Guía de contribución

Las contribuciones son bienvenidas. Algunas formas de participar:

- Implementar las funcionalidades pendientes: valoraciones, panel de administración o métodos de pago.
- Mejorar la cobertura de tests con pruebas automatizadas.
- Optimizar el rendimiento de la API o de las consultas a la base de datos.
- Mejorar la accesibilidad y el diseño de la interfaz.

Para contribuir, haz un fork del repositorio, crea una rama con tu mejora y abre un pull request describiendo los cambios.

---

## Links

- [Repositorio GitHub](https://github.com/LlonKy/Proxecto-DAW-25-26-David-Garcia-Aragunde/tree/main)
- [Documentación de Angular](https://angular.dev)
- [Documentación de Prisma ORM](https://www.prisma.io/docs)
- [Documentación de Docker](https://docs.docker.com)