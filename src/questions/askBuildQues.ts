import inquirer from "inquirer";

export const askBuildQues = async () => {
  let makeBuildMain = "";
  let buildCmdMain = "";
  let buildOtpMain = "";

  const { languageType } = await inquirer.prompt([
    {
      message: `Which language did you used??? 🤔`,
      type: "list",
      choices: ["JavaScript", "TypeScript"],
      name: "languageType",
    },
  ]);
  if (languageType === "TypeScript") {
    const { makeBuild } = await inquirer.prompt([
      {
        message: `Do you want to make build??? 🔨`,
        type: "confirm",
        name: "makeBuild",
        default: true,
      },
    ]);
    makeBuildMain = makeBuild;
    if (makeBuild) {
      const { buildCmd } = await inquirer.prompt([
        {
          message: `What is your build script??? 🔨`,
          type: "text",
          name: "buildCmd",
          default: "npm run build",
        },
      ]);
      buildCmdMain = buildCmd;

      const { buildOtp } = await inquirer.prompt([
        {
          message: `What is your output folder of build script??? 🔨`,
          type: "text",
          name: "buildOtp",
          default: "dist",
        },
      ]);
      buildOtpMain = buildOtp;
    }
  }
  const { startScript } = await inquirer.prompt([
    {
      message: `What is your start script???`,
      type: "input",
      name: "startScript",
      default: "npm start",
    },
  ]);

  return {
    languageType,
    makeBuildMain,
    buildCmdMain,
    buildOtpMain,
    startScript,
  };
};
