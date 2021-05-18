export const buildCode = `
# Production Environment
FROM node:lts-alpine
WORKDIR /app

COPY package*.json ./
COPY yarn*.lock ./

RUN npm install --only=production

COPY COPY_FOLDER ./

EXPOSE PROJECT_PORT

CMD START_SCRIPT
`;

export const withTypeScript = `
# Build Environment
FROM node:lts-alpine as build
WORKDIR /app

COPY package*.json ./
COPY yarn*.lock ./

RUN npm install

COPY . ./

RUN BUILD_SCRIPT
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
            - CLIENT_PORT:PROJECT_PORT

    OTHER_SERVICES

volumes:
    data:
networks:
    dockergenfile:
`;
