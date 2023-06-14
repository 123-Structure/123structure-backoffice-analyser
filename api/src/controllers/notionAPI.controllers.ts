import { Request, Response } from "express";
import { Client } from "@notionhq/client";
import { convertToISODate } from "../utils/convertToISODate";
import { getDatabaseId } from "../utils/getDatabaseId";
import { formattedDays } from "../utils/formattedDays";
import { dateOption } from "../data/constants/dateOption";
import { IRequestNotionApiResponse } from "../data/interfaces/IRequestNotionApiResponse";

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
    const data: IRequestNotionApiResponse = {
      type: req.originalUrl.split("/")[2],
      length: pages.results.length,
    };
    res.status(200).json(data);
  } catch (error) {
    // Return the error
    res.status(404).json({ path: req.originalUrl, notionAPIError: error });
  }
};

// GET all pages in a specific database by month
export const getAllPagesCurrentMonth = async (req: Request, res: Response) => {
  const databaseId = getDatabaseId(req.originalUrl);
  const monthsAgo = parseInt(req.params.monthAgo);

  const notion = new Client({ auth: apiKey });

  try {
    // Send the request to Notion API
    const previousMonth = await notion.databases.query({
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

    const currentMonth = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          {
            property: "Créé le",
            date: {
              on_or_after: convertToISODate(
                formattedDays(monthsAgo - 1).firstDay,
                "/",
                "-"
              ),
            },
          },
          {
            property: "Créé le",
            date: {
              on_or_before: convertToISODate(
                formattedDays(monthsAgo - 1).lastDay,
                "/",
                "-"
              ),
            },
          },
        ],
      },
    });

    // Return the result
    const data: IRequestNotionApiResponse = {
      type: req.originalUrl.split("/")[2],
      month: parseInt(formattedDays(monthsAgo).lastDay.split("/")[1])+1,
      length: currentMonth.results.length,
      difference: {
        period: {
          start: formattedDays(monthsAgo).firstDay,
          end: formattedDays(monthsAgo).lastDay,
        },
        value: currentMonth.results.length - previousMonth.results.length,
        percent: Math.round(
          (currentMonth.results.length / previousMonth.results.length) * 100 -
            100
        ),
      },
    };
    res.status(200).json(data);
  } catch (error) {
    // Return the error
    res.status(404).json({ path: req.originalUrl, notionAPIError: error });
  }
};
