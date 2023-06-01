import chalk from "chalk";
import { Client } from "@notionhq/client";
import { IDevisCommande } from "../../../../interfaces/IDevisCommande";
import { convertToISODate } from "../../utils/convertToISODate";
import { getCurrentTimestamp } from "../../../getCurrentTimestamp";
import { IUrl } from "../../../../interfaces/IUrl";
import { getStatusFromUrl } from "../getStatusFromUrl";

// Initializing a client
const notion = new Client({ auth: process.env.NOTION_SECRET_KEY });

export const patchItem = (
  commande: IDevisCommande,
  pages: any[],
  url: IUrl
) => {
  const emoji = url.id.charAt(0);
  const urlTitle = getStatusFromUrl(url.id);

  pages.forEach(async (page) => {
    try {
      const status = page.properties.Status.select.name;
      if (
        status !== urlTitle &&
        !status.includes("Inactif") &&
        !status.includes("Archivé")
      ) {
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

            Status: {
              select: {
                name: urlTitle,
              },
            },
            "Date 01 - Attente validation initial client": {
              date: url.id.includes(
                "commandes_01-attente-validation-initiale-client"
              )
                ? {
                    start: convertToISODate(
                      getCurrentTimestamp(true),
                      "/",
                      "-"
                    ),
                  }
                : null,
            },
            "Date 02 - Attente paiement initial": {
              date: url.id.includes("commandes_02-attente-paiement-initial")
                ? {
                    start: convertToISODate(
                      getCurrentTimestamp(true),
                      "/",
                      "-"
                    ),
                  }
                : null,
            },
            "Date 03 - Attente validation 123 Structure": {
              date: url.id.includes(
                "commandes_03-attente-validation-123-structure"
              )
                ? {
                    start: convertToISODate(
                      getCurrentTimestamp(true),
                      "/",
                      "-"
                    ),
                  }
                : null,
            },
            "Date 04 - Attente validation client": {
              date: url.id.includes("commandes_04-attente-validation-client")
                ? {
                    start: convertToISODate(
                      getCurrentTimestamp(true),
                      "/",
                      "-"
                    ),
                  }
                : null,
            },
            "Date 05 - En cours": {
              date: url.id.includes("commandes_05-en-cours")
                ? {
                    start: convertToISODate(
                      getCurrentTimestamp(true),
                      "/",
                      "-"
                    ),
                  }
                : null,
            },
            "Date 06 - Attente solde": {
              date: url.id.includes("commandes_06-attente-solde")
                ? {
                    start: convertToISODate(
                      getCurrentTimestamp(true),
                      "/",
                      "-"
                    ),
                  }
                : null,
            },
            "Date 07 - Attente solde": {
              date: url.id.includes("commandes_07-terminees")
                ? {
                    start: convertToISODate(
                      getCurrentTimestamp(true),
                      "/",
                      "-"
                    ),
                  }
                : null,
            },
          },
        });
        console.log(
          `${emoji}📝 Update Item (${urlTitle.substring(2)}) : ${
            commande.Numéro
          }`
        );
      }
    } catch (error: any) {
      console.error(
        chalk.bgRed(
          `Patch Item Error (${urlTitle.substring(2)} - ${commande.Numéro}
          ) :`,
          error.message
        )
      );
    }
  });
};
