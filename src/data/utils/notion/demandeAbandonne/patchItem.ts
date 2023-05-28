import chalk from "chalk";
import { IDemande } from "../../../interfaces/IDemande";
import { convertToISODate } from "../utils/convertToISODate";
import { addDaysToDate } from "../../addDaysToDate";
import { Client } from "@notionhq/client";


// Initializing a client
const notion = new Client({ auth: process.env.NOTION_SECRET_KEY });

const updateItem = async (pageId: string, ID: string, value: string) => {
  try {
    await notion.pages.update({
      page_id: pageId,
      properties: {
        Status: {
          select: {
            name: value,
          },
        },
      },
    });
    console.log(`🗑️📝 Update Item (Demande de devis abandonnée) : ${ID}`);
  } catch (error: any) {
    console.error(
      chalk.bgRed(
        `Patch Item Error (Demande de devis abandonnée - ${ID}) :`,
        error.message
      )
    );
  }
};

export const patchItem = (demandeAbandonne: IDemande, pages: any[]) => {
  pages.forEach((page) => {
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

    // if (
    //   currentDate > new Date(start) &&
    //   currentDate < new Date(firstContact)
    // ) {
    //   patchItem(exists.ID, demandeAbandonne.ID, "🎉 Nouveau");
    // }

    const status = page.properties.Status.select.name;

    if (status !== "✅ Terminé" && status !== "🗃️ Archivé") {
      if (
        currentDate >= new Date(firstContact) &&
        currentDate < new Date(firstReminder) &&
        status !== "⌛ 1er contact (J+1)"
      ) {
        updateItem(page.id, demandeAbandonne.ID, "⌛ 1er contact (J+1)");
      }

      if (
        currentDate >= new Date(firstReminder) &&
        currentDate < new Date(lastReminder) &&
        status !== "⌛ 1ère relance (J+7)"
      ) {
        updateItem(page.id, demandeAbandonne.ID, "⌛ 1ère relance (J+7)");
      }

      if (
        currentDate >= new Date(lastReminder) &&
        currentDate < new Date(inactif) &&
        status !== "⌛ Dernière relance (J+14)"
      ) {
        updateItem(page.id, demandeAbandonne.ID, "⌛ Dernière relance (J+14)");
      }

      if (currentDate >= new Date(inactif) && status !== "⏸️ Inactif") {
        updateItem(page.id, demandeAbandonne.ID, "⏸️ Inactif");
      }
    }
  });
};
