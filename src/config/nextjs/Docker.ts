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
FROM node:lts-alpine
WORKDIR /app

COPY package*.json ./
COPY yarn*.lock ./

RUN npm install --only=production

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=build /app/public ./public
COPY --from=build --chown=nextjs:nodejs /app/.next ./.next

USER nextjs

EXPOSE PROJECT_PORT
CMD ["npm","start"]
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
