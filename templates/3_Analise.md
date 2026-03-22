# Requerimientos do sistema

- [Requerimientos do sistema](#requerimientos-do-sistema)
  - [1. Descripción general](#1-descripción-general)
  - [2. Funcionalidades](#2-funcionalidades)
  - [3. Tipos de usuarios](#3-tipos-de-usuarios)
  - [4. Entorno operacional](#4-entorno-operacional)
  - [5. Normativa](#5-normativa)
  - [6. Mejoras futuras](#6-mejoras-futuras)


## 1. Descripción general

Swaply es una plataforma web de intercambio de habilidades entre personas.
El objetivo principal es conectar a usuarios que quieren aprender algo nuevo
con otros que dominan esa habilidad, ofreciendo a cambio una habilidad propia.
Todo el intercambio es gratuito, sin dinero de por medio.

La aplicación permite registrarse, publicar habilidades, buscar perfiles
complementarios, proponer intercambios, comunicarse mediante un chat interno
y valorar la experiencia una vez completado el intercambio.

---

## 2. Funcionalidades

| Acción | Descripción |
|---|---|
| Registro de usuario | El usuario introduce sus datos (nombre, email, contraseña). El sistema valida los datos, encripta la contraseña con bcrypt y crea la cuenta en la base de datos. Devuelve confirmación de registro. |
| Inicio de sesión | El usuario introduce email y contraseña. El sistema verifica las credenciales y, si son correctas, genera un token JWT que se usa para autenticar las siguientes peticiones. |
| Editar perfil | El usuario registrado puede actualizar su nombre, foto, descripción y habilidades ofrecidas y buscadas. El sistema valida y guarda los cambios en la base de datos. |
| Publicar habilidad | El usuario registrado introduce el nombre, descripción y categoría de una habilidad que ofrece. El sistema la almacena y la hace visible en el buscador. |
| Buscar habilidades | Cualquier usuario puede buscar habilidades por nombre o categoría. El sistema consulta la base de datos y devuelve los resultados filtrados en tiempo real. |
| Proponer intercambio | Un usuario registrado puede enviar una propuesta de intercambio a otro usuario. El sistema registra la propuesta con estado "pendiente" y notifica al destinatario. |
| Gestionar intercambios | El usuario puede aceptar, rechazar o marcar como completado un intercambio. El sistema actualiza el estado en la base de datos. |
| Chat interno | Los usuarios con un intercambio activo pueden enviarse mensajes. El sistema almacena los mensajes y los muestra ordenados cronológicamente. |
| Valorar intercambio | Una vez completado un intercambio, cada usuario puede dejar una puntuación y comentario al otro. El sistema almacena la valoración y actualiza la media del perfil. |
| Ver estadísticas | El usuario registrado puede ver en su perfil el número de intercambios completados, su valoración media y las categorías más activas mediante gráficas. |
| Panel de administración | El administrador puede gestionar usuarios, eliminar habilidades inapropiadas y consultar estadísticas globales de la plataforma. |
| Gestión de usuarios (admin) | El administrador puede bloquear o eliminar cuentas de usuarios que incumplan las normas de la plataforma. |

---

## 3. Tipos de usuarios

**Usuario anónimo**
Cualquier visitante sin cuenta puede acceder a la landing page e información
general de la plataforma, pero no puede ver perfiles, buscar habilidades ni
interactuar con otros usuarios. Para acceder a las funcionalidades principales
es necesario registrarse.

**Usuario registrado**
Es el usuario estándar de la plataforma. Puede crear y editar su perfil,
publicar habilidades, buscar y explorar perfiles de otros usuarios, proponer
y gestionar intercambios, usar el chat interno, valorar intercambios completados
y consultar sus estadísticas personales.

**Usuario premium**
Tiene acceso a todas las funcionalidades del usuario registrado, además de
perfil destacado en los resultados de búsqueda, estadísticas avanzadas y
mayor visibilidad en la plataforma.

**Administrador**
Tiene acceso completo a la plataforma. Puede gestionar usuarios (bloquear,
eliminar), moderar habilidades publicadas, y consultar estadísticas globales
del sistema. No participa en los intercambios como usuario normal.

---

## 4. Entorno operacional

Para usar Swaply el usuario solo necesita:

- Un navegador web actualizado (Chrome, Firefox, Safari o Edge en sus
versiones recientes)
- Conexión a internet
- No se requiere ningún software adicional ni hardware específico. Al tratarse
de una aplicación web responsive, es compatible tanto con ordenadores de
escritorio como con dispositivos móviles y tablets.

---

## 5. Normativa

El desarrollo de Swaply implica el tratamiento de datos personales de los
usuarios, por lo que debe cumplir con la normativa vigente en materia de
protección de datos:

**Ley Orgánica 3/2018 (LOPDPGDD)**
Al operar en territorio español, Swaply está sujeto a la Ley Orgánica 3/2018,
de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos
digitales. Esta ley regula el tratamiento de datos personales e impone
obligaciones sobre su recogida, almacenamiento y uso.

**Reglamento General de Protección de Datos (GDPR)**
Al estar pensada para operar a nivel europeo, Swaply también se acoge al
Reglamento (UE) 2016/679, que establece los derechos de los usuarios sobre
sus datos y las obligaciones del responsable del tratamiento.

Para cumplir con ambas normativas, la plataforma incluirá los siguientes
apartados legales accesibles desde cualquier página:

- **Aviso legal:** identificación del responsable del tratamiento de datos,
domicilio y datos de contacto.
- **Política de privacidad:** información sobre qué datos se recogen, con
qué finalidad, durante cuánto tiempo se conservan y cómo ejercer los derechos
de acceso, rectificación, supresión y portabilidad.
- **Política de cookies:** descripción de las cookies utilizadas, su finalidad
y cómo el usuario puede gestionarlas o rechazarlas.

Swaply se compromete a cumplir con la normativa vigente en materia de
protección de datos, garantizando la seguridad y confidencialidad de la
información de sus usuarios.

---

## 6. Mejoras futuras

Una vez desarrollada la versión inicial de Swaply, se contemplan las
siguientes mejoras para versiones posteriores:

- **Notificaciones en la app:** sistema de notificaciones en tiempo real
para avisar al usuario de nuevas propuestas de intercambio, mensajes
recibidos o valoraciones, sin necesidad de recargar la página.
- **Sistema de reportes y denuncias:** funcionalidad para que los usuarios
puedan reportar perfiles o habilidades inapropiadas, facilitando la
moderación del contenido por parte del administrador.
- **Búsqueda por ubicación:** filtro geográfico para encontrar usuarios
cercanos y facilitar intercambios presenciales, especialmente útil para
habilidades que requieren contacto físico como clases de música o deportes.

[**<-Anterior**](../../README.md)
