import { Page } from "puppeteer";

export const convertTableToJSON = async (page: Page) => {
  const data = await page.evaluate(() => {
    const table = document.getElementById("datatable");
    if (table !== null) {
      const rows = table.querySelectorAll("tr");

      const jsonData: any[] = [];
      const headers = Array.from(rows[0].querySelectorAll("th")).map((th) =>
        th.innerText.trim()
      );

      for (let i = 2; i < rows.length; i++) {
        const row = rows[i];
        const rowData: any = {};
        const cells = Array.from(row.querySelectorAll("td"));

        for (let j = 0; j < cells.length; j++) {
          rowData[headers[j]] = cells[j].innerText;
        }

        jsonData.push(rowData);
      }

      return jsonData;
    }
    return null;
  });

  // Check if there is at least one row of data
  if (data && data.length > 0) {
    return data;
  }

  return null;
};
