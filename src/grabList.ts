import { Page } from "puppeteer";
import grabRating from "./grabRating";
import grabStored from "./grabStored";
import { IItem } from "./save";
import stringToNumber from "./stringToNumber";

interface ISelector {
  globalSelector: string;
  nameSelector: string;
  codeSelector: string;
  imageUrlSelector: string;
  priceSelector: string;
  ratingSelector: string;
  storedSelector: string;
}

export default async (
  page: Page,
  {
    globalSelector,
    nameSelector,
    codeSelector,
    imageUrlSelector,
    priceSelector,
    ratingSelector,
    storedSelector,
  }: ISelector = {
    globalSelector: "#boxes > .box",
    nameSelector: "a.name",
    codeSelector: "span.code",
    imageUrlSelector: "img.js-box-image",
    priceSelector: ".price span.c2",
    ratingSelector: ".star-rating-wrapper",
    storedSelector: ".avl .postfix",
  },
  timeout: number = 5000
): Promise<IItem[] | null> => {
  let scrappedItems;
  const start = Date.now();
  let ms = 0;

  do {
    scrappedItems = await page.evaluate(
      (
        globalSelector,
        nameSelector,
        codeSelector,
        imageUrlSelector,
        priceSelector,
        storedSelector,
        ratingSelector,
        stringToNumber,
        grabRating,
        grabStored
      ) => {
        stringToNumber = eval("(" + stringToNumber + ")");
        grabRating = eval("(" + grabRating + ")");
        grabStored = eval("(" + grabStored + ")");
        const results =
          document.querySelectorAll<HTMLDivElement>(globalSelector);

        const items: IItem[] = [];

        try {
          results!.forEach(async (result) => {
            const name =
              result.querySelector<HTMLLinkElement>(nameSelector)!.innerText;

            const code =
              result.querySelector<HTMLSpanElement>(codeSelector)!.innerText;

            const imageUrl = String(
              result.querySelector<HTMLImageElement>(imageUrlSelector)!.dataset
                .src
            );

            // ? The price is followed by a comma and a daash
            // ? The slice function is used to remove the comma and the dash
            const price = stringToNumber(
              result
                .querySelector<HTMLSpanElement>(priceSelector)!
                .innerHTML.slice(0, -2)
            );

            const rating = grabRating(
              result.querySelector<HTMLDivElement>(ratingSelector)?.dataset
                .rating
            );

            const stored = grabStored(
              result.querySelector<HTMLDivElement>(storedSelector)?.innerText
            );

            items.push({
              name,
              code,
              imageUrl,
              price,
              rating,
              stored,
            });
          });
          return items;
        } catch (error) {}
        return null;
      },
      globalSelector,
      nameSelector,
      codeSelector,
      imageUrlSelector,
      priceSelector,
      storedSelector,
      ratingSelector,
      stringToNumber.toString(),
      grabRating.toString(),
      grabStored.toString()
    );
    ms = Date.now() - start;
  } while (!scrappedItems && ms < timeout);
  return scrappedItems;
};
