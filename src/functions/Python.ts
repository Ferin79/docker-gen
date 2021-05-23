import { exec } from "child_process";
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
import { DockerCompose, DockerFile } from "../config/django/Docker";
import { askDB } from "../questions/askDB";
import { DBs } from "../types/DBTypes";
import { PortReplace } from "../utils/portReplace";
import { BuildHelp } from "./../config/BuildHelp";
import { OnlyDockerFile } from "./../config/django/Docker";
import { Nginx, NginxDockerFile } from "./../config/django/Nginx";
import { entryPoint } from "./../config/django/scripts";
import { askPythonFramework } from "./../questions/askPythonFramework";
import { State } from "./../store/index";
import { basename } from "./../utils/basename";
import { WriteToFile } from "./../utils/writeToFile";

export const PythonDockerFile = async () => {
  let finalCode = "";

  exec("pip freeze > requirements-gen.txt", async (err) => {
    if (err) {
      console.log(err);
      process.exit(0);
    }

    exec("echo 'gunicorn==20.0.4' >> requirements-gen.txt", async (err) => {
      if (err) {
        console.log(err);
        process.exit(0);
      }
    });
  });

  const framework = await askPythonFramework();
  if (framework === "Django") {
    finalCode = OnlyDockerFile + BuildHelp;
    finalCode = await PortReplace(finalCode, true);
  }

  return finalCode;
};

export const PythonExtraDockerFile = async () => {
  let finalCode = "\t";
  const framework = await askPythonFramework();
  if (framework === "Django") {
    finalCode = await PortReplace(DockerFile, true);

    const NginxP = Nginx.replace(
      /PROJECT_PORT/g,
      State.PROJECT_PORT.toString()
    );

    WriteToFile(path.join(process.cwd() + "/entrypoint.sh"), entryPoint);
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

export const PythonDockerComposeFile = async () => {
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

  let CMDcode = `
  echo "# Use this settings for docker created by docker-gen-file" >> BASE_PROJECT_NAME/settings.py &&
  echo 'STATIC_URL = "/staticfiles/"' >> BASE_PROJECT_NAME/settings.py &&
  echo 'STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")' >> BASE_PROJECT_NAME/settings.py &&
  echo 'MEDIA_URL = "/mediafiles/"' >> BASE_PROJECT_NAME/settings.py &&
  echo 'MEDIA_ROOT = os.path.join(BASE_DIR, "mediafiles")' >> BASE_PROJECT_NAME/settings.py
`;

  CMDcode = CMDcode.replace(/BASE_PROJECT_NAME/g, basename);

  exec(CMDcode, async (err) => {
    if (err) {
      console.log(
        `
        Add this lines in settings.py file


        STATIC_URL = "/staticfiles/"
        STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")

        MEDIA_URL = "/mediafiles/"
        MEDIA_ROOT = os.path.join(BASE_DIR, "mediafiles")

        `
      );
    }
  });
  console.log(`
    Update your code in settings.py file in order to use Database and ENV Variables.

    Check your settings.py file..........
  `);
  return finalCode;
};
