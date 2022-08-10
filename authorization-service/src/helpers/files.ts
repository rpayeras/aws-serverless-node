import * as fs from "fs/promises";
import path from "path";

export const readJson = async (filePath) => {
  const file = await fs.readFile(path.resolve(filePath));
  return JSON.parse(file.toString());
};
