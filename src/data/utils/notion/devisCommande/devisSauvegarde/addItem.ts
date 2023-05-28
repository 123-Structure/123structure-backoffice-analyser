import { Client } from "@notionhq/client";
import { databaseIdDevisCommandes } from "../../../../constants/notionDatabaseID";
import { convertToISODate } from "../../utils/convertToISODate";
import chalk from "chalk";
import { retryDelay } from "../../../retryDelay";
import { maxRetries } from "../../../../constants/maxRetries";
import { IDevisCommande } from "../../../../interfaces/IDevisCommande";
import { emailObject } from "./email/emailObject";
import { extractID } from "../../utils/extractID";
import { getCurrentTimestamp } from "../../../getCurrentTimestamp";

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_SECRET_KEY,
});

export const addItem = async (devisSauvegarde: IDevisCommande, retries = 0) => {
  try {
    await notion.pages.create({
      parent: { database_id: databaseIdDevisCommandes },
      properties: {
        Devis: {
          title: [
            {
              text: {
                content: devisSauvegarde.Numéro,
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
                content: devisSauvegarde["Adresse de chantier"].split("\n")[0],
              },
            },
          ],
        },
        "Téléphone 1": {
          phone_number:
            devisSauvegarde.Téléphone[0] === undefined ||
            devisSauvegarde.Téléphone[0] === ""
              ? "-"
              : devisSauvegarde.Téléphone[0],
        },
        "Téléphone 2": {
          phone_number:
            devisSauvegarde.Téléphone[1] === undefined ||
            devisSauvegarde.Téléphone[1] === ""
              ? "-"
              : devisSauvegarde.Téléphone[1],
        },
        "Téléphone 3": {
          phone_number:
            devisSauvegarde.Téléphone[2] === undefined ||
            devisSauvegarde.Téléphone[2] === ""
              ? "-"
              : devisSauvegarde.Téléphone[2],
        },
        "Email 1": {
          email:
            devisSauvegarde.Email[0] === undefined ||
            devisSauvegarde.Email[0] === ""
              ? "-"
              : devisSauvegarde.Email[0],
        },
        "Email 2": {
          email:
            devisSauvegarde.Email[1] === undefined ||
            devisSauvegarde.Email[1] === ""
              ? "-"
              : devisSauvegarde.Email[1],
        },
        "Email 3": {
          email:
            devisSauvegarde.Email[2] === undefined ||
            devisSauvegarde.Email[2] === ""
              ? "-"
              : devisSauvegarde.Email[2],
        },
        "Code postal": {
          rich_text: [
            {
              type: "text",
              text: {
                content: devisSauvegarde["Adresse de chantier"]
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
                content: devisSauvegarde["Adresse de chantier"]
                  .split("\n")[2]
                  .substring(6),
              },
            },
          ],
        },
        "Créé le": {
          date: {
            start: convertToISODate(
              devisSauvegarde["Date de création"],
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
              devisSauvegarde.Type === "Pro"
                ? `👷‍♂️ ${devisSauvegarde.Type}`
                : `👤 ${devisSauvegarde.Type}`,
          },
        },
        Status: {
          select: {
            name: "💾 00 - Devis sauvegardé",
          },
        },
        "Date Devis sauvegardé": {
          date: {
            start: convertToISODate(getCurrentTimestamp(true), "/", "-"),
          },
        },
      },
      children: [
        {
          object: "block",
          paragraph: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: `📝 Administration : ${
                    devisSauvegarde["Adresse de chantier"].split("\n")[0]
                  } - Construction neuve (${devisSauvegarde[
                    "Adresse de chantier"
                  ]
                    .split("\n")[2]
                    .slice(0, 5)} ${devisSauvegarde["Adresse de chantier"]
                    .split("\n")[2]
                    .substring(7)})`,
                  link: {
                    url: `https://app.123structure.fr/backoffice/quote/${extractID(
                      devisSauvegarde["Numéro"]
                    )}/edit`,
                  },
                },
                annotations: {
                  bold: true,
                  italic: true,
                },
              },
            ],
          },
        },
        {
          object: "block",
          paragraph: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: `🔗 Lien unique : ${
                    devisSauvegarde["Adresse de chantier"].split("\n")[0]
                  } - Construction neuve (${devisSauvegarde[
                    "Adresse de chantier"
                  ]
                    .split("\n")[2]
                    .slice(0, 5)} ${devisSauvegarde["Adresse de chantier"]
                    .split("\n")[2]
                    .substring(7)})`,
                  link: {
                    url: devisSauvegarde["Lien unique"],
                  },
                },
                annotations: {
                  bold: true,
                  italic: true,
                },
              },
            ],
          },
        },
        {
          object: "block",
          heading_2: {
            rich_text: [
              {
                text: {
                  content: "Commentaires",
                },
              },
            ],
            color: "red_background",
          },
        },
        {
          object: "block",
          paragraph: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: "",
                },
              },
            ],
          },
        },
        {
          object: "block",
          divider: {},
        },
        {
          object: "block",
          toggle: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: "📧 Exemples de mails",
                },
                annotations: {
                  bold: true,
                },
              },
            ],
            children: [
              {
                object: "block",
                paragraph: {
                  rich_text: [
                    {
                      type: "text",
                      text: {
                        content: `Objet : ${emailObject(devisSauvegarde)}`,
                      },
                      annotations: {
                        italic: true,
                      },
                    },
                  ],
                  color: "yellow_background",
                },
              },
            ],
          },
        },
      ],
    });
    console.log(`💾🎉 New Item (00 - Devis sauvegardé) : ${devisSauvegarde.Numéro}`);
  } catch (error: any) {
    console.error(
      chalk.bgRed(`Add Item Error (00 - Devis sauvegardé - ${devisSauvegarde.Numéro}) :`, error.message)
    );

    if (retries < maxRetries) {
      console.log(
        `Retrying after ${retryDelay(0, 0, 5) / 1000} seconds... (${
          retries + 1
        }/${maxRetries})`
      );
      await new Promise((resolve) => setTimeout(resolve, retryDelay(0, 0, 5)));
      await addItem(devisSauvegarde, retries + 1);
    } else {
      console.error(chalk.bgRed("Max retries reached. Exiting..."));
      // Forcefully exit the script with a non-zero exit code
      process.exit(1);
    }
  }
};
