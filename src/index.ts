#! /usr/bin/env node
import inquirer from "inquirer";
import { GeneralDockerIgnore } from "./config/DockerIgnore";
import { NextDockerComposeFile, NextDockerFile } from "./functions/Next";
import { NodeDockerComposeFile, NodeDockerFile } from "./functions/Node";
import { PhpDockerComposeFile, PhpDockerFile } from "./functions/Php";
import {
    PythonDockerComposeFile,
    PythonDockerFile,
    PythonExtraDockerFile
} from "./functions/Python";
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
  if (dockerFile.length) {
    WriteToFile(process.cwd() + "/Dockerfile", dockerFile);
  }
  if (dockerCompose.length) {
    WriteToFile(process.cwd() + "/docker-compose.yml", dockerCompose);
  }
  if (dockerIgnore.length) {
    WriteToFile(process.cwd() + "/.dockerignore", dockerIgnore);
  }

  console.log("Files Generated Successfully...");
  console.log("🐳 🚀 😍");
};

async function main() {
  const projectTypeList = Object.values(ProjectType);
  const fileTypeList = Object.values(FileType);

  const answer = await inquirer.prompt([
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
  ]);

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
      dockerIgnore = GeneralDockerIgnore;
      break;

    case ProjectType.NextJs:
      if (answer.fileType === FileType.Dockerfile) {
        dockerFile = await NextDockerFile();
      } else if (answer.fileType === FileType.DockerCompose) {
        dockerFile = await NextDockerFile();
        dockerCompose = await NextDockerComposeFile();
      }
      dockerIgnore = GeneralDockerIgnore;
      break;

    case ProjectType.NodeJs:
      if (answer.fileType === FileType.Dockerfile) {
        dockerFile = await NodeDockerFile();
      } else if (answer.fileType === FileType.DockerCompose) {
        dockerFile = await NodeDockerFile();
        dockerCompose = await NodeDockerComposeFile();
      }
      dockerIgnore = GeneralDockerIgnore;
      break;
    case ProjectType.Python:
      if (answer.fileType === FileType.Dockerfile) {
        dockerFile = await PythonDockerFile();
      } else if (answer.fileType === FileType.DockerCompose) {
        dockerFile = await PythonExtraDockerFile();
        dockerCompose = await PythonDockerComposeFile();
      }
      dockerIgnore = GeneralDockerIgnore;
      break;
    case ProjectType.Php:
      dockerFile = await PhpDockerFile();
      dockerCompose = await PhpDockerComposeFile();

      dockerIgnore = GeneralDockerIgnore;
      break;
    default:
      console.log("Something Went Wrong");
      process.exit(0);
  }

  fileWrite(dockerFile, dockerCompose, dockerIgnore);
}

main();
