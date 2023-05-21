import { Client } from "@notionhq/client";
import { IDevisSpecifique } from "../../../interfaces/IDevisSpeciques";
import { databaseIdDevisSpecifiques } from "../../../constants/notionDatabaseID";
import { convertToISODate } from "../utils/convertToISODate";
import chalk from "chalk";

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
    });
    console.log(`❓ New Item (Demande de devis spécifique) : ${props.ID}`);
  } catch (error: any) {
    console.error("Add Item Error :", error.body);
  }
};
