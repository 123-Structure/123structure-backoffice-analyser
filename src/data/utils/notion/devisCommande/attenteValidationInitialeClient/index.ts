import fs from "fs";
import { addItem } from "./addItem";
import { patchItem } from "./patchItem";
import { getLastModifiedFilePath } from "../../../getLastModifiedFilePath";
import { checkPageExist } from "../../utils/checkPageExist";
import { databaseIdDevisCommandes } from "../../../../constants/notionDatabaseID";
import chalk from "chalk";
import { getCurrentTimestamp } from "../../../getCurrentTimestamp";
import { IDevisCommande } from "../../../../interfaces/IDevisCommande";

export const attenteValidationInitialeClient = async () => {
  const timestamp = getCurrentTimestamp();

  console.log(
    chalk.bgCyan(
      `✅📖 Reading 'Attente de validation initiale du client' at ${timestamp}...`
    )
  );

  const filePath = getLastModifiedFilePath(
    "commandes_01-attente-validation-initiale-client"
  );

  fs.readFile(filePath, "utf-8", (err, jsonData) => {
    if (err) {
      console.error(
        chalk.bgRed(
          "Error reading JSON file ('Attente de validation initiale du client') :",
          err
        )
      );
      return;
    }

    const data = JSON.parse(jsonData);

    data.forEach((devisSauvegarde: IDevisCommande) => {
      // Perform operations with each item in the JSON data
      checkPageExist(databaseIdDevisCommandes, "Devis", devisSauvegarde.Devis)
        .then((exists) => {
          if (exists !== undefined) {
            if (!exists.test) {
              addItem(devisSauvegarde);
            } else {
              patchItem(devisSauvegarde, exists.pages);
            }
          }
        })
        .catch((error) => {
          console.error(chalk.bgRed("Page Exist Error :", error));
        });
    });
  });
};
