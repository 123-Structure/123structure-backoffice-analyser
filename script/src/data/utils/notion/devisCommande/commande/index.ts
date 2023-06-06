import fs from "fs";
import { addItem } from "./addItem";
import { patchItem } from "./patchItem";
import { getLastModifiedFilePath } from "../../../getLastModifiedFilePath";
import { checkPageExist } from "../../utils/checkPageExist";
import { databaseIdDevisCommandes } from "../../../../constants/notionDatabaseID";
import chalk from "chalk";
import { getCurrentTimestamp } from "../../../getCurrentTimestamp";
import { IDevisCommande } from "../../../../interfaces/IDevisCommande";
import { IUrl } from "../../../../interfaces/IUrl";
import { getStatusFromUrl } from "../getStatusFromUrl";

export const commande = async (url: IUrl) => {
  const timestamp = getCurrentTimestamp();

  const emoji = url.id.charAt(0);
  const urlTitle = getStatusFromUrl(url.id).substring(2);
  const urlId = url.id.substring(2);

  console.log(
    chalk.bgCyan(`${emoji}📖 Reading '${urlTitle}' at ${timestamp}...`)
  );

  const filePath = getLastModifiedFilePath(urlId);

  fs.readFile(filePath, "utf-8", (err, jsonData) => {
    if (err) {
      console.error(
        chalk.bgRed(`Error reading JSON file (${urlTitle}) :`, err)
      );
      return;
    }

    const data = JSON.parse(jsonData);

    if (data[0] !== null) {
      data.forEach((commande: IDevisCommande) => {
        // Perform operations with each item in the JSON data
        checkPageExist(databaseIdDevisCommandes, "Devis", commande.Devis)
          .then((exists) => {
            if (exists !== undefined) {
              if (!exists.test) {
                addItem(commande, url);
              } else {
                patchItem(commande, exists.pages, url);
              }
            }
          })
          .catch((error) => {
            console.error(
              chalk.bgRed(
                `Page Exist Error (${urlTitle} - ${commande.Numéro}) :`,
                error
              )
            );
          });
      });
    }
  });
};
