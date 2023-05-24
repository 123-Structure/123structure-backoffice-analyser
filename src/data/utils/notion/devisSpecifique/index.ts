import fs from "fs";
import { IDevisSpecifique } from "../../../interfaces/IDevisSpeciques";
import { addItem } from "./addItem";
import { getLastModifiedFilePath } from "../../getLastModifiedFilePath";
import { checkPageExist } from "../utils/checkPageExist";
import { databaseIdDevisSpecifiques } from "../../../constants/notionDatabaseID";
import chalk from "chalk";

export const devisSpecifiques = async () => {
  console.log(
    chalk.bgCyan("🏁 Start reading 'Demande de devis spécifique'...")
  );

  const filePath = getLastModifiedFilePath("demandes_devis_specifiques");

  fs.readFile(filePath, "utf-8", (err, jsonData) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      return;
    }

    const data = JSON.parse(jsonData);

    data.forEach((demandeDevis: IDevisSpecifique, index: number) => {
      // Perform operations with each item in the JSON data
      checkPageExist(databaseIdDevisSpecifiques, "ID", demandeDevis.ID)
        .then((exists) => {
          if (!exists) {
            addItem(demandeDevis);
          }
        })
        .catch((error) => {
          console.error("Page Exist Error :", error.message);
        });
    });
  });
};
