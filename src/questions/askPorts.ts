import inquirer from "inquirer";

export const askPorts = async (defaultPort = 3000) => {
  const { projectPort } = await inquirer.prompt([
    {
      message: `Your project is listening at port??? 🔈`,
      type: "number",
      name: "projectPort",
      default: defaultPort,
    },
  ]);

  const { clientPort } = await inquirer.prompt([
    {
      message: `Port you want to expose??? 🔈`,
      type: "number",
      name: "clientPort",
      default: projectPort,
    },
  ]);

  return { projectPort, clientPort };
};
