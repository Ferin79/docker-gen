import fs from "fs";

export const WriteToFile = (location: string, data: string) => {
  fs.writeFileSync(location, data);
};
