import chalk from "chalk";

export const checkPageExist = async (
  databaseId: string,
  property: string,
  targetValue: string,
  retries = 0
) => {
  // URL and authentication
  const url = `https://api.notion.com/v1/databases/${databaseId}/query`;
  const apiKey = process.env.NOTION_SECRET_KEY;
  const notionVersion = "2022-06-28";

  // Request headers
  let headers = {
    Authorization: `Bearer ${apiKey}`,
    "Notion-Version": notionVersion,
    "Content-Type": "application/json",
  };

  // Request body with filter
  let body = JSON.stringify({
    filter: {
      property: property,
      rich_text: {
        equals: targetValue,
      },
    },
  });

  try {
    // Send the POST request to Notion API
    const response = await fetch(url, {
      method: "POST",
      body,
      headers,
    });

    // Handle HTTP errors
    if (!response.ok) {
      console.error(
        chalk.bgRed(
          `Page Exist HTTP error! Status : ${response.status} - ${response.statusText}`
        )
      );

      // // Retry logic if retries remaining
      // if (retries < maxRetries) {
      //   console.log(
      //     `Retrying after ${retryDelay(0, 0, 5) / 1000} seconds... (${
      //       retries + 1
      //     }/${maxRetries})`
      //   );
      //   await new Promise((resolve) =>
      //     setTimeout(resolve, retryDelay(0, 0, 5))
      //   );
      //   await checkPageExist(databaseId, property, targetValue, retries + 1);
      // } else {
      //   // Max retries reached, exit script with error
      //   console.error(chalk.bgRed("Max retries reached. Exiting..."));
      //   process.exit(1);
      // }
    }

    // Parse the response as JSON and retrieve pages
    const data = await response.json();
    const pages = data.results;

    // Return the result
    return { test: pages.length > 0, pages: pages };
  } catch (error) {
    console.log(chalk.bgRed(`Page Exist Error (${targetValue}) - ${error}`));
  }
};
