import fs from "fs";
import path from "path";
import { getCurrentTimestampFilename } from "./getTimestampFilename";
import { IUrl } from "../interfaces/IUrl";
import chalk from "chalk";

export const generateReport = (timestamp: string, url: IUrl, data: any) => {
  // Check if Report folder exist
  if (!fs.existsSync("report")) {
    fs.mkdirSync("report");
  }

  // Check if Timestamp folder exist
  const timestampFolderPath = path.join(
    "report",
    getCurrentTimestampFilename(timestamp).slice(0, -5)
  );

  if (!fs.existsSync(timestampFolderPath)) {
    fs.mkdirSync(timestampFolderPath);
  }

  // Check if TimestampFile folder exist
  const timestampFileFolderPath = path.join(
    timestampFolderPath,
    getCurrentTimestampFilename(timestamp)
  );

  if (!fs.existsSync(timestampFileFolderPath)) {
    fs.mkdirSync(timestampFileFolderPath);
  }

  // Generate JSON file
  const filename = `${getCurrentTimestampFilename(timestamp)}_${url.id.slice(
    2
  )}.json`;
  const filePath = path.join(timestampFileFolderPath, filename);
  const fileContent = JSON.stringify(data, null, 2);

  fs.writeFileSync(filePath, fileContent);
  console.log(chalk.bgGreen(`📄 Generated file: ${filename}`));
};
