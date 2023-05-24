import { Client } from "@notionhq/client";
import { IDevisSpecifique } from "../../../interfaces/IDevisSpeciques";
import { databaseIdDevisSpecifiques } from "../../../constants/notionDatabaseID";
import { convertToISODate } from "../utils/convertToISODate";
import { emailObject } from "../email/emailObject";
import { firstContact } from "../email/firstContact";
import { firstReminder } from "../email/firstReminder";
import { lastReminder } from "../email/lastReminder";
import chalk from "chalk";
import { addDaysToDate } from "../../addDaysToDate";

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_SECRET_KEY,
});

export const status = (demandeDevis: IDevisSpecifique) => {
  // const start = convertToISODate(demandeDevis["Créé le"], "-", "-");
  const firstContact = convertToISODate(
    addDaysToDate(demandeDevis["Créé le"], 1),
    "/",
    "-"
  );
  const firstReminder = convertToISODate(
    addDaysToDate(demandeDevis["Créé le"], 8),
    "/",
    "-"
  );
  const lastReminder = convertToISODate(
    addDaysToDate(demandeDevis["Créé le"], 15),
    "/",
    "-"
  );
  const inactif = convertToISODate(
    addDaysToDate(demandeDevis["Créé le"], 22),
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

export const addItem = async (demandeDevis: IDevisSpecifique) => {
  try {
    await notion.pages.create({
      parent: { database_id: databaseIdDevisSpecifiques },
      properties: {
        ID: {
          title: [
            {
              text: {
                content: demandeDevis.ID,
              },
            },
          ],
        },
        Nom: {
          rich_text: [
            {
              type: "text",
              text: {
                content: demandeDevis.Nom,
              },
            },
          ],
        },
        Téléphone: {
          phone_number:
            demandeDevis.Téléphone === "" ? "-" : demandeDevis.Téléphone,
        },
        Email: {
          email: demandeDevis.Email === "" ? "-" : demandeDevis.Email,
        },
        "Code postal": {
          rich_text: [
            {
              type: "text",
              text: {
                content: demandeDevis["Code postal"],
              },
            },
          ],
        },
        Ville: {
          rich_text: [
            {
              type: "text",
              text: {
                content: demandeDevis.Ville,
              },
            },
          ],
        },
        "Créé le": {
          date: {
            start: convertToISODate(demandeDevis["Créé le"], "-", "-"),
          },
        },
        "Type de projet": {
          select: {
            name: `🏡 ${demandeDevis["Type de projet"]}`,
          },
        },
        Type: {
          select: {
            name:
              demandeDevis.Type === "Pro"
                ? `👷‍♂️ ${demandeDevis.Type}`
                : `👤 ${demandeDevis.Type}`,
          },
        },
        Status: {
          select: {
            name: status(demandeDevis),
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
                  content: `❓ ${demandeDevis.ID} - ${demandeDevis.Nom} - ${demandeDevis["Type de projet"]} (${demandeDevis["Code postal"]} ${demandeDevis.Ville})`,
                  link: {
                    url:
                      demandeDevis.Type === "Particulier"
                        ? `https://app.123structure.fr/backoffice/userqcm/show/${demandeDevis.ID}/part`
                        : demandeDevis.Type === "Pro"
                        ? `https://app.123structure.fr/backoffice/userqcm/show/${demandeDevis.ID}/pro`
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
                  content: demandeDevis["Informations complémentaires"],
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
                        content: `Objet : ${emailObject(demandeDevis)}`,
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
                  children: firstContact(demandeDevis),
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
                  children: firstReminder(demandeDevis),
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
                  children: lastReminder(demandeDevis),
                },
              },
            ],
          },
        },
      ],
    });
    console.log(
      `❓🎉 New Item (Demande de devis spécifique) : ${demandeDevis.ID}`
    );
  } catch (error: any) {
    console.error(chalk.bgRed("Add Item Error :", error.message));
  }
};
