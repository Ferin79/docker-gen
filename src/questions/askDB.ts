/* eslint-disable no-case-declarations */
import inquirer from "inquirer";
import { DBs } from "./../types/DBTypes";

export const askDB = async () => {
  const dbNames = Object.values(DBs);

  const { isDB } = await inquirer.prompt([
    {
      type: "confirm",
      message: "Do you want to add Database??? 🗂",
      name: "isDB",
      default: true,
    },
  ]);
  if (isDB) {
    const { databases } = await inquirer.prompt([
      {
        type: "checkbox",
        message: "Select Database",
        name: "databases",
        choices: dbNames,
      },
    ]);

    const finalData: { name: string; addGUI: boolean }[] = [];

    for (let i = 0; i < databases.length; i++) {
      const item = databases[i] as string;

      switch (item) {
        case DBs.MySql:
        case DBs.MariaDB:
          const { phpmyadmin } = await inquirer.prompt([
            {
              type: "confirm",
              message: `Do you want to add PhpMyAdmin for ${item}???`,
              name: "phpmyadmin",
              default: true,
            },
          ]);
          finalData.push({
            name: item,
            addGUI: phpmyadmin,
          });
          break;

        case DBs.PostgreSQl:
          const { pgadmin4 } = await inquirer.prompt([
            {
              type: "confirm",
              message: `Do you want to add PgAdmin4 for ${item}???`,
              name: "pgadmin4",
              default: true,
            },
          ]);
          finalData.push({
            name: item,
            addGUI: pgadmin4,
          });
          break;
        case DBs.MongoDB:
          const { mongoClient } = await inquirer.prompt([
            {
              type: "confirm",
              message: `Do you want to add Mongo Client for ${item}???`,
              name: "mongoClient",
              default: true,
            },
          ]);
          finalData.push({
            name: item,
            addGUI: mongoClient,
          });
          break;
        default:
          finalData.push({
            name: item,
            addGUI: false,
          });
      }
    }
    return finalData;
  }
  return [] as { name: string; addGUI: boolean }[];
};
