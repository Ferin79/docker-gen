import inquirer from "inquirer";

export const askPorts = async (projectType: string, defaultPort = 3000) =>
  inquirer.prompt([
    {
      message: `Your ${projectType} Project is Listening at Port ???`,
      type: "number",
      name: "projectPort",
      default: defaultPort,
    },
    {
      message: `Port You Want to Expose ???`,
      type: "number",
      name: "clientPort",
    },
  ]);
