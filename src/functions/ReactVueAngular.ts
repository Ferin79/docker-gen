import { buildCode, dockerCompose } from "../config/ReactVueAngular/Docker";
import { basename } from "../utils/basename";
import { BuildHelp } from "./../config/BuildHelp";
import { NginxConf } from "./../config/ReactVueAngular/Nginx";
import { WriteToFile } from "./../utils/writeToFile";

export const ReactVueAngularDockerFile = async () => {
  WriteToFile(process.cwd() + "/nginx.conf", NginxConf);

  let finalBuild = buildCode + BuildHelp;
  finalBuild = finalBuild.replace(/PROJECT_NAME/g, basename);
  finalBuild = finalBuild.replace(/CLIENT_PORT/g, "80");
  finalBuild = finalBuild.replace(/PROJECT_PORT/g, "80");

  return finalBuild;
};

export const ReactVueAngularDockerComposeFile = async () => {
  let finalCompose = dockerCompose;
  finalCompose = finalCompose.replace(/PROJECT_NAME/g, basename);
  finalCompose = finalCompose.replace(/CLIENT_PORT/g, "80");
  finalCompose = finalCompose.replace(/PROJECT_PORT/g, "80");

  return finalCompose;
};
