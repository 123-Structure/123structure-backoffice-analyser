import fs from "fs";
import { IDemande } from "../../../interfaces/IDemande";
import { addItem } from "./addItem";
import { getLastModifiedFilePath } from "../../getLastModifiedFilePath";
import { checkPageExist } from "../utils/checkPageExist";
import { databaseIdDemandesSpecifiques } from "../../../constants/notionDatabaseID";
import chalk from "chalk";
import { patchItem } from "./patchItem";
import { getCurrentTimestamp } from "../../getCurrentTimestamp";

export const demandeSpecifique = async () => {
  const timestamp = getCurrentTimestamp();

  console.log(
    chalk.bgCyan(
      `❓📖 Reading 'Demande de devis spécifique' at ${timestamp}...`
    )
  );

  const filePath = getLastModifiedFilePath("demandes_devis_specifiques");

  fs.readFile(filePath, "utf-8", (err, jsonData) => {
    if (err) {
      console.error(chalk.bgRed("Error reading JSON file:", err));
      return;
    }

    const data = JSON.parse(jsonData);

    data.forEach((demandeSpecifique: IDemande) => {
      // Perform operations with each item in the JSON data
      checkPageExist(databaseIdDemandesSpecifiques, "ID", demandeSpecifique.ID)
        .then((exists) => {
          if (!exists.test) {
            addItem(demandeSpecifique);
          } else {
            patchItem(demandeSpecifique, exists.pages);
          }
        })
        .catch((error) => {
          console.error(chalk.bgRed("Page Exist Error :", error));
        });
    });
  });
};
