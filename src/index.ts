import puppeteer from "puppeteer";
import cron from "node-cron";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import chalk from "chalk";

import { IUrl } from "./data/interfaces/IUrl";
import { convertTableToJSON } from "./data/utils/convertTableToJSON";
import { auth } from "./data/constants/auth";
import { scrapedUrl } from "./data/constants/scrapedUrl";
import {
  cronScheduleEveryMinute,
  cronScheduleOnWorkDay,
} from "./data/constants/cronSchedule";
import { retryDelay } from "./data/utils/retryDelay";
import { getCurrentTimestamp } from "./data/utils/getCurrentTimestamp";
import { generateReport } from "./data/utils/generateReport";

// Load environment variables from .env file
dotenv.config();

// Define the number of retries and the delay in milliseconds
const maxRetries = 3;

async function scrapePages(urls: IUrl[], retries = 0) {
  console.log(chalk.bgGray(`${getCurrentTimestamp()}`));
  console.log(chalk.bgCyan("🏁 Starting scraping..."));

  let browser;

  try {
    browser = await puppeteer.launch({
      headless: false,
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
      console.log(`Navigating to URL: [${url.id}] - ${url.path}`);

      await page.goto(url.path);
      await page.waitForSelector("#datatable");

      const data = await convertTableToJSON(page);
      console.log(`Scraped data from URL: [${url.id}] - ${url.path}`);

      generateReport(url, data);
    }

    await browser.close();
    console.log(chalk.bgGreen("🎉 Scraping complete"));
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
      await new Promise((resolve) => setTimeout(resolve, retryDelay(0, 0, 10)));
      await scrapePages(urls, retries + 1);
    } else {
      console.log(chalk.bgRed("Max retries reached. Exiting..."));
      // Forcefully exit the script with a non-zero exit code
      process.exit(1);
    }
  }
}

// Schedule the script to run periodically
scrapePages(scrapedUrl);

if (process.env.APP_MODE === "DEVELOPMENT") {
  cron.schedule(cronScheduleEveryMinute, async () => {
    await scrapePages(scrapedUrl);
  });
}

if (process.env.APP_MODE === "PRODUCTION") {
  cron.schedule(cronScheduleOnWorkDay, async () => {
    await scrapePages(scrapedUrl);
  });
}
