import fs from "fs";
import path from "path";
import { getCurrentTimestampFilename } from "./getTimestampFileName";
import { IUrl } from "../interfaces/IUrl";
import chalk from "chalk";

export const generateReport = (url: IUrl, data: any) => {
  // Check if Report folder exist
  if (!fs.existsSync("report")) {
    fs.mkdirSync("report");
  }

  // Check if Timestamp folder exist
  const timestampFolderPath = path.join(
    "report",
    getCurrentTimestampFilename()
  );

  if (!fs.existsSync(timestampFolderPath)) {
    fs.mkdirSync(timestampFolderPath);
  }

  // Generate JSON file
  const filename = `${getCurrentTimestampFilename()}_${url.id}.json`;
  const filePath = path.join(timestampFolderPath, filename);
  const fileContent = JSON.stringify(data, null, 2);

  fs.writeFileSync(filePath, fileContent);
  console.log(chalk.bgGreen(`📄 Generated file: ${filename}`));
};
