import { buildCode, dockerCompose } from "../config/ReactVueAngular/Docker";
import { BuildHelp } from "./../config/BuildHelp";
import { NginxConf } from "./../config/ReactVueAngular/Nginx";
import { PortReplace } from "./../utils/portReplace";
import { WriteToFile } from "./../utils/writeToFile";

export const ReactVueAngularDockerFile = async () => {
  WriteToFile(process.cwd() + "/nginx.conf", NginxConf);

  const finalBuild = buildCode + BuildHelp;
  const finalCode = await PortReplace(finalBuild, false);
  return finalCode;
};

export const ReactVueAngularDockerComposeFile = async () => {
  const finalCode = await PortReplace(dockerCompose, false);
  return finalCode;
};
