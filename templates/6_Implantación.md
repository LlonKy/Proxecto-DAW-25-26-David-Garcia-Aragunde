# FASE DE IMPLANTACIÓN

- [FASE DE IMPLANTACIÓN](#fase-de-implantación)
  - [1- Manual técnico](#1--manual-técnico)
    - [1.1- Instalación](#11--instalación)
      - [Entorno local](#entorno-local)
      - [Despliegue en un entorno real](#despliegue-en-un-entorno-real)
    - [1.2- Administración del sistema](#12--administración-del-sistema)
      - [Copias de seguridad](#copias-de-seguridad)
      - [Seguridad](#seguridad)
      - [Gestión de usuarios](#gestión-de-usuarios)
  - [2- Manual de usuario](#2--manual-de-usuario)
    - [Landing — Registro y login](#landing--registro-y-login)
    - [Perfil](#perfil)
    - [Skills](#skills)
    - [Intercambios](#intercambios)
    - [Mensajes](#mensajes)
  - [3- Mejoras futuras](#3--mejoras-futuras)

---

## 1- Manual técnico

### 1.1- Instalación

#### Entorno local

La instalación en local es muy sencilla. Solo se necesita tener **Git** y **Docker** instalados en la máquina.

```bash
git clone https://github.com/LlonKy/Proxecto-DAW-25-26-David-Garcia-Aragunde.git
cd Proxecto-DAW-25-26-David-Garcia-Aragunde (raíz del proyecto)
docker compose up --build
```

Con eso ya está todo. Docker se encarga de levantar la base de datos, el backend y el frontend. Una vez arrancado, la aplicación es accesible en `http://localhost:4200`.

---

#### Despliegue en un entorno real

Si se quisiera desplegar Swaply en producción para que fuese accesible desde internet, habría que seguir estos pasos generales:

**1. Contratar un servidor**
Lo más habitual hoy en día es usar un servidor en la nube. Algunas opciones comunes son DigitalOcean, Hetzner, AWS o similares. Con un VPS básico (1-2 vCPUs, 2 GB RAM) sería suficiente para una carga moderada. En el servidor habría que instalar Docker y Docker Compose igual que en local.

**2. Comprar un dominio**
Se puede comprar un dominio en servicios como Namecheap, GoDaddy o similares. Una vez comprado, hay que apuntar los registros DNS del dominio a la IP del servidor.

**3. Configurar HTTPS**
En producción es imprescindible usar HTTPS. La forma más sencilla es usar **Nginx** como proxy inverso junto con **Let's Encrypt** para obtener un certificado SSL gratuito. Esto se puede gestionar con Certbot.

**4. Ajustar variables de entorno**
Habría que cambiar las variables del `docker-compose.yml` para producción: usar contraseñas seguras para la base de datos, un `JWT_SECRET` robusto y configurar las URLs correctas del dominio.

**5. Seguridad adicional**
- Cambiar el almacenamiento del JWT de `localStorage` a una cookie `HttpOnly` para mayor seguridad.
- Configurar un firewall en el servidor para exponer solo los puertos necesarios (80 y 443).
- No exponer directamente el puerto de PostgreSQL al exterior.

---

### 1.2- Administración del sistema

Una vez la aplicación está en funcionamiento, hay algunas tareas básicas de mantenimiento a tener en cuenta.

#### Copias de seguridad

Es recomendable hacer copias periódicas de la base de datos para no perder datos en caso de fallo:

```bash
# Exportar
docker exec swaply-postgres pg_dump -U swaply_user swaply > backup.sql

# Restaurar
docker exec -i swaply-postgres psql -U swaply_user swaply < backup.sql
```

#### Seguridad

- Revisar los logs del backend regularmente para detectar comportamientos anómalos o intentos de acceso no autorizados: `docker logs swaply-backend`.
- Mantener las imágenes de Docker actualizadas para evitar vulnerabilidades conocidas.
- En producción, rotar el `JWT_SECRET` periódicamente y asegurarse de que las contraseñas de la base de datos son suficientemente robustas.
- Prisma ORM protege por defecto contra inyecciones SQL al usar consultas parametrizadas, pero es importante no construir queries manuales concatenando strings.

#### Gestión de usuarios

No hay panel de administración en esta versión, así que la gestión se hace directamente sobre la base de datos:

```bash
# Ver todos los usuarios
SELECT id, name, email, role FROM users;

# Cambiar el rol de un usuario
UPDATE users SET role = 'user_premium' WHERE email = 'usuario@ejemplo.com';

# Eliminar un usuario
DELETE FROM users WHERE email = 'usuario@ejemplo.com';
```

---

## 2- Manual de usuario

Swaply es una plataforma para intercambiar habilidades con otras personas. La idea es simple: tú enseñas algo que sabes y otra persona te enseña algo que quieres aprender.

### Landing — Registro y login

Al entrar por primera vez se muestra la página principal con información sobre la plataforma. Desde aquí se puede acceder al formulario de **registro** para crear una cuenta nueva o al de **login** si ya se tiene una.

### Perfil

En la página de perfil se pueden ver y editar los datos personales (nombre, descripción y foto). También es donde se gestionan las habilidades propias:

- **Crear** una habilidad nueva indicando nombre, descripción, categoría y si la ofreces o la estás buscando.
- **Editar** o **eliminar** cualquiera de tus habilidades existentes.

### Skills

Página principal de exploración. Muestra todas las habilidades publicadas por los usuarios de la plataforma. Se puede buscar por nombre y filtrar entre habilidades ofrecidas o buscadas. Desde aquí se puede ver el perfil del usuario que la publicó, enviarle un mensaje o proponerle un intercambio.

### Intercambios

Lista de todos los intercambios en los que participas. Cada intercambio muestra su estado actual:

- **Pendiente** — solicitud enviada, esperando respuesta.
- **Aceptado** — ambas partes han aceptado.
- **En progreso** — el intercambio está en curso.
- **Completado** — finalizado.
- **Rechazado** — la solicitud fue rechazada.

### Mensajes

Lista de todas las conversaciones abiertas con otros usuarios. Funciona como un chat básico donde se puede escribir y recibir mensajes en tiempo real dentro de cada conversación.

---

## 3- Mejoras futuras

Hay varias funcionalidades que quedaron fuera de esta versión por falta de tiempo pero que serían interesantes de cara al futuro:

- **Valoraciones y ratings** — que los usuarios puedan puntuarse mutuamente al completar un intercambio, añadiendo un sistema de reputación a los perfiles.
- **Panel de administración** — una interfaz para gestionar usuarios, categorías y contenido sin tener que acceder directamente a la base de datos.
- **Métodos de pago** — implementar suscripciones premium con funcionalidades adicionales para los usuarios que quieran apoyar la plataforma.

[**<- Anterior**](../../README.md)