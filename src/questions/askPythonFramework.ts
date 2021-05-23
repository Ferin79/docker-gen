import inquirer from "inquirer";

export const askPythonFramework = async () => {
  const { framework } = await inquirer.prompt([
    {
      type: "list",
      message: "Choose Framework!!!",
      name: "framework",
      choices: ["Django", "Flask"],
      default: "Django",
    },
  ]);

  return framework;
};
