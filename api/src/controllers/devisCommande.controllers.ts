import { Request, Response } from "express";
import { Client } from "@notionhq/client";
import dotenv from "dotenv";
import { convertToISODate } from "../utils/convertToISODate";

dotenv.config();

// Constants
const databaseId = process.env.NOTION_DATABASE_ID_DEVIS_COMMANDES as string;

const apiKey = process.env.NOTION_SECRET_KEY as string;

// GET all DevisCommande
export const getDevisCommande = async (req: Request, res: Response) => {
  const notion = new Client({ auth: apiKey });

  try {
    // Send the request to Notion API
    const pages = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "Créé le",
        date: {
          on_or_after: "2023-05-29",
        },
      },
    });

    // Return the result
    console.log(`💾 Devis / Commande : ${pages.results.length} page(s)`);
    res.status(200).json(pages);
  } catch (error) {
    // Return the error
    res.status(404).json({ devisCommandeError: error });
  }
};

// GET all DevisCommande of past month
export const getPastMonthDevisCommande = async (
  req: Request,
  res: Response
) => {
  const notion = new Client({ auth: apiKey });

  const dateOption: Intl.DateTimeFormatOptions = {
    timeZone: "Europe/Paris",
    dateStyle: "short",
  };

  // Get the current date
  const currentDate = new Date();

  // Set the date to the first day of the current month
  currentDate.setDate(1);

  // Subtract one day to get the last day of the previous month
  const lastDayOfLastMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    0
  );

  // Subtract one more month to get the first day of the previous month
  const firstDayOfLastMonth = new Date(
    lastDayOfLastMonth.getFullYear(),
    lastDayOfLastMonth.getMonth(),
    1
  );

  // Format the dates as strings
  const formattedFirstDay = firstDayOfLastMonth.toLocaleDateString(
    "fr-FR",
    dateOption
  );
  const formattedLastDay = lastDayOfLastMonth.toLocaleDateString(
    "fr-FR",
    dateOption
  );

  try {
    // Send the request to Notion API
    const pages = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          {
            property: "Créé le",
            date: {
              on_or_after: convertToISODate(formattedFirstDay, "/", "-"),
            },
          },
          {
            property: "Créé le",
            date: {
              on_or_before: convertToISODate(formattedLastDay, "/", "-"),
            },
          },
        ],
      },
    });

    // Return the result
    console.log(
      `💾 Devis / Commande (past_month) : ${pages.results.length} page(s)`
    );
    res.status(200).json(pages);
  } catch (error) {
    // Return the error
    res.status(404).json({ demandeAbandonneeError: error });
  }
};
