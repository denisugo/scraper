import puppeteer from "puppeteer";
import save from "./save";
import { link } from "../config/variables";
import grabList from "./grabList";
import grabItem from "./grabItem";

const width = 1024;
const height = 3000;

export default async (phrase: string): Promise<void> => {
  const browser = await puppeteer.launch({
    headless: true,
    slowMo: 100,
    defaultViewport: { width, height },
  });
  const page = await browser.newPage();

  await page.setViewport({ width: width, height: height });

  await page.setUserAgent("UA-TEST");

  await page.goto(link);

  // ? Allow cookies
  await page.click('a[href="javascript:Alza.Web.Cookies.acceptAllCookies();"]');

  // ? Type a phrase and click 'Hledat' button
  await page.type("#edtSearch", phrase);
  await page.click("#btnSearch");

  const numOfResults = await grabItem<HTMLSpanElement>(page, "#lblNumberItem", {
    type: "NUMBER",
  });

  // ? Grabbing bestSellers
  // ?  First, it is required to switch to best sellers
  try {
    await page.click('a[href="#nejprodavanejsi"]');
    // ? It need to wait until loader disapears, so the valid data has been fetched
    await page.waitForSelector(".circle-loader-container", { timeout: 2000 });
    await page.waitForSelector(".circle-loader-container", { hidden: true });
  } catch (error) {
    console.error(error);
  }

  const bestSellers = await grabList(page);

  // ? Grabbing mostExpensive
  // ?  Then, it is required to switch to best sellers
  try {
    await page.click('a[href="#cenadesc"]');
    // ? It need to wait until loader disapears, so the valid data has been fetched
    await page.waitForSelector(".circle-loader-container", { timeout: 2000 });
    await page.waitForSelector(".circle-loader-container", { hidden: true });
  } catch (error) {
    console.error(error);
  }

  const mostExpensive = await grabList(page);

  // ? Grabbing mostRated
  // ?  Then, it is required to switch to best sellers
  try {
    await page.click('a[href="#nejlepehodnocene"]');
    // ? It need to wait until loader disapears, so the valid data has been fetched
    await page.waitForSelector(".circle-loader-container", { timeout: 2000 });
    await page.waitForSelector(".circle-loader-container", { hidden: true });
  } catch (error) {
    console.error(error);
  }

  const mostRated = await grabList(page);

  if (
    typeof numOfResults === "number" &&
    bestSellers &&
    mostRated &&
    mostExpensive
  ) {
    console.log("phrase", phrase);
    console.log("numOfResults", numOfResults);
    console.log("bestSellers", bestSellers);
    console.log("mostExpensive", mostExpensive);
    console.log("mostRated", mostRated);
    save({
      phrase,
      numOfResults,
      bestSellers,
      mostExpensive,
      mostRated,
    });
  } else console.log("Something went wrong, please try again!");

  await browser.close();
};
