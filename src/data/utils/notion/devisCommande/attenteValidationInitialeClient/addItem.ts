import { Client } from "@notionhq/client";
import { databaseIdDevisCommandes } from "../../../../constants/notionDatabaseID";
import { convertToISODate } from "../../utils/convertToISODate";
import chalk from "chalk";
import { retryDelay } from "../../../retryDelay";
import { maxRetries } from "../../../../constants/maxRetries";
import { IDevisCommande } from "../../../../interfaces/IDevisCommande";
import { extractID } from "../../utils/extractID";

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_SECRET_KEY,
});

export const addItem = async (commande: IDevisCommande, retries = 0) => {
  try {
    await notion.pages.create({
      parent: { database_id: databaseIdDevisCommandes },
      properties: {
        Devis: {
          title: [
            {
              text: {
                content: commande.Devis,
              },
            },
          ],
        },
        Commande: {
          rich_text: [
            {
              type: "text",
              text: {
                content: commande.Numéro,
              },
            },
          ],
        },
        Nom: {
          rich_text: [
            {
              type: "text",
              text: {
                content: commande["Adresse de chantier"].split("\n")[0],
              },
            },
          ],
        },
        "Téléphone 1": {
          phone_number:
            commande.Téléphone[0] === undefined || commande.Téléphone[0] === ""
              ? "-"
              : commande.Téléphone[0],
        },
        "Téléphone 2": {
          phone_number:
            commande.Téléphone[1] === undefined || commande.Téléphone[1] === ""
              ? "-"
              : commande.Téléphone[1],
        },
        "Téléphone 3": {
          phone_number:
            commande.Téléphone[2] === undefined || commande.Téléphone[2] === ""
              ? "-"
              : commande.Téléphone[2],
        },
        "Email 1": {
          email:
            commande.Email[0] === undefined || commande.Email[0] === ""
              ? "-"
              : commande.Email[0],
        },
        "Email 2": {
          email:
            commande.Email[1] === undefined || commande.Email[1] === ""
              ? "-"
              : commande.Email[1],
        },
        "Email 3": {
          email:
            commande.Email[2] === undefined || commande.Email[2] === ""
              ? "-"
              : commande.Email[2],
        },
        "Code postal": {
          rich_text: [
            {
              type: "text",
              text: {
                content:
                  commande["Adresse de chantier"].split("\n").length === 3
                    ? commande["Adresse de chantier"].split("\n")[2].slice(0, 5)
                    : commande["Adresse de chantier"]
                        .split("\n")[1]
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
                content:
                  commande["Adresse de chantier"].split("\n").length === 3
                    ? commande["Adresse de chantier"]
                        .split("\n")[2]
                        .substring(7)
                    : commande["Adresse de chantier"]
                        .split("\n")[1]
                        .substring(6),
              },
            },
          ],
        },
        "Créé le": {
          date: {
            start: convertToISODate(commande["Date de création"], "-", "-"),
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
              commande.Type === "Pro"
                ? `👷‍♂️ ${commande.Type}`
                : `👤 ${commande.Type}`,
          },
        },
        Status: {
          select: {
            name: "✅ 01 - Attente de validation initial du client",
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
                    commande["Adresse de chantier"].split("\n")[0]
                  } - Construction neuve (${
                    commande["Adresse de chantier"].split("\n").length === 3
                      ? commande["Adresse de chantier"]
                          .split("\n")[2]
                          .slice(0, 5)
                      : commande["Adresse de chantier"]
                          .split("\n")[1]
                          .slice(0, 5)
                  } ${
                    commande["Adresse de chantier"].split("\n").length === 3
                      ? commande["Adresse de chantier"]
                          .split("\n")[2]
                          .substring(7)
                      : commande["Adresse de chantier"]
                          .split("\n")[1]
                          .substring(7)
                  })`,
                  link: {
                    url: `https://app.123structure.fr/backoffice/order/${extractID(
                      commande["Numéro"]
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
                    commande["Adresse de chantier"].split("\n")[0]
                  } - Construction neuve (${
                    commande["Adresse de chantier"].split("\n").length === 3
                      ? commande["Adresse de chantier"]
                          .split("\n")[2]
                          .slice(0, 5)
                      : commande["Adresse de chantier"]
                          .split("\n")[1]
                          .slice(0, 5)
                  } ${
                    commande["Adresse de chantier"].split("\n").length === 3
                      ? commande["Adresse de chantier"]
                          .split("\n")[2]
                          .substring(7)
                      : commande["Adresse de chantier"]
                          .split("\n")[1]
                          .substring(7)
                  })`,
                  link: {
                    url: commande["Lien unique"],
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
            children: [],
          },
        },
      ],
    });
    console.log(
      `✅🎉 New Item (Attente de validation initial du client) : ${commande.Numéro}`
    );
  } catch (error: any) {
    console.error(chalk.bgRed("Add Item Error :", error.message));

    if (retries < maxRetries) {
      console.log(
        `Retrying after ${retryDelay(0, 0, 5) / 1000} seconds... (${
          retries + 1
        }/${maxRetries})`
      );
      await new Promise((resolve) => setTimeout(resolve, retryDelay(0, 0, 5)));
      await addItem(commande, retries + 1);
    } else {
      console.error(chalk.bgRed("Max retries reached. Exiting..."));
      // Forcefully exit the script with a non-zero exit code
      process.exit(1);
    }
  }
};
