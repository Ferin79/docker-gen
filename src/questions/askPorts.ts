import inquirer from "inquirer";

export const askPorts = async (projectType: string, defaultPort = 3000) => {
  const { projectPort } = await inquirer.prompt([
    {
      message: `Your ${projectType} Project is Listening at Port ???`,
      type: "number",
      name: "projectPort",
      default: defaultPort,
    },
  ]);

  const { clientPort } = await inquirer.prompt([
    {
      message: `Port You Want to Expose ???`,
      type: "number",
      name: "clientPort",
      default: projectPort,
    },
  ]);

  return { projectPort, clientPort };
};
