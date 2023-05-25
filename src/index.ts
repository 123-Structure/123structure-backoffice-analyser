import puppeteer from "puppeteer";
import cron from "node-cron";
import dotenv from "dotenv";
import chalk from "chalk";

import { IUrl } from "./data/interfaces/IUrl";
import { convertTableToJSON } from "./data/utils/convertTableToJSON";
import { auth } from "./data/constants/auth";
import { scrapedUrl } from "./data/constants/scrapedUrl";
import {
  cronScheduleEveryFifteenMinutes,
  cronScheduleEveryThirtyMinutes,
  cronScheduleOnWorkDay,
} from "./data/constants/cronSchedule";
import { retryDelay } from "./data/utils/retryDelay";
import { getCurrentTimestamp } from "./data/utils/getCurrentTimestamp";
import { generateReport } from "./data/utils/generateReport";
import { demandeSpecifique } from "./data/utils/notion/demandeSpecifique";
import { demandeAbandonne } from "./data/utils/notion/demandeAbandonne";

// Load environment variables from .env file
dotenv.config();

// Define the number of retries
const maxRetries = 3;

async function scrapePages(urls: IUrl[], retries = 0) {
  const timestamp = getCurrentTimestamp();

  console.log("");
  console.log(chalk.bgGray(`🚀 ${timestamp}`));
  console.log(chalk.bgCyan("🚩 Starting scraping..."));

  let browser;

  try {
    browser = await puppeteer.launch({
      args: ["--no-sandbox"],
      // headless: false,
      headless: "new",
    });
    const page = await browser.newPage();

    // Login
    await page.goto("https://app.123structure.fr/backoffice");
    console.log("Navigated to the login page");
    await page.waitForSelector("#email");
    await page.waitForSelector("#password");

    // Fill email and password
    await page.type("#email", auth.email);
    await page.type("#password", auth.password);

    // Click on the login button
    await page.click('button[type="submit"]');
    console.log("Clicked on the login button");

    // await page.waitForNavigation();
    console.log(chalk.bgGreen("🔐 Successfully logged in"));

    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
      console.log(`Navigating to URL : [${url.id}] - ${url.path}`);

      await page.goto(url.path);
      await page.waitForSelector("#datatable");

      let data: any[] = [];

      let hasNextPage = true;
      let pageCounter = 1;

      while (hasNextPage) {
        console.log(
          `Scraped data from URL : [${url.id} - Page ${pageCounter}] - ${url.path}?page=${pageCounter}`
        );
        const pageData = await convertTableToJSON(page, browser, url.id);
        data = data.concat(pageData);

        const nextPageAnchor = await page.evaluate(() => {
          const anchors = Array.from(document.querySelectorAll("a"));
          return anchors.find((a) => a.innerText.includes("Suivant"));
        });

        if (!nextPageAnchor) {
          hasNextPage = false;
        } else {
          // //
          // hasNextPage = false;
          // //
          pageCounter++;
          const nextPageUrl = `${url.path}?page=${pageCounter}`;
          await page.goto(nextPageUrl);
          await page.waitForSelector("#datatable");
        }
      }

      generateReport(timestamp, url, data);
    }

    await browser.close();
    console.log(chalk.bgGreen("🏁 Scraping complete"));
    console.log("");
  } catch (error) {
    console.error(chalk.bgRed("Scraping failed:", error));

    if (browser) {
      await browser.close();
    }

    if (retries < maxRetries) {
      console.log(
        `Retrying after ${retryDelay(0, 0, 5) / 1000} seconds... (${
          retries + 1
        }/${maxRetries})`
      );
      await new Promise((resolve) => setTimeout(resolve, retryDelay(0, 0, 5)));
      await scrapePages(urls, retries + 1);
    } else {
      console.error(chalk.bgRed("Max retries reached. Exiting..."));
      // Forcefully exit the script with a non-zero exit code
      process.exit(1);
    }
  }
}

const launchScraping = async () => {
  // await scrapePages(scrapedUrl);
  await demandeSpecifique();
  // await demandeAbandonne();
};

// Schedule the script to run periodically
(async () => {
  launchScraping();

  if (process.env.APP_MODE === "DEVELOPMENT_15") {
    cron.schedule(cronScheduleEveryFifteenMinutes, async () => {
      launchScraping();
    });
  }

  if (process.env.APP_MODE === "DEVELOPMENT_30") {
    cron.schedule(cronScheduleEveryThirtyMinutes, async () => {
      launchScraping();
    });
  }

  if (process.env.APP_MODE === "PRODUCTION") {
    cron.schedule(cronScheduleOnWorkDay, async () => {
      launchScraping();
    });
  }
})();
