import { Client } from "@notionhq/client";
import { IDemande } from "../../../interfaces/IDemande";
import { databaseIdDemandesAbandonnees } from "../../../constants/notionDatabaseID";
import { convertToISODate } from "../utils/convertToISODate";
import chalk from "chalk";
import { addDaysToDate } from "../../addDaysToDate";
import { emailObject } from "./email/emailObject";
import { retryDelay } from "../../retryDelay";
import { maxRetries } from "../../../constants/maxRetries";
import { firstContact } from "./email/firstContact";
import { validationPJ } from "./email/validationPJ";
import { firstReminder } from "./email/firstReminder";
import { lastReminder } from "./email/lastReminder";
import { yourQuote } from "./email/yourQuote";

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_SECRET_KEY,
});

export const status = (demandeAbandonne: IDemande) => {
  // const start = convertToISODate(demandeAbandonne["Créé le"], "-", "-");
  const firstContact = convertToISODate(
    addDaysToDate(demandeAbandonne["Créé le"], 1),
    "/",
    "-"
  );
  const firstReminder = convertToISODate(
    addDaysToDate(demandeAbandonne["Créé le"], 8),
    "/",
    "-"
  );
  const lastReminder = convertToISODate(
    addDaysToDate(demandeAbandonne["Créé le"], 15),
    "/",
    "-"
  );
  const inactif = convertToISODate(
    addDaysToDate(demandeAbandonne["Créé le"], 22),
    "/",
    "-"
  );
  const currentDate = new Date();

  if (
    currentDate >= new Date(firstContact) &&
    currentDate < new Date(firstReminder)
  ) {
    return "⌛ 1er contact (J+1)";
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

export const addItem = async (demandeAbandonne: IDemande, retries = 0) => {
  try {
    await notion.pages.create({
      parent: { database_id: databaseIdDemandesAbandonnees },
      properties: {
        ID: {
          title: [
            {
              text: {
                content: demandeAbandonne.ID,
              },
            },
          ],
        },
        Nom: {
          rich_text: [
            {
              type: "text",
              text: {
                content: demandeAbandonne.Nom,
              },
            },
          ],
        },
        Téléphone: {
          phone_number:
            demandeAbandonne.Téléphone === ""
              ? "-"
              : demandeAbandonne.Téléphone,
        },
        Email: {
          email: demandeAbandonne.Email === "" ? "-" : demandeAbandonne.Email,
        },
        "Code postal": {
          rich_text: [
            {
              type: "text",
              text: {
                content: demandeAbandonne["Code postal"],
              },
            },
          ],
        },
        Ville: {
          rich_text: [
            {
              type: "text",
              text: {
                content: demandeAbandonne.Ville,
              },
            },
          ],
        },
        "Créé le": {
          date: {
            start: convertToISODate(demandeAbandonne["Créé le"], "-", "-"),
          },
        },
        "Montant HT": {
          rich_text: [
            {
              type: "text",
              text: {
                content: demandeAbandonne["Montant HT"],
              },
            },
          ],
        },
        "Type de projet": {
          select: {
            name: `🏡 ${demandeAbandonne["Type de projet"]}`,
          },
        },
        Type: {
          select: {
            name:
              demandeAbandonne.Type === "Pro"
                ? `👷‍♂️ ${demandeAbandonne.Type}`
                : `👤 ${demandeAbandonne.Type}`,
          },
        },
        Status: {
          select: {
            name: status(demandeAbandonne),
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
                  content: `❓ ${demandeAbandonne.ID} - ${demandeAbandonne.Nom} - ${demandeAbandonne["Type de projet"]} (${demandeAbandonne["Code postal"]} ${demandeAbandonne.Ville})`,
                  link: {
                    url:
                      demandeAbandonne.Type === "Particulier"
                        ? `https://app.123structure.fr/backoffice/userqcm/show/${demandeAbandonne.ID}/part`
                        : demandeAbandonne.Type === "Pro"
                        ? `https://app.123structure.fr/backoffice/userqcm/show/${demandeAbandonne.ID}/pro`
                        : "",
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
                  content: "Informations complémentaires",
                },
              },
            ],
            color: "gray_background",
          },
        },
        {
          object: "block",
          paragraph: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: demandeAbandonne["Informations complémentaires"],
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
                        content: `Objet : ${emailObject(demandeAbandonne)}`,
                      },
                      annotations: {
                        italic: true,
                      },
                    },
                  ],
                  color: "yellow_background",
                },
              },
              {
                object: "block",
                toggle: {
                  rich_text: [
                    {
                      type: "text",
                      text: {
                        content: "1ère prise de contact (J+1)",
                      },
                    },
                  ],
                  children: firstContact(demandeAbandonne),
                },
              },
              {
                object: "block",
                toggle: {
                  rich_text: [
                    {
                      type: "text",
                      text: {
                        content: "1ère relance (J+7)",
                      },
                    },
                  ],
                  children: firstReminder(demandeAbandonne),
                },
              },
              {
                object: "block",
                toggle: {
                  rich_text: [
                    {
                      type: "text",
                      text: {
                        content: "Dernière relance (J+14)",
                      },
                    },
                  ],
                  children: lastReminder(demandeAbandonne),
                },
              },
              {
                object: "block",
                toggle: {
                  rich_text: [
                    {
                      type: "text",
                      text: {
                        content: "Validation pièces jointes avant envoi devis",
                      },
                    },
                  ],
                  children: validationPJ(),
                },
              },
              {
                object: "block",
                toggle: {
                  rich_text: [
                    {
                      type: "text",
                      text: {
                        content: "Envoi lien unique et mode opératoire",
                      },
                    },
                  ],
                  children: yourQuote(demandeAbandonne),
                },
              },
            ],
          },
        },
      ],
    });
    console.log(
      `🗑️🎉 New Item (Demande de devis abandonnée) : ${demandeAbandonne.ID}`
    );
  } catch (error: any) {
    console.error(
      chalk.bgRed(
        `Add Item Error (Demande de devis abandonnée - ${demandeAbandonne.ID}) :`,
        error.message
      )
    );

    if (retries < maxRetries) {
      console.log(
        `Retrying after ${retryDelay(0, 0, 5) / 1000} seconds... (${
          retries + 1
        }/${maxRetries})`
      );
      await new Promise((resolve) => setTimeout(resolve, retryDelay(0, 0, 5)));
      await addItem(demandeAbandonne, retries + 1);
    } else {
      console.error(chalk.bgRed("Max retries reached. Exiting..."));
      // Forcefully exit the script with a non-zero exit code
      process.exit(1);
    }
  }
};
