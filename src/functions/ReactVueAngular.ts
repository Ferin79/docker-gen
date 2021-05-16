import {
    buildCode,


    commandsCode, defaultProdCode,

    dockerCompose, nginxProdCode
} from "../config/ReactVueAngular/Docker";
import { askNginx } from "../questions/askNginx";
import { basename } from "../utils/basename";
import { NginxConf } from "./../config/ReactVueAngular/Nginx";
import { WriteToFile } from "./../utils/writeToFile";

export const ReactVueAngularDockerFile = async () => {
  const data = askNginx().then((nginxAnswer) => {
    let finalBuild = "";
    if (nginxAnswer.isNginx) {
      finalBuild = buildCode + nginxProdCode;
      WriteToFile(process.cwd() + "/nginx.conf", NginxConf);
    } else {
      finalBuild = buildCode + defaultProdCode;
    }
    finalBuild += commandsCode;

    finalBuild = finalBuild.replace(/PROJECT_NAME/g, basename);
    finalBuild = finalBuild.replace(/CLIENT_PORT/g, "80");
    finalBuild = finalBuild.replace(/PROJECT_PORT/g, "80");

    return finalBuild;
  });
  return data;
};

export const ReactVueAngularDockerComposeFile = async () => {
  let finalCompose = dockerCompose;
  finalCompose = finalCompose.replace(/PROJECT_NAME/g, basename);
  finalCompose = finalCompose.replace(/CLIENT_PORT/g, "80");
  finalCompose = finalCompose.replace(/PROJECT_PORT/g, "80");

  return finalCompose;
};
