export const checkPageExist = async (
  databaseId: string,
  property: string,
  targetValue: string
) => {
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
    throw new Error(`HTTP error! Status : ${response.status}`);
  }

  const data = await response.json();
  const pages = data.results;
  return pages.length > 0;
};
