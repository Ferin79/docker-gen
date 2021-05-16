#! /usr/bin/env node

import figlet from "figlet";
import inquirer from "inquirer";
import ora from "ora";
import { ReactVueAngularDockerIgnore } from "./config/ReactVueAngular/DockerIgnore";
import {
    ReactVueAngularDockerComposeFile,
    ReactVueAngularDockerFile
} from "./functions/ReactVueAngular";
import { FileType } from "./types/FileTypes";
import { ProjectType } from "./types/ProjectTypes";
import { WriteToFile } from "./utils/writeToFile";

const fileWrite = async (
  dockerFile: string,
  dockerCompose: string,
  dockerIgnore: string
) => {
  const spinner = ora();
  spinner.color = "blue";
  spinner.text = "Generating Files";
  spinner.start();
  if (dockerFile.length) {
    WriteToFile(process.cwd() + "/Dockerfile", dockerFile);
  }
  if (dockerCompose.length) {
    WriteToFile(process.cwd() + "/docker-compose.yml", dockerCompose);
  }
  if (dockerIgnore.length) {
    WriteToFile(process.cwd() + "/.dockerignore", dockerIgnore);
  }
  spinner.stop();
  spinner.succeed();
};

figlet("Docker Gen File", function (err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.error(err);

    return;
  }
  console.log(data);

  const projectTypeList = Object.values(ProjectType);
  const fileTypeList = Object.values(FileType);

  inquirer
    .prompt([
      {
        type: "list",
        choices: projectTypeList,
        message: "Select Your Project Type!!! 🤔",
        name: "projectType",
      },
      {
        type: "list",
        choices: fileTypeList,
        message: "What do you want to generate? 🐳",
        name: "fileType",
      },
    ])
    .then(async (answer) => {
      let dockerFile = "";
      let dockerIgnore = "";
      let dockerCompose = "";

      switch (answer.projectType) {
        case ProjectType.Vue:
        case ProjectType.Angular:
        case ProjectType.React:
          if (answer.fileType === FileType.Dockerfile) {
            dockerFile = await ReactVueAngularDockerFile();
          } else if (answer.fileType === FileType.DockerCompose) {
            dockerFile = await ReactVueAngularDockerFile();
            dockerCompose = await ReactVueAngularDockerComposeFile();
          }
          dockerIgnore = ReactVueAngularDockerIgnore;
          break;
        case ProjectType.Node:
          console.log("Coming Soon");
          break;
        case ProjectType.None:
          console.log("More Programming language support will be added soon");
          break;
        default:
          console.log("Something Went Wrong");
      }

      fileWrite(dockerFile, dockerCompose, dockerIgnore);
    });
});
