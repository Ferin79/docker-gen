import {
    MariaDBService,
    MongoService,
    MySQLService,
    PostgreService,
    RedisService
} from "./../config/db/Docker";
import {
    mongoClientService,
    pgAdminService,
    phpMyAdminService
} from "./../config/db/DockerGUI";
import {
    buildCode,
    dockerCompose,
    withTypeScript
} from "./../config/nodejs/Docker";
import { askBuildQues } from "./../questions/askBuildQues";
import { askDB } from "./../questions/askDB";
import { DBs } from "./../types/DBTypes";
import { PortReplace } from "./../utils/portReplace";

export const NodeDockerFile = async () => {
  let finalBuild = "";
  const {
    languageType,
    makeBuildMain,
    buildCmdMain,
    buildOtpMain,
    startScript,
  } = await askBuildQues();

  if (languageType === "TypeScript" && makeBuildMain) {
    finalBuild += withTypeScript + buildCode;
    finalBuild = finalBuild.replace(/BUILD_SCRIPT/g, buildCmdMain);
    finalBuild = finalBuild.replace(
      /COPY_FOLDER/g,
      `--from=build ${buildOtpMain}`
    );
  } else {
    finalBuild = buildCode;
    finalBuild = finalBuild.replace(/COPY_FOLDER/g, ".");
  }
  const cmds = JSON.stringify(startScript.split(" "));
  finalBuild = finalBuild.replace(/START_SCRIPT/g, cmds);

  const finalCode = await PortReplace(finalBuild, true);

  return finalCode;
};

export const NodeDockerComposeFile = async () => {
  const data = await askDB();
  let services = "";
  data.forEach((item) => {
    switch (item.name) {
      case DBs.MySql:
        services += MySQLService;
        if (item.addGUI) {
          services += phpMyAdminService;
        }
        break;
      case DBs.MariaDB:
        services += MariaDBService;
        if (item.addGUI) {
          services += phpMyAdminService;
        }
        break;
      case DBs.PostgreSQl:
        services += PostgreService;
        if (item.addGUI) {
          services += pgAdminService;
        }
        break;
      case DBs.MongoDB:
        services += MongoService;
        if (item.addGUI) {
          services += mongoClientService;
        }
        break;
      case DBs.Redis:
        services += RedisService;
        break;
    }
  });

  const finalBuild = dockerCompose.replace("OTHER_SERVICES", services);

  const finalCode = await PortReplace(finalBuild, false);
  return finalCode;
};
