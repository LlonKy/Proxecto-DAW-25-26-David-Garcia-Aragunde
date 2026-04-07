# FASE DE DESEÑO

- [FASE DE DESEÑO](#fase-de-deseño)
- [Fase de Deseño — Swaply](#fase-de-deseño--swaply)
  - [1. Diagrama da arquitectura](#1-diagrama-da-arquitectura)
  - [2. Casos de uso](#2-casos-de-uso)
    - [Usuarios](#usuarios)
    - [Administrador](#administrador)
  - [3. Diagrama de Base de Datos](#3-diagrama-de-base-de-datos)
    - [Modelo Entidad/Relación](#modelo-entidadrelación)
    - [Modelo Relacional](#modelo-relacional)
  - [4. Deseño de interface de usuarios](#4-deseño-de-interface-de-usuarios)
    - [Landing page](#landing-page)
    - [Perfil de usuario](#perfil-de-usuario)

# Fase de Deseño — Swaply

## 1. Diagrama da arquitectura

![Diagrama de arquitectura](/doc//img/diagrama_arquitectura.svg)

## 2. Casos de uso

### Usuarios
![Casos de uso usuarios](/doc//img/casos_uso_usuario.svg)

### Administrador
![Casos de uso admin](/doc//img/casos_uso_admin.svg)

## 3. Diagrama de Base de Datos

### Modelo Entidad/Relación

```mermaid
flowchart LR
    USR["USERS<br/>----------------<br/>id (PK)<br/>name<br/>email<br/>password<br/>photo<br/>description<br/>role<br/>average_rating<br/>created_at"]
    EXC["EXCHANGE<br/>----------------<br/>id (PK)<br/>requester_id (FK)<br/>receiver_id (FK)<br/>status<br/>created_at<br/>updated_at"]
    RAT["RATING<br/>----------------<br/>id (PK)<br/>exchange_id (FK)<br/>author_id (FK)<br/>recipient_id (FK)<br/>score<br/>comment<br/>created_at"]
    MSG["MESSAGE<br/>----------------<br/>id (PK)<br/>exchange_id (FK)<br/>user_id (FK)<br/>content<br/>created_at"]
    SKL["SKILL<br/>----------------<br/>id (PK)<br/>name<br/>description<br/>type<br/>user_id (FK)<br/>category_id (FK)<br/>created_at"]
    CAT["CATEGORY<br/>----------------<br/>id (PK)<br/>name<br/>description"]
    SKE["SKILL_EXCHANGE<br/>----------------<br/>id (PK)<br/>exchange_id (FK)<br/>skill_id (FK)<br/>role"]
    R1{"SOLICITA"}
    R2{"RECIBE"}
    R3{"CONTIENE"}
    R4{"ESCRIBE"}
    R5{"GENERA"}
    R6{"AUTOR"}
    R7{"DESTINATARIO"}
    R8{"POSEE"}
    R9{"CLASIFICA"}
    R10{"ASOCIA_EXCHANGE"}
    R11{"ASOCIA_SKILL"}
    USR ---|1:N| R1
    R1 ---|1:1| EXC
    USR ---|1:N| R2
    R2 ---|1:1| EXC
    EXC ---|1:N| R3
    R3 ---|1:1| MSG
    USR ---|1:N| R4
    R4 ---|1:1| MSG
    EXC ---|1:N| R5
    R5 ---|1:1| RAT
    USR ---|1:N| R6
    R6 ---|1:1| RAT
    USR ---|1:N| R7
    R7 ---|1:1| RAT
    USR ---|1:N| R8
    R8 ---|1:1| SKL
    CAT ---|1:N| R9
    R9 ---|1:1| SKL
    EXC ---|1:N| R10
    R10 ---|1:1| SKE
    SKL ---|1:N| R11
    R11 ---|1:1| SKE
```

### Modelo Relacional

![Modelo relacional](/doc//img/Modelo_Relacional.png)

## 4. Deseño de interface de usuarios

### Landing page

![Landing page](/doc//img/Landing1.png)

![Landing cards](/doc//img/Landing_cards.png)

![Landing testimonios](/doc//img/Landing_testaments.png)

### Perfil de usuario

![Perfil 1](/doc//img/porfile1.png)

![Perfil 2](/doc//img/profile2.png)

![Perfil 3](/doc//img/profile3.png)

![Perfil 4](/doc//img/profile4.png)

![Perfil 5](/doc//img/profile5.png)
>
[**<-Anterior**](../../README.md)
