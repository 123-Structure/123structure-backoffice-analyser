import { Request, Response } from "express";
import { Client } from "@notionhq/client";
import { convertToISODate } from "../utils/convertToISODate";
import { getDatabaseId } from "../utils/getDatabaseId";
import { formattedDays } from "../utils/formattedDays";
import { dateOption } from "../data/constants/dateOption";

// Constants
const apiKey = process.env.NOTION_SECRET_KEY as string;

// GET all pages in a specific database
export const getAllPages = async (req: Request, res: Response) => {
  const notion = new Client({ auth: apiKey });

  const databaseId = getDatabaseId(req.originalUrl);

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
    res.status(200).json({
      type: req.originalUrl.split("/")[2],
      length: pages.results.length,
      period: {
        start: "29/05/2023",
        end: new Date().toLocaleDateString("fr-FR", dateOption),
      },
    });
  } catch (error) {
    // Return the error
    res.status(404).json({ path: req.originalUrl, notionAPIError: error });
  }
};

// GET all pages in a specific database by month
export const getAllPagesPastMonth = async (req: Request, res: Response) => {
  const databaseId = getDatabaseId(req.originalUrl);
  const monthsAgo = parseInt(req.params.monthAgo);

  const notion = new Client({ auth: apiKey });

  try {
    // Send the request to Notion API
    const pages = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          {
            property: "Créé le",
            date: {
              on_or_after: convertToISODate(
                formattedDays(monthsAgo).firstDay,
                "/",
                "-"
              ),
            },
          },
          {
            property: "Créé le",
            date: {
              on_or_before: convertToISODate(
                formattedDays(monthsAgo).lastDay,
                "/",
                "-"
              ),
            },
          },
        ],
      },
    });

    // Return the result
    res.status(200).json({
      type: req.originalUrl.split("/")[2],
      length: pages.results.length,
      period: {
        start: formattedDays(monthsAgo).firstDay,
        end: formattedDays(monthsAgo).lastDay,
      },
    });
  } catch (error) {
    // Return the error
    res.status(404).json({ path: req.originalUrl, notionAPIError: error });
  }
};
