import { reactDockerFile } from "./functions/react";
import { FileType } from "./types/FileTypes";
import { ProjectType } from "./types/ProjectTypes";
import figlet from "figlet";
import inquirer from "inquirer";

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
    .then((answer) => {
      if (
        answer.projectType === ProjectType["React"] &&
        answer.fileType === FileType["Dockerfile"]
      ) {
        reactDockerFile();
      }
    });
});
