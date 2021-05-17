#! /usr/bin/env node
import figlet from "figlet";
import inquirer from "inquirer";
import ora from "ora";
import { GeneralDockerIgnore } from "./config/DockerIgnore";
import { NextDockerComposeFile, NextDockerFile } from "./functions/Next";
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
  console.log("Files Generated Successfully...");
  console.log("🐳 🚀 😍");
};

figlet("Docker Gen File", async function (err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.error(err);

    return;
  }
  console.log(data);

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
    default:
      console.log("Something Went Wrong");
  }

  fileWrite(dockerFile, dockerCompose, dockerIgnore);
});
