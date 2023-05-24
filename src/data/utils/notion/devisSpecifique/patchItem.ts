import chalk from "chalk";
import { IDevisSpecifique } from "../../../interfaces/IDevisSpeciques";
import { convertToISODate } from "../utils/convertToISODate";
import { addDaysToDate } from "../../addDaysToDate";

const { Client } = require("@notionhq/client");

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
    console.log(`❓📝 Update Item (Demande de devis spécifique) : ${ID}`);
  } catch (error: any) {
    console.error(chalk.bgRed("Add Item Error :", error.message));
  }
};

export const patchItem = (demandeDevis: IDevisSpecifique, page: any) => {
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

  // if (
  //   currentDate > new Date(start) &&
  //   currentDate < new Date(firstContact)
  // ) {
  //   patchItem(exists.ID, demandeDevis.ID, "🎉 Nouveau");
  // }

  const status = page.properties.Status.select.name;

  if (status !== "✅ Terminé" && status !== "🗃️ Archivé") {
    if (
      currentDate >= new Date(firstContact) &&
      currentDate < new Date(firstReminder) &&
      status !== "⌛ 1er Contact (J+1)"
    ) {
      updateItem(page.id, demandeDevis.ID, "⌛ 1er Contact (J+1)");
    }

    if (
      currentDate >= new Date(firstReminder) &&
      currentDate < new Date(lastReminder) &&
      status !== "⌛ 1ère relance (J+7)"
    ) {
      updateItem(page.id, demandeDevis.ID, "⌛ 1ère relance (J+7)");
    }

    if (
      currentDate >= new Date(lastReminder) &&
      currentDate < new Date(inactif) &&
      status !== "⌛ Dernière relance (J+14)"
    ) {
      updateItem(page.id, demandeDevis.ID, "⌛ Dernière relance (J+14)");
    }

    if (currentDate >= new Date(inactif) && status !== "⏸️ Inactif") {
      updateItem(page.id, demandeDevis.ID, "⏸️ Inactif");
    }
  }
};
