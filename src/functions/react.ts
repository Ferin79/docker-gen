import fs from "fs";
import { askNginx } from "./../questions/askNginx";
import ora from "ora";

const buildCode = `
# Build Environment
FROM node:13.12.0-alpine as build
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build
`;

const nginxCode = `
# Production Environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE CLIENT_PORT
CMD ["nginx", "-g", "daemon off;"]
`;

const defaultProdCode = `
# Production Environment
FROM node:13.12.0-alpine
WORKDIR /app
COPY --from=build /app/build ./
EXPOSE CLIENT_PORT
`;

const commandsCode = `
\n
# Build Command
# docker build -t projectName:tag .
\n
# Run Command
# docker run -d  projectName:tag
`;

export const reactDockerFile = async () => {
  askNginx().then((nginxAnswer) => {
    let finalBuild = "";
    if (nginxAnswer.isNginx) {
      finalBuild = buildCode + nginxCode;
    } else {
      finalBuild = buildCode + defaultProdCode;
    }
    finalBuild += commandsCode;

    finalBuild = finalBuild.replace("CLIENT_PORT", "80");

    const spinner = ora();
    spinner.color = "blue";
    spinner.text = "Generating Files";
    spinner.start();
    fs.writeFileSync(process.cwd() + "/Dockerfile", finalBuild);
    spinner.stop();
    spinner.succeed();
  });
};
