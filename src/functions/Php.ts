import fs from "fs";
import path from "path";
import {
    MariaDBService,
    MongoService,
    MySQLService,
    PostgreService,
    RedisService
} from "../config/db/Docker";
import {
    mongoClientService,
    pgAdminService,
    phpMyAdminService
} from "../config/db/DockerGUI";
import { askDB } from "../questions/askDB";
import { DBs } from "../types/DBTypes";
import { PortReplace } from "../utils/portReplace";
import { BuildHelp } from "./../config/BuildHelp";
import { DockerCompose, DockerFile } from "./../config/laravel/Docker";
import { Nginx, NginxDockerFile } from "./../config/laravel/Nginx";
import { askPhpFramework } from "./../questions/askPhpFramework";
import { State } from "./../store/index";
import { WriteToFile } from "./../utils/writeToFile";

export const PhpDockerFile = async () => {
  let finalCode = "";

  const { framework } = await askPhpFramework();
  if (framework === "Laravel") {
    finalCode = DockerFile + BuildHelp;
    finalCode = await PortReplace(finalCode, true);

    const NginxP = Nginx.replace(
      /PROJECT_PORT/g,
      State.PROJECT_PORT.toString()
    );

    if (!fs.existsSync("nginx")) {
      fs.mkdirSync("nginx");
    }
    WriteToFile(path.join(process.cwd() + "/nginx/nginx.conf"), NginxP);
    WriteToFile(
      path.join(process.cwd() + "/nginx/Dockerfile"),
      NginxDockerFile
    );
  }

  return finalCode;
};

export const PhpDockerComposeFile = async () => {
  const data = await askDB();
  let services = "";
  let dependsOn = "";
  data.forEach((item) => {
    switch (item.name) {
      case DBs.MySql:
        services += MySQLService;
        dependsOn += "- mysql_database\n\t\t\t";
        if (item.addGUI) {
          services += phpMyAdminService;
        }
        break;
      case DBs.MariaDB:
        services += MariaDBService;
        dependsOn += "- mariadb_database\n\t\t\t";
        if (item.addGUI) {
          services += phpMyAdminService;
        }
        break;
      case DBs.PostgreSQl:
        services += PostgreService;
        dependsOn += "- postgresql_database\n\t\t\t";
        if (item.addGUI) {
          services += pgAdminService;
        }
        break;
      case DBs.MongoDB:
        services += MongoService;
        dependsOn += "- mongodb_database\n\t\t\t";
        if (item.addGUI) {
          services += mongoClientService;
        }
        break;
      case DBs.Redis:
        services += RedisService;
        dependsOn += "- redis_database\n\t\t\t";
        break;
    }
  });

  let finalBuild = DockerCompose.replace("OTHER_SERVICES", services);
  finalBuild = finalBuild.replace("DEPEND_DB", dependsOn);

  const finalCode = await PortReplace(finalBuild, false);

  return finalCode;
};
