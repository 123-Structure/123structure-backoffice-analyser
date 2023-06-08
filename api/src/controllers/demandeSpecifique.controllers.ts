import { Request, Response } from "express";
import { Client } from "@notionhq/client";
import dotenv from "dotenv";

dotenv.config();

// Constants
const databaseId = process.env
  .NOTION_DATABASE_ID_DEMANDES_SPECIFIQUES as string;

const apiKey = process.env.NOTION_SECRET_KEY as string;

// GET all DemandeSpecifique
export const getDemandeSpecifique = async (req: Request, res: Response) => {
  const notion = new Client({ auth: apiKey });

  try {
    // Send the request to Notion API
    const pages = await notion.databases.query({
      database_id: databaseId,
    });

    // Return the result
    console.log(`❓Demande spécifique : ${pages.results.length} page(s)`);
    res.status(200).json(pages);
  } catch (error) {
    // Return the error
    res.status(404).json({ demandeSpecifiqueError: error });
  }
};
