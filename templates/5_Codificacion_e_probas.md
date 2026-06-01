# FASE DE CODIFICACIÓN Y PRUEBAS

- [FASE DE CODIFICACIÓN Y PRUEBAS](#fase-de-codificación-y-pruebas)
  - [1- Codificación](#1--codificación)
  - [2- Prototipos](#2--prototipos)
    - [Prototipo 1 — Landing](#prototipo-1--landing)
    - [Prototipo 2 — Listado y búsqueda de habilidades](#prototipo-2--listado-y-búsqueda-de-habilidades)
    - [Prototipo 3 — Perfil de usuario y publicación de habilidades](#prototipo-3--perfil-de-usuario-y-publicación-de-habilidades)
  - [3- Innovación](#3--innovación)
  - [4- Pruebas](#4--pruebas)
    - [Validaciones y seguridad](#validaciones-y-seguridad)
    - [Autenticación JWT](#autenticación-jwt)
    - [Problemas encontrados durante el desarrollo](#problemas-encontrados-durante-el-desarrollo)

---

## 1- Codificación

El código del proyecto se encuentra en el repositorio de GitHub, organizado en dos carpetas principales: `backend/` para la API y `frontend/` para la interfaz de usuario.

Este proyecto supuso un reto desde el principio, ya que prácticamente todas las tecnologías utilizadas eran nuevas. Durante el desarrollo fueron apareciendo problemas y ajustes que no estaban previstos en el diseño inicial, lo cual es normal cuando se trabaja con herramientas que se están aprendiendo al mismo tiempo que se usan.

Algunas funcionalidades que estaban planificadas, como el sistema de valoraciones entre usuarios, la gestión de roles diferenciados y los métodos de pago, quedaron fuera del alcance de esta versión por falta de tiempo, pero están identificadas como mejoras a implementar en el futuro.

---

## 2- Prototipos

Los prototipos se realizaron mediante capturas previas al desarrollo que sirvieron de guía para el diseño de las interfaces.

### Prototipo 1 — Landing

Diseño de la pantalla de bienvenida.

![Landing](/doc/img/Landing1.png)

### Prototipo 2 — Listado y búsqueda de habilidades

Vista principal donde los usuarios pueden explorar las habilidades publicadas y filtrar por categoría.

![Skills](/doc/img/Landing_cards.png)

### Prototipo 3 — Perfil de usuario y publicación de habilidades

Pantalla de perfil con las habilidades del usuario y opción de añadir nuevas.

![Perfil](/doc/img/porfile1.png)


---

## 3- Innovación

Para este proyecto se utilizaron tecnologías que no se habían estudiado en el ciclo formativo, lo que supuso aprenderlas y aplicarlas al mismo tiempo. Las principales fueron:

**Angular** — Framework de frontend con una curva de aprendizaje bastante pronunciada. Tiene una forma muy particular de estructurar el código (módulos, servicios, inyección de dependencias) que cuesta bastante al principio si no se tiene base previa.

**Node.js con Express** — Aunque Node.js se vio por encima en el ciclo, montar una API REST completa con autenticación, middlewares y una estructura organizada por capas fue bastante más de lo que se había trabajado en clase.

**Prisma ORM** — Herramienta para gestionar la base de datos desde código. Lo más complicado fue entender cómo define las relaciones entre tablas y cómo funciona el sistema de migraciones.

**bcryptjs** — Librería para cifrar contraseñas. Conceptualmente sencilla, pero importante entender por qué el hash es unidireccional y cómo afecta eso al login.

**Docker y Docker Compose** — Probablemente lo más complejo del proyecto a nivel de infraestructura. Contenerizar tres servicios distintos (base de datos, backend y frontend), hacer que se comuniquen entre sí y que arranquen en el orden correcto llevó bastante tiempo de prueba y error.

---

## 4- Pruebas

Las pruebas realizadas fueron manuales e informales, comprobando cada funcionalidad a medida que se iba implementando.

### Validaciones y seguridad

Se comprobó el comportamiento de los formularios ante entradas incorrectas o maliciosas:

- **Validación de email**: se probó introducir emails con formato incorrecto (sin @, sin dominio, con espacios) para verificar que el backend los rechazaba correctamente.
- **Validación de contraseña**: se comprobó que se exigía una longitud mínima y que no se aceptaban campos vacíos.
- **Inyección SQL**: al usar Prisma ORM, las consultas se construyen mediante parámetros tipados y nunca concatenando strings directamente, lo que previene este tipo de ataques. Se probaron entradas con caracteres especiales y comillas sin que causasen ningún problema.

### Autenticación JWT

El token JWT se almacena en `localStorage` del navegador. Esto no es la práctica más segura (lo ideal sería una cookie `HttpOnly`), pero dado que la aplicación corre en un entorno local y no está expuesta en producción, se optó por esta solución por simplicidad. Es una mejora a tener en cuenta si la aplicación llegase a desplegarse en un servidor público.

### Problemas encontrados durante el desarrollo

**El backend arrancaba antes de que la base de datos estuviese lista**
Al levantar los contenedores con Docker Compose, el backend intentaba conectarse a PostgreSQL antes de que este estuviese listo, provocando un error de conexión. Se resolvió añadiendo un `healthcheck` en el servicio de la base de datos y configurando `depends_on` para que el backend esperase a que estuviese operativa.

**El seed fallaba al reiniciar el contenedor**
Al reiniciar, el seed intentaba insertar datos que ya existían, lo que provocaba errores. Se solucionó usando `skipDuplicates` en las inserciones múltiples y `upsert` para el usuario administrador.

**El archivo seed.js no se encontraba dentro del contenedor**
El script de arranque llamaba a `node seed.js` pero el archivo estaba en la carpeta `prisma/`, por lo que no lo encontraba. Se corrigió la ruta a `node prisma/seed.js`.

[**<- Anterior**](../../README.md)