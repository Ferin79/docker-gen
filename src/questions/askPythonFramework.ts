import { exec } from "child_process";
import inquirer from "inquirer";
import { State } from "./../store/index";
import { basename } from "./../utils/basename";

export const askPythonFramework = async () => {
  exec("pip freeze > requirements-gen.txt", async (err) => {
    if (err) {
      console.log(`
         Execute: pip freeze > requirements-gen.txt
      `);
    }

    exec("echo 'gunicorn==20.0.4' >> requirements-gen.txt", async (err) => {
      if (err) {
        console.log(`
            Add 'gunicorn==20.0.4' to requirements-gen.txt file
        `);
      }
    });
  });
  const { framework } = await inquirer.prompt([
    {
      type: "list",
      message: "Choose Framework!!!",
      name: "framework",
      choices: ["Django", "Flask"],
      default: "Django",
    },
  ]);
  const { folderName } = await inquirer.prompt([
    {
      type: "input",
      message: "What is the name of folder that contains settings.py file??? ",
      name: "folderName",
      default: basename,
    },
  ]);
  State.setProjectName(folderName);

  return { framework, folderName };
};
