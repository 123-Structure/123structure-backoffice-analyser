import { Request, Response } from "express";
import { Client } from "@notionhq/client";
import { convertToISODate } from "../utils/convertToISODate";
import { getDatabaseId } from "../utils/getDatabaseId";
import { formattedDays } from "../utils/formattedDays";
import { dateOption } from "../data/constants/dateOption";
import { IGetAllPagesResponse } from "../data/interfaces/IGetAllPagesResponse";
import { IGetCurrentMonthResponse } from "../data/interfaces/IGetCurrentMonth";

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
    const data: IGetAllPagesResponse = {
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
export const getCurrentMonth = async (req: Request, res: Response) => {
  const databaseId = getDatabaseId(req.originalUrl);
  const month = parseInt(req.params.month);
  const year = parseInt(req.params.year);

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
                formattedDays(month - 1, year).firstDay,
                "/",
                "-"
              ),
            },
          },
          {
            property: "Créé le",
            date: {
              on_or_before: convertToISODate(
                formattedDays(month - 1, year).lastDay,
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
                formattedDays(month, year).firstDay,
                "/",
                "-"
              ),
            },
          },
          {
            property: "Créé le",
            date: {
              on_or_before: convertToISODate(
                formattedDays(month, year).lastDay,
                "/",
                "-"
              ),
            },
          },
        ],
      },
    });

    // Return the result
    const data: IGetCurrentMonthResponse = {
      type: req.originalUrl.split("/")[2],
      length: currentMonth.results.length,
      difference: {
        period: {
          start: formattedDays(month, year).firstDay,
          end: formattedDays(month, year).lastDay,
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

// GET all pages in a specific database by month and category
export const getCurrentMonthByCategory = async (
  req: Request,
  res: Response
) => {
  const databaseId = getDatabaseId(req.originalUrl);
  const month = parseInt(req.params.month);
  const year = parseInt(req.params.year);

  const notion = new Client({ auth: apiKey });

  const categoryList = [
    "🏡 Construction neuve",
    "🏡 Agrandissement par surélévation",
    "🏡 Agrandissement par extension",
    "🏡 Rénovation",
    "🏡 Dimensionnement d'élements",
  ];

  const data: IGetCurrentMonthResponse[] = [];

  try {
    for (const category of categoryList) {
      // Send the request to Notion API
      const previousMonth = await notion.databases.query({
        database_id: databaseId,
        filter: {
          and: [
            {
              property: "Créé le",
              date: {
                on_or_after: convertToISODate(
                  formattedDays(month - 1, year).firstDay,
                  "/",
                  "-"
                ),
              },
            },
            {
              property: "Créé le",
              date: {
                on_or_before: convertToISODate(
                  formattedDays(month - 1, year).lastDay,
                  "/",
                  "-"
                ),
              },
            },
            {
              property: "Type de projet",
              select: {
                equals: category,
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
                  formattedDays(month, year).firstDay,
                  "/",
                  "-"
                ),
              },
            },
            {
              property: "Créé le",
              date: {
                on_or_before: convertToISODate(
                  formattedDays(month, year).lastDay,
                  "/",
                  "-"
                ),
              },
            },
            {
              property: "Type de projet",
              select: {
                equals: category,
              },
            },
          ],
        },
      });

      // Push the result
      data.push({
        type: `${req.originalUrl.split("/")[2]} (${category})`,
        length: currentMonth.results.length,
        difference: {
          period: {
            start: formattedDays(month, year).firstDay,
            end: formattedDays(month, year).lastDay,
          },
          value: currentMonth.results.length - previousMonth.results.length,
          percent: Math.round(
            (currentMonth.results.length / previousMonth.results.length) * 100 -
              100
          ),
        },
      });
    }
    // Return the result
    res.status(200).json(data);
  } catch (error) {
    // Return the error
    res.status(404).json({ path: req.originalUrl, notionAPIError: error });
  }
};
