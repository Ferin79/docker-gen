import inquirer from "inquirer";

export const askNginx = async () =>
  inquirer.prompt([
    {
      message: `Do You want to use Nginx as Server ???`,
      type: "confirm",
      name: "isNginx",
      default: true,
    },
  ]);
