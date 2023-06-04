import { Client } from "@notionhq/client";
import { IDemande } from "../../../interfaces/IDemande";
import { databaseIdDemandesSpecifiques } from "../../../constants/notionDatabaseID";
import { convertToISODate } from "../utils/convertToISODate";
import { emailObject } from "./email/emailObject";
import { firstContact } from "./email/firstContact";
import { firstReminder } from "./email/firstReminder";
import { lastReminder } from "./email/lastReminder";
import chalk from "chalk";
import { addDaysToDate } from "../../addDaysToDate";
import { retryDelay } from "../../retryDelay";
import { maxRetries } from "../../../constants/maxRetries";
import { validationPJ } from "./email/validationPJ";
import { yourQuote } from "./email/yourQuote";

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_SECRET_KEY,
});

export const status = (demandeSpecifique: IDemande) => {
  // const start = convertToISODate(demandeSpecifique["Créé le"], "-", "-");
  const firstContact = convertToISODate(
    addDaysToDate(demandeSpecifique["Créé le"], 1),
    "/",
    "-"
  );
  const firstReminder = convertToISODate(
    addDaysToDate(demandeSpecifique["Créé le"], 8),
    "/",
    "-"
  );
  const lastReminder = convertToISODate(
    addDaysToDate(demandeSpecifique["Créé le"], 15),
    "/",
    "-"
  );
  const inactif = convertToISODate(
    addDaysToDate(demandeSpecifique["Créé le"], 22),
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

export const addItem = async (demandeSpecifique: IDemande, retries = 0) => {
  try {
    await notion.pages.create({
      parent: { database_id: databaseIdDemandesSpecifiques },
      properties: {
        ID: {
          title: [
            {
              text: {
                content: demandeSpecifique.ID,
              },
            },
          ],
        },
        Nom: {
          rich_text: [
            {
              type: "text",
              text: {
                content: demandeSpecifique.Nom,
              },
            },
          ],
        },
        Téléphone: {
          phone_number:
            demandeSpecifique.Téléphone === ""
              ? "-"
              : demandeSpecifique.Téléphone,
        },
        Email: {
          email: demandeSpecifique.Email === "" ? "-" : demandeSpecifique.Email,
        },
        "Code postal": {
          rich_text: [
            {
              type: "text",
              text: {
                content: demandeSpecifique["Code postal"],
              },
            },
          ],
        },
        Ville: {
          rich_text: [
            {
              type: "text",
              text: {
                content: demandeSpecifique.Ville,
              },
            },
          ],
        },
        "Créé le": {
          date: {
            start: convertToISODate(demandeSpecifique["Créé le"], "-", "-"),
          },
        },
        "Type de projet": {
          select: {
            name: `🏡 ${demandeSpecifique["Type de projet"]}`,
          },
        },
        Type: {
          select: {
            name:
              demandeSpecifique.Type === "Pro"
                ? `👷‍♂️ ${demandeSpecifique.Type}`
                : `👤 ${demandeSpecifique.Type}`,
          },
        },
        Status: {
          select: {
            name: status(demandeSpecifique),
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
                  content: `❓ ${demandeSpecifique.ID} - ${demandeSpecifique.Nom} - ${demandeSpecifique["Type de projet"]} (${demandeSpecifique["Code postal"]} ${demandeSpecifique.Ville})`,
                  link: {
                    url:
                      demandeSpecifique.Type === "Particulier"
                        ? `https://app.123structure.fr/backoffice/userqcm/show/${demandeSpecifique.ID}/part`
                        : demandeSpecifique.Type === "Pro"
                        ? `https://app.123structure.fr/backoffice/userqcm/show/${demandeSpecifique.ID}/pro`
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
                  content: demandeSpecifique["Informations complémentaires"],
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
                        content: `Objet : ${emailObject(demandeSpecifique)}`,
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
                  children: firstContact(demandeSpecifique),
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
                  children: firstReminder(demandeSpecifique),
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
                  children: lastReminder(demandeSpecifique),
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
                  children: yourQuote(demandeSpecifique),
                },
              },
            ],
          },
        },
      ],
    });
    console.log(
      `❓🎉 New Item (Demande de devis spécifique) : ${demandeSpecifique.ID}`
    );
  } catch (error: any) {
    console.error(
      chalk.bgRed(
        `Add Item Error (Demande de devis spécifique - ${demandeSpecifique.ID}) :`,
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
      await addItem(demandeSpecifique, retries + 1);
    } else {
      console.error(chalk.bgRed("Max retries reached. Exiting..."));
      // Forcefully exit the script with a non-zero exit code
      process.exit(1);
    }
  }
};
