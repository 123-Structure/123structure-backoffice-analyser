import chalk from "chalk";
import { retryDelay } from "../../retryDelay";

export const checkPageExist = async (
  databaseId: string,
  property: string,
  targetValue: string,
  retries = 0
) => {
  // Define the number of retries
  const maxRetries = 3;

  const url = `https://api.notion.com/v1/databases/${databaseId}/query`;
  const apiKey = process.env.NOTION_SECRET_KEY;
  const notionVersion = "2022-06-28";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Notion-Version": notionVersion,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      filter: {
        property: property,
        rich_text: {
          equals: targetValue,
        },
      },
    }),
  });

  if (!response.ok) {
    console.error(
      chalk.bgRed(
        `Page Exist HTTP error! Status : ${response.status} - ${response.statusText}`
      )
    );

    if (retries < maxRetries) {
      console.log(
        `Retrying after ${retryDelay(0, 0, 5) / 1000} seconds... (${
          retries + 1
        }/${maxRetries})`
      );
      await new Promise((resolve) => setTimeout(resolve, retryDelay(0, 0, 5)));
      await checkPageExist(databaseId, property, targetValue, retries + 1);
    } else {
      console.error(chalk.bgRed("Max retries reached. Exiting..."));
      // Forcefully exit the script with a non-zero exit code
      process.exit(1);
    }
  }

  const data = await response.json();
  const pages = data.results;
  return { test: pages.length > 0, pages: pages };
};
