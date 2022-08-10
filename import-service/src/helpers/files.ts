import * as fs from "fs";
import path from "path";

import csv from "csv-parser";

export const readJson = async (filePath) => {
  const file = await fs.readFile(path.resolve(filePath));
  return JSON.parse(file.toString());
};

export const readCsv = async (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream(path.resolve(filePath))
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        resolve(results);
      })
      .on("error", (err) => {
        console.log(err);
        reject(err);
      });
  });
};

export const readStream = (filePath) => {
  return fs.createReadStream(path.resolve(filePath)).on("error", (err) => {
    console.log(err);
    throw new Error("Error reading file");
  });
};
