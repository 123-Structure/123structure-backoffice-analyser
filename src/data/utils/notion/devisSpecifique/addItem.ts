import { Client } from "@notionhq/client";
import { IDevisSpecifique } from "../../../interfaces/IDevisSpeciques";
import { databaseIdDevisSpecifiques } from "../../../constants/notionDatabaseID";
import { convertToISODate } from "../utils/convertToISODate";

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_SECRET_KEY,
});

export const addItem = async (props: IDevisSpecifique) => {
  try {
    await notion.pages.create({
      parent: { database_id: databaseIdDevisSpecifiques },
      properties: {
        ID: {
          title: [
            {
              text: {
                content: props.ID,
              },
            },
          ],
        },
        Nom: {
          rich_text: [
            {
              type: "text",
              text: {
                content: props.Nom,
              },
            },
          ],
        },
        Téléphone: {
          phone_number: props.Téléphone === "" ? "-" : props.Téléphone,
        },
        Email: {
          email: props.Email === "" ? "-" : props.Email,
        },
        "Code postal": {
          rich_text: [
            {
              type: "text",
              text: {
                content: props["Code postal"],
              },
            },
          ],
        },
        Ville: {
          rich_text: [
            {
              type: "text",
              text: {
                content: props.Ville,
              },
            },
          ],
        },
        "Créé le": {
          date: {
            start: convertToISODate(props["Créé le"]),
          },
        },
        "Type de projet": {
          select: {
            name: `🏡 ${props["Type de projet"]}`,
          },
        },
        Type: {
          select: {
            name:
              props.Type === "Pro" ? `👷‍♂️ ${props.Type}` : `👤 ${props.Type}`,
          },
        },
        Status: {
          select: {
            name: "🎉 Nouveau",
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
                  content: `❓ ${props.ID} - ${props.Nom} - ${props["Type de projet"]} (${props["Code postal"]} ${props.Ville})`,
                  link: {
                    url:
                      props.Type === "Particulier"
                        ? `https://app.123structure.fr/backoffice/userqcm/show/${props.ID}/part`
                        : props.Type === "Pro"
                        ? `https://app.123structure.fr/backoffice/userqcm/show/${props.ID}/pro`
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
                  content: props["Informations complémentaires"],
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
                        content: "Objet : XXX",
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
                  children: [
                    {
                      object: "block",
                      paragraph: {
                        rich_text: [
                          {
                            type: "text",
                            text: {
                              content: "Lorem Ipsum",
                            },
                          },
                        ],
                      },
                    },
                  ],
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
                  children: [
                    {
                      object: "block",
                      paragraph: {
                        rich_text: [
                          {
                            type: "text",
                            text: {
                              content: "Lorem Ipsum",
                            },
                          },
                        ],
                      },
                    },
                  ],
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
                  children: [
                    {
                      object: "block",
                      paragraph: {
                        rich_text: [
                          {
                            type: "text",
                            text: {
                              content: "Lorem Ipsum",
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    });
    console.log(`❓ New Item (Demande de devis spécifique) : ${props.ID}`);
  } catch (error: any) {
    console.error("Add Item Error :", error.message);
  }
};
