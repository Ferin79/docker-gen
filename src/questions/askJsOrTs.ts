import inquirer from "inquirer";

export const askJsOrTs = async (projectType: string) =>
  inquirer.prompt([
    {
      message: `Your ${projectType} Project uses ...`,
      type: "list",
      choices: ["JavaScript", "TypeScript"],
      name: "languageType",
    },
  ]);
