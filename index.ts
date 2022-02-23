import main from "./src/main";
import rl from "readline";

const input = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
});

input.question("Enter your phrase > ", (phrase: string) => {
  main(phrase);
  input.close();
});
