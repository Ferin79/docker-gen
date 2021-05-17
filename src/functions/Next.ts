import { BuildHelp } from "./../config/BuildHelp";
import { buildCode, dockerCompose } from "./../config/nextjs/Docker";
import { askPorts } from "./../questions/askPorts";
import { basename } from "./../utils/basename";

export const NextDockerFile = async () => {
  const { projectPort, clientPort } = await askPorts("NextJs");

  let finalBuild = buildCode + BuildHelp;

  finalBuild = finalBuild.replace(/PROJECT_NAME/g, basename);
  finalBuild = finalBuild.replace(/CLIENT_PORT/g, clientPort);
  finalBuild = finalBuild.replace(/PROJECT_PORT/g, projectPort);

  return finalBuild;
};
export const NextDockerComposeFile = async () => {
  let finalCompose = dockerCompose;
  finalCompose = finalCompose.replace(/PROJECT_NAME/g, basename);
  finalCompose = finalCompose.replace(/CLIENT_PORT/g, "80");
  finalCompose = finalCompose.replace(/PROJECT_PORT/g, "80");

  return finalCompose;
};
