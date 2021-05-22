import path from "path";

export const basename = path
  .basename(process.cwd())
  .split("-")
  .join("")
  .split(" ")
  .join("");
