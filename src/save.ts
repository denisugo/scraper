import fs from "fs";

export interface IItem {
  code: string;
  name: string;
  imageUrl: string;
  price: number;
  stored: string;
  rating: number;
}

export interface IResult {
  phrase: string;
  numOfResults: number;
  bestSellers: IItem[];
  mostExpensive: IItem[];
  mostRated: IItem[];
}

export default (data: IResult): void => {
  fs.writeFile("./output/output.json", JSON.stringify(data), (err) => {
    if (err) throw err;
    console.log("Saved");
  });
};
