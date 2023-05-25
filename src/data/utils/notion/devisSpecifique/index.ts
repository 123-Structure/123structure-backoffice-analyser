import fs from "fs";
import { IDevisSpecifique } from "../../../interfaces/IDevisSpeciques";
import { addItem } from "./addItem";
import { getLastModifiedFilePath } from "../../getLastModifiedFilePath";
import { checkPageExist } from "../utils/checkPageExist";
import { databaseIdDevisSpecifiques } from "../../../constants/notionDatabaseID";
import chalk from "chalk";
import { patchItem } from "./patchItem";
import { getCurrentTimestamp } from "../../getCurrentTimestamp";

export const devisSpecifiques = async () => {
  const timestamp = getCurrentTimestamp();

  console.log(
    chalk.bgCyan(`📖 Reading 'Demande de devis spécifique' at ${timestamp}...`)
  );

  const filePath = getLastModifiedFilePath("demandes_devis_specifiques");

  fs.readFile(filePath, "utf-8", (err, jsonData) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      return;
    }

    const data = JSON.parse(jsonData);

    data.forEach((demandeDevis: IDevisSpecifique) => {
      // Perform operations with each item in the JSON data
      checkPageExist(databaseIdDevisSpecifiques, "ID", demandeDevis.ID)
        .then((exists) => {
          if (!exists.test) {
            addItem(demandeDevis);
          } else {
            patchItem(demandeDevis, exists.pages);
          }
        })
        .catch((error) => {
          console.error(chalk.bgRed("Page Exist Error :", error));
        });
    });
  });
};
