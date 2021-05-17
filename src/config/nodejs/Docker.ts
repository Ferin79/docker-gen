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
