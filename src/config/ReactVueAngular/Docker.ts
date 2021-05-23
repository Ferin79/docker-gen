export const buildCode = `
# Build Environment
FROM node:lts-alpine as build
WORKDIR /app
COPY package*.json ./
COPY yarn*.lock ./
RUN npm install
COPY . ./
RUN npm run build

# Production Environment
FROM nginx:stable-alpine
COPY --from=build /app/BUILD_FOLDER /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE CLIENT_PORT
CMD ["nginx", "-g", "daemon off;"]
`;

export const dockerCompose = `
version: '3.7'
services:
  web:
    container_name: PROJECT_NAME
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - 'CLIENT_PORT:PROJECT_PORT'
`;
