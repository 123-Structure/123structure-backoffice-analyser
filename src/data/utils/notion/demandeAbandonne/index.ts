import fs from "fs";
import { IDemande } from "../../../interfaces/IDemande";
import { addItem } from "./addItem";
import { patchItem } from "./patchItem";
import { getLastModifiedFilePath } from "../../getLastModifiedFilePath";
import { checkPageExist } from "../utils/checkPageExist";
import { databaseIdDemandesAbandonnees } from "../../../constants/notionDatabaseID";
import chalk from "chalk";
import { getCurrentTimestamp } from "../../getCurrentTimestamp";

export const demandeAbandonne = async () => {
  const timestamp = getCurrentTimestamp();

  console.log(
    chalk.bgCyan(
      `🗑️📖 Reading 'Demande de devis abandonnées' at ${timestamp}...`
    )
  );

  const filePath = getLastModifiedFilePath("demandes_devis_abandonnees");

  fs.readFile(filePath, "utf-8", (err, jsonData) => {
    if (err) {
      console.error(
        chalk.bgRed(
          "Error reading JSON file (Demande de devis abandonnées) :",
          err
        )
      );
      return;
    }

    const data = JSON.parse(jsonData);

    data.forEach((demandeAbandonne: IDemande) => {
      // Perform operations with each item in the JSON data
      checkPageExist(databaseIdDemandesAbandonnees, "ID", demandeAbandonne.ID)
        .then((exists) => {
          if (exists !== undefined) {
            if (!exists.test) {
              addItem(demandeAbandonne);
            } else {
              patchItem(demandeAbandonne, exists.pages);
            }
          }
        })
        .catch((error) => {
          console.error(
            chalk.bgRed(
              `Page Exist Error (Demande de devis spécifique - ${demandeAbandonne.ID}) :`,
              error
            )
          );
        });
    });
  });
};
