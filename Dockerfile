
# Build Environment
FROM node:13.12.0-alpine as build
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build

# Production Environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]



# Build Command
# docker build -t projectName:tag .


# Run Command
# docker run -d  projectName:tag
