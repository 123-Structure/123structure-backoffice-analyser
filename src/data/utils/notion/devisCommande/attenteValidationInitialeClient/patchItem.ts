import chalk from "chalk";
import { Client } from "@notionhq/client";
import { IDevisCommande } from "../../../../interfaces/IDevisCommande";
import { convertToISODate } from "../../utils/convertToISODate";
import { getCurrentTimestamp } from "../../../getCurrentTimestamp";

// Initializing a client
const notion = new Client({ auth: process.env.NOTION_SECRET_KEY });

export const patchItem = (commande: IDevisCommande, pages: any[]) => {
  pages.forEach(async (page) => {
    try {
      const status = page.properties.Status.select.name;
      if (status !== "✅ 01 - Attente de validation initiale du client") {
        await notion.pages.update({
          page_id: page.id,
          properties: {
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
            "Date 01 - Attente de validation initial du client": {
              date: {
                start: convertToISODate(getCurrentTimestamp(true), "/", "-"),
              },
            },
            Status: {
              select: {
                name: "✅ 01 - Attente de validation initiale du client",
              },
            },
          },
        });
        console.log(
          `✅📝 Update Item (Attente de validation initiale du client) : ${commande.Numéro}`
        );
      }
    } catch (error: any) {
      console.error(chalk.bgRed("Patch Item Error :", error.message));
    }
  });
};
