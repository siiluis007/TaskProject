# Usa una imagen de Node.js como base
FROM node AS build

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el archivo package.json a la imagen
COPY package.json .

# Instala las dependencias
RUN npm install

# Copia todo el contenido de la aplicación al directorio de trabajo
COPY . .

# Construye la aplicación para producción
RUN npm run build

# Usa una imagen de Nginx como base
FROM nginx:latest

# Copia los archivos de configuración personalizados para Nginx
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia los archivos compilados de la aplicación desde el contenedor "build" al contenedor "nginx"
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80
