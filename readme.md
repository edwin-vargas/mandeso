# PREREQUISITES

- Node
- Npm
- Docker

# INSTALLATION

MongoDB
`docker compose -d`

React
`cd client`
`npm i`
`npm run dev`

Api
`cd server`
`npm i`
`npm run dev`

# MANTENIMIENTO DE SOFTWARE
## Pinterest Clon

Actualizar la galería realizada en Mayo 2024 a un Web Stack diferente incluyendo nuevas caracteristicas.

**STACK ANTERIOR:** LAMP STACK

**CARACTERISTICAS ANTERIORES:** 
- Usuarios
    - Registro 
    - Inicio de sesión
    - Cerrar sesión
- Carga de archivos (up to 1mb)
- Vista individual de imagen
    - Fecha de subida
    - Propietario
    - Boton de descarga
    - Contador de visualizaciones
- Vista de perfil de usuario
- Landing page

**NUEVO STACK:** MERN STACK
- MongoDB
- ExpressJS
- React
- NodeJS

**NUEVAS CARACTERISTICAS:**
- Marca de agua en la imagen
- Etiquetas de imagen
- Busqueda basada en etiquetas






# docker

## bash
`
docker run -d --name mongo-atia -e MONGO_INITDB_ROOT_USERNAME=mongoatia -e MONGO_INITDB_ROOT_PASSWORD=apasswordGIv3n -p 27017:27017 -v mongo-atia-volume mongo:7.0
`

## docker compose
`
docker compose up -d
`
