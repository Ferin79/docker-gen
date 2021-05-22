import fs from "fs";
import inquirer from "inquirer";
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
import { DockerCompose, DockerFile } from "../config/django/Docker";
import { askDB } from "../questions/askDB";
import { DBs } from "../types/DBTypes";
import { PortReplace } from "../utils/portReplace";
import { Nginx, NginxDockerFile, uwsgi_params } from "./../config/django/Nginx";
import { entryPoint } from "./../config/django/scripts";
import { WriteToFile } from "./../utils/writeToFile";

export const PythonDockerFile = async () => {
  let finalCode = "";

  const { framework } = await inquirer.prompt([
    {
      type: "list",
      message: "Choose Framework!!!",
      name: "framework",
      choices: ["Django", "Flask"],
      default: "Django",
    },
  ]);
  if (framework === "Django") {
    finalCode = await PortReplace(DockerFile, true);

    WriteToFile(path.join(process.cwd() + "/entrypoint.sh"), entryPoint);
    if (!fs.existsSync("nginx")) {
      fs.mkdirSync("nginx");
    }
    WriteToFile(path.join(process.cwd() + "/nginx/default.conf"), Nginx);
    WriteToFile(
      path.join(process.cwd() + "/nginx/Dockerfile"),
      NginxDockerFile
    );
    WriteToFile(path.join(process.cwd() + "/nginx/uwsgi_params"), uwsgi_params);
  }

  return finalCode;
};

export const PythonDockerComposeFile = async () => {
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

  const finalBuild = DockerCompose.replace("OTHER_SERVICES", services);

  const finalCode = await PortReplace(finalBuild, false);
  return finalCode;
};
