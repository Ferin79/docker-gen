import inquirer from "inquirer";
import { buildCode, dockerCompose } from "../config/ReactVueAngular/Docker";
import { BuildHelp } from "./../config/BuildHelp";
import { NginxConf } from "./../config/ReactVueAngular/Nginx";
import { PortReplace } from "./../utils/portReplace";
import { WriteToFile } from "./../utils/writeToFile";

export const ReactVueAngularDockerFile = async () => {
  const { buildOtp } = await inquirer.prompt([
    {
      message: `Production files are built into??? 🔨`,
      type: "text",
      name: "buildOtp",
      default: "dist",
    },
  ]);
  WriteToFile(process.cwd() + "/nginx.conf", NginxConf);

  let finalBuild = buildCode + BuildHelp;
  finalBuild = finalBuild.replace("BUILD_FOLDER", buildOtp);
  const finalCode = await PortReplace(finalBuild, false);
  return finalCode;
};

export const ReactVueAngularDockerComposeFile = async () => {
  const finalCode = await PortReplace(dockerCompose, false);
  return finalCode;
};
