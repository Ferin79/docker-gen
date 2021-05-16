export const buildCode = `
# Build Environment
FROM node:lts-alpine as build
WORKDIR /app
COPY package*.json ./
COPY yarn*.lock ./
RUN npm install
COPY . ./
RUN npm run build
`;

export const nginxProdCode = `
# Production Environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE CLIENT_PORT
CMD ["nginx", "-g", "daemon off;"]
`;

export const commandsCode = `
\n
# Build Command
# docker build -t PROJECT_NAME .
\n
# Run Command
# docker run -d -p CLIENT_PORT:PROJECT_PORT  PROJECT_NAME
`;

export const dockerCompose = `
version: '3.7'
services:
  web:
    container_name: PROJECT_NAME:latest
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - 'CLIENT_PORT:PROJECT_PORT'
`;
