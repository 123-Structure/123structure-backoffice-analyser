import fs from "fs";
import { addItem } from "./addItem";
// import { patchItem } from "./patchItem";
import { getLastModifiedFilePath } from "../../getLastModifiedFilePath";
import { checkPageExist } from "../utils/checkPageExist";
import { databaseIdDevisCommandes } from "../../../constants/notionDatabaseID";
import chalk from "chalk";
import { getCurrentTimestamp } from "../../getCurrentTimestamp";
import { IDevisCommande } from "../../../interfaces/IDevisCommande";

export const devisSauvegardes = async () => {
  const timestamp = getCurrentTimestamp();

  console.log(
    chalk.bgCyan(`🏡📖 Reading 'Devis sauvegardés' at ${timestamp}...`)
  );

  const filePath = getLastModifiedFilePath("devis_sauvegardes");

  fs.readFile(filePath, "utf-8", (err, jsonData) => {
    if (err) {
      console.error(chalk.bgRed("Error reading JSON file:", err));
      return;
    }

    const data = JSON.parse(jsonData);

    data.forEach((devisCommande: IDevisCommande) => {
      // Perform operations with each item in the JSON data
      checkPageExist(databaseIdDevisCommandes, "Devis", devisCommande.Numéro)
        .then((exists) => {
          if (exists !== undefined) {
            console.log(exists);
            if (!exists.test) {
              addItem(devisCommande);
            } else {
              // patchItem(demandeSpecifique, exists.pages);
            }
          }
        })
        .catch((error) => {
          console.error(chalk.bgRed("Page Exist Error :", error));
        });
    });
  });
};
