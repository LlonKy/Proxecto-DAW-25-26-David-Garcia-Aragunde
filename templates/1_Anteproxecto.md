# Anteproxecto

- [Anteproxecto](#anteproxecto)
  - [1- Idea do proxecto](#1--idea-do-proxecto)
  - [2- Contextualización](#2--contextualización)
  - [3- Estudio de alternativas e viabilidade](#3--estudio-de-alternativas-e-viabilidade)
    - [3.1- Estudio de alternativas](#31--estudio-de-alternativas)
    - [3.2 Xustificación da alternativa](#32-xustificación-da-alternativa)
  - [4- Requirimentos técnicos](#4--requirimentos-técnicos)
  - [5- Planificación](#5--planificación)

## 1- Idea do proxecto

Swaply es una plataforma web donde cualquier persona puede ofrecer una habilidad que domina e intercambiarla por otra que quiera aprender, sin que haya dinero de por medio. Publicas lo que sabes hacer y lo que te gustaría aprender, y la plataforma te conecta con alguien que tiene necesidades complementarias a las tuyas.

Mi objetivo es crear una comunidad donde el conocimiento sea la moneda de cambio, accesible para cualquiera independientemente de su formación o situación económica.

---

## 2- Contextualización

### 2.1 ¿En qué consiste el proyecto?

La idea nace de una necesidad real: el aprendizaje informal entre personas ocurre constantemente, pero no existe ninguna plataforma consolidada que lo facilite de forma moderna y accesible. Plataformas como Skillshare o Udemy funcionan con suscripción de pago, lo que excluye a mucha gente. Swaply elimina esa barrera completamente.

La plataforma contará con perfiles de usuario con habilidades ofrecidas y buscadas, sistema de búsqueda y filtrado por categorías, propuestas de intercambio entre usuarios, chat interno, sistema de valoraciones y panel de estadísticas personales.

### 2.2 ¿Tiene oportunidad de negocio?

Aunque en su versión inicial Swaply sería gratuita, el modelo tiene viabilidad comercial a través de una membresía premium con funcionalidades avanzadas, acuerdos con plataformas educativas o publicidad no intrusiva. El mercado de intercambio de habilidades está muy fragmentado y sin un líder claro, lo que representa una oportunidad real.

---

## 3- Estudio de alternativas e viabilidade

### 3.1- Estudio de alternativas

- **A1** — Desarrollo desde cero con API REST Java Spring Boot + HTML5 + CSS3 + JavaScript nativo
- **A2** — Desarrollo desde cero con API REST Node.js + Express + MySQL + Angular + TypeScript
- **A3** — Desarrollo desde cero modelo MVC en PHP + HTML5 + CSS3 + JavaScript nativo
- **A4** — PHP API REST + MySQL + Angular + TypeScript

| Alternativa | Viabilidad técnica | Viabilidad económica | Temporalidad | Valoración global |
|---|---|---|---|---|
| **A1** | Baja-Media (4/10): Spring Boot es un framework empresarial potente pero con una curva de aprendizaje considerable y llevo más de un año sin usar Java. **Fortalezas:** arquitectura sólida y escalable. **Debilidades:** configuración compleja, curva de aprendizaje alta. | Media (5/10): requiere hosting con soporte Java o un VPS, lo que eleva el coste respecto a otras opciones. | Baja (3/10): la curva de aprendizaje de Spring Boot haría que el desarrollo se alargara. | **4/10** |
| **A2** | Alta (8/10): Node.js permite usar JavaScript tanto en frontend como en backend, lo que da coherencia al proyecto. Angular lo estoy usando actualmente en prácticas. **Fortalezas:** stack unificado en JS/TS, alta empleabilidad. **Debilidades:** Node.js es nuevo para mí, aunque la curva es asumible. | Alta (8/10): despliegue posible en Railway con capa gratuita. MySQL y todas las herramientas son gratuitas. | Alta (7/10): al conocer JavaScript y Angular, el salto a Node.js es menor que otras alternativas. | **8/10** |
| **A3** | Media (6/10): conozco PHP y el patrón MVC, pero tiende a mezclar lógica de negocio con presentación y no permite aprovechar Angular. **Fortalezas:** tecnología conocida, fácil de desplegar. **Debilidades:** arquitectura menos limpia, difícil mantener separación frontend/backend. | Alta (9/10): hosting compartido muy barato, todas las herramientas gratuitas. | Alta (8/10): es la tecnología que más domino, el desarrollo sería más rápido. | **7/10** |
| **A4** | Media-Alta (7/10): PHP para API REST es viable pero tiende a hibridarse con MVC si no se tiene mucha disciplina. **Fortalezas:** conozco PHP y Angular lo estoy aprendiendo. **Debilidades:** PHP no es el entorno más natural para una API REST limpia. | Alta (8/10): hosting barato, herramientas gratuitas. | Media (6/10): PHP con API REST requiere más disciplina y puede ralentizar el desarrollo. | **7/10** |

### 3.2 Xustificación da alternativa

Me decanto por **A2 (Node.js + Express + MySQL + Angular)** porque es la opción con mayor valoración global. Unifica todo el proyecto bajo JavaScript/TypeScript, es coherente tecnológicamente y tiene más proyección profesional. Como ya estoy usando Angular y he empezado con Node en prácticas y conozco JavaScript, el salto a Node.js es asumible. A4 queda como segunda opción si durante el desarrollo surgieran dificultades con Node.js.

---

## 4- Requirimentos técnicos


### Infraestructura
- **Git + GitHub:** Control de versiones y alojamiento del repositorio. Usaré GitFlow como metodología de ramas, con ramas por feature que se mergean a develop y de develop a main, para mantener el proyecto limpio y ordenado y poder recuperar cambios si algo falla.

- **Docker y Docker Compose:** Para gestionar la base de datos MySQL en local sin depender de herramientas como XAMPP. Docker permite tener el entorno de base de datos aislado, reproducible y fácil de configurar en cualquier máquina.

- **Railway:** Plataforma de despliegue en la nube que permite desplegar tanto la API de Node.js como la base de datos MySQL de forma sencilla conectando directamente el repositorio de GitHub. Tiene capa gratuita suficiente para este proyecto.

### Backend
- **Node.js + Express.js:** Node.js permite ejecutar JavaScript en el servidor, lo que unifica el lenguaje en todo el proyecto junto con Angular en el frontend. Express es un framework que facilita la creación de una API REST limpia y organizada por rutas y middlewares.

- **Prisma:** ORM para Node.js que facilita el acceso a la base de datos MySQL de forma segura y tipada. Permite definir el esquema de la base de datos en un único fichero y genera las consultas automáticamente, reduciendo el riesgo de errores y de inyección SQL.

- **MySQL:** Base de datos relacional, amplia documentación y por ser que más he usado.

- **JWT (jsonwebtoken):** Librería para generar y verificar tokens de autenticación. Permite proteger los endpoints de la API mediante middlewares.

- **bcryptjs:** Librería para encriptar las contraseñas de los usuarios antes de almacenarlas en la base de datos, evitando que se guarden en texto plano.

### Frontend
- **Angular + TypeScript:** Lo estoy usando actualmente en mis prácticas, lo que reduce el tiempo de aprendizaje.

- **RxJS:** Librería de programación reactiva integrada en Angular. La usaré para gestionar las peticiones HTTP de forma asíncrona, encadenar operaciones y manejar el estado de la aplicación.

- **CSS3 (responsive mobile first):** Los estilos se desarrollarán desde cero siguiendo el enfoque mobile first.

- **Chart.js:** Librería JavaScript para generar gráficas y visualizaciones de datos. La usaré en el panel de estadísticas del perfil de usuario para mostrar métricas como intercambios completados o valoración media.

- **AOS (Animate On Scroll):** Librería para añadir animaciones de entrada a los elementos de la página al hacer scroll, mejorando la experiencia visual de la landing page.

- **Reactive Forms de Angular:** Sistema de formularios de Angular que permite una validación robusta tanto en el cliente como coordinada con el servidor.

- **Figma:** Prototipado de la página y diferentes funcionalidades.

- **Accesibilidad WCAG:** La interfaz se desarrollará siguiendo los principios básicos de accesibilidad web: contraste suficiente, etiquetas ARIA, navegación por teclado y textos alternativos en imágenes.

## 5- Planificación

![Diagrama de Gantt](/doc/img/Diagrama%20de%20Gantt.jpeg)

[**<-Anterior**](../README.md)
