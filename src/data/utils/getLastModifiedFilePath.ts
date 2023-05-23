import fs from "fs";
import path from "path";

export const getLastModifiedFilePath = (prefix: string) => {
  const folderPath = path.join(process.cwd(), "report");
  const dateFolders = fs.readdirSync(folderPath);

  // Sort date folders in descending order
  const sortedDateFolders = dateFolders.sort((a, b) => {
    const dateA = parseInt(a, 10);
    const dateB = parseInt(b, 10);
    return dateB - dateA;
  });

  for (const dateFolder of sortedDateFolders) {
    const dateFolderPath = path.join(folderPath, dateFolder);
    const timeFolders = fs.readdirSync(dateFolderPath);

    // Sort time folders in descending order based on "hhmm" format
    const sortedTimeFolders = timeFolders.sort((a, b) => {
      const timeA = parseInt(a.slice(-4), 10); // Extract the last 4 characters as "hhmm"
      const timeB = parseInt(b.slice(-4), 10); // Extract the last 4 characters as "hhmm"
      return timeB - timeA;
    });

    for (const timeFolder of sortedTimeFolders) {
      const timeFolderPath = path.join(dateFolderPath, timeFolder);
      const files = fs.readdirSync(timeFolderPath);

      const matchingFiles = files.filter(
        (file) => file.startsWith(timeFolder) && file.includes(prefix)
      );
      if (matchingFiles.length > 0) {
        const lastModifiedFile = matchingFiles[0];
        return path.join(timeFolderPath, lastModifiedFile);
      }
    }
  }

  return "";
};
