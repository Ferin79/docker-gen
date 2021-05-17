import { BuildHelp } from "./../config/BuildHelp";
import { buildCode, dockerCompose } from "./../config/nextjs/Docker";
import { PortReplace } from "./../utils/portReplace";

export const NextDockerFile = async () => {
  const finalBuild = buildCode + BuildHelp;
  const finalCode = await PortReplace(finalBuild, true);
  return finalCode;
};
export const NextDockerComposeFile = async () => {
  const finalCode = await PortReplace(dockerCompose, false);
  return finalCode;
};
