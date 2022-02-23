import { Page } from "puppeteer";
import stringToNumber from "./stringToNumber";

type Format = "TEXT" | "HTML";
type ReturnType = "NUMBER" | "STRING";

interface IParams {
  type?: ReturnType;
  format?: Format;
  timeout?: number;
}

export default async <T extends HTMLElement>(
  page: Page,
  selector: string,
  { type = "STRING", format = "HTML", timeout = 5000 }: IParams
): Promise<number | string | null> => {
  let result;
  const start = Date.now();
  let ms = 0;

  do {
    result = await page.evaluate(
      (selector, type, format, stringToNumber) => {
        stringToNumber = eval("(" + stringToNumber + ")");

        try {
          // ? InnerHTML is used because of ubreakable space
          const numOfResultsString = document.querySelector<T>(selector);

          if (format === "HTML") {
            if (type === "STRING") return numOfResultsString!.innerHTML;
            return stringToNumber(numOfResultsString!.innerHTML);
          } else {
            if (type === "STRING") return numOfResultsString!.innerText;
            return stringToNumber(numOfResultsString!.innerText);
          }
        } catch (error) {
          console.log(error);
          return null;
        }
      },
      selector,
      type,
      format,
      stringToNumber.toString()
    );

    ms = Date.now() - start;
  } while (!result && ms < timeout);
  return result;
};
