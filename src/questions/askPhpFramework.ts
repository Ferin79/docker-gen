import inquirer from "inquirer";

export const askPhpFramework = async () => {
  const { framework } = await inquirer.prompt([
    {
      type: "list",
      message: "Choose Framework!!!",
      name: "framework",
      choices: ["Laravel", "None"],
      default: "Laravel",
    },
  ]);
  if (framework === "None") {
    console.log("We are added new framework soon");
    process.exit(0);
  }

  return { framework };
};
