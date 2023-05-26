import { Client } from "@notionhq/client";
import { IDemande } from "../../../interfaces/IDemande";
import { databaseIdDevisCommandes } from "../../../constants/notionDatabaseID";
import { convertToISODate } from "../utils/convertToISODate";
// import { emailObject } from "./email/emailObject";
// import { firstContact } from "./email/firstContact";
// import { firstReminder } from "./email/firstReminder";
// import { lastReminder } from "./email/lastReminder";
import chalk from "chalk";
import { addDaysToDate } from "../../addDaysToDate";
import { retryDelay } from "../../retryDelay";
import { maxRetries } from "../../../constants/maxRetries";
import { IDevisCommande } from "../../../interfaces/IDevisCommande";

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_SECRET_KEY,
});

export const status = (devisCommande: IDevisCommande) => {
  // const start = convertToISODate(devisCommande["Créé le"], "-", "-");
  const firstContact = convertToISODate(
    addDaysToDate(devisCommande["Date de création"], 1),
    "/",
    "-"
  );
  const firstReminder = convertToISODate(
    addDaysToDate(devisCommande["Date de création"], 8),
    "/",
    "-"
  );
  const lastReminder = convertToISODate(
    addDaysToDate(devisCommande["Date de création"], 15),
    "/",
    "-"
  );
  const inactif = convertToISODate(
    addDaysToDate(devisCommande["Date de création"], 22),
    "/",
    "-"
  );
  const currentDate = new Date();

  if (
    currentDate >= new Date(firstContact) &&
    currentDate < new Date(firstReminder)
  ) {
    return "⌛ 1er Contact (J+1)";
  }

  if (
    currentDate >= new Date(firstReminder) &&
    currentDate < new Date(lastReminder)
  ) {
    return "⌛ 1ère relance (J+7)";
  }

  if (
    currentDate >= new Date(lastReminder) &&
    currentDate < new Date(inactif)
  ) {
    return "⌛ Dernière relance (J+14)";
  }

  if (currentDate >= new Date(inactif)) {
    return "⏸️ Inactif";
  }
  return "🎉 Nouveau";
};

export const addItem = async (devisCommande: IDevisCommande, retries = 0) => {
  try {
    await notion.pages.create({
      parent: { database_id: databaseIdDevisCommandes },
      properties: {
        Devis: {
          title: [
            {
              text: {
                content: devisCommande.Numéro,
              },
            },
          ],
        },
        Commande: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "-",
              },
            },
          ],
        },
        Nom: {
          rich_text: [
            {
              type: "text",
              text: {
                content: devisCommande["Adresse de chantier"].split("\n")[0],
              },
            },
          ],
        },
        "Téléphone 1": {
          phone_number:
            devisCommande.Téléphone[0] !== undefined &&
            devisCommande.Téléphone[0] === ""
              ? "-"
              : devisCommande.Téléphone[0],
        },
        "Téléphone 2": {
          phone_number:
            devisCommande.Téléphone[1] !== undefined &&
            devisCommande.Téléphone[1] === ""
              ? "-"
              : devisCommande.Téléphone[1],
        },
        "Téléphone 3": {
          phone_number:
            devisCommande.Téléphone[2] !== undefined &&
            devisCommande.Téléphone[2] === ""
              ? "-"
              : devisCommande.Téléphone[2],
        },
        "Email 1": {
          email:
            devisCommande.Email[0] !== undefined &&
            devisCommande.Email[0] === ""
              ? "-"
              : devisCommande.Email[0],
        },
        "Email 2": {
          email:
            devisCommande.Email[1] !== undefined &&
            devisCommande.Email[1] === ""
              ? "-"
              : devisCommande.Email[1],
        },
        "Email 3": {
          email:
            devisCommande.Email[2] !== undefined &&
            devisCommande.Email[2] === ""
              ? "-"
              : devisCommande.Email[2],
        },
        "Code Postal": {
          rich_text: [
            {
              type: "text",
              text: {
                content: devisCommande["Adresse de chantier"]
                  .split("\n")[2]
                  .slice(0, 5),
              },
            },
          ],
        },
        Ville: {
          rich_text: [
            {
              type: "text",
              text: {
                content: devisCommande["Adresse de chantier"]
                  .split("\n")[2]
                  .substring(7),
              },
            },
          ],
        },
        "Créé le": {
          date: {
            start: convertToISODate(
              devisCommande["Date de création"],
              "-",
              "-"
            ),
          },
        },
        "Type de projet": {
          select: {
            name: "🏡 Construction neuve",
          },
        },
        Type: {
          select: {
            name:
              devisCommande.Type === "Pro"
                ? `👷‍♂️ ${devisCommande.Type}`
                : `👤 ${devisCommande.Type}`,
          },
        },
        Status: {
          select: {
            name: status(devisCommande),
          },
        },
      },
    });
    console.log(`❓🎉 New Item (Devis sauvegardé) : ${devisCommande.Numéro}`);
  } catch (error: any) {
    console.error(chalk.bgRed("Add Item Error :", error.message));

    if (retries < maxRetries) {
      console.log(
        `Retrying after ${retryDelay(0, 0, 5) / 1000} seconds... (${
          retries + 1
        }/${maxRetries})`
      );
      await new Promise((resolve) => setTimeout(resolve, retryDelay(0, 0, 5)));
      await addItem(devisCommande, retries + 1);
    } else {
      console.error(chalk.bgRed("Max retries reached. Exiting..."));
      // Forcefully exit the script with a non-zero exit code
      process.exit(1);
    }
  }
};
