# Etapa de construcción (builder)
FROM node:16.14.0-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Etapa de despliegue (production)
FROM nginx:alpine

COPY --from=builder /app/dist/angel-naturals /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]