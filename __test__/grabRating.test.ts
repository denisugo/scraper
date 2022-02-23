import grabRating from "../src/grabRating";
import { assert } from "chai";

it("Should return 95", () => {
  const rating = "0,95";
  const output = grabRating(rating);
  assert.deepEqual(output, 95);
});
it("Should return 100", () => {
  const rating = "1";
  const output = grabRating(rating);
  assert.deepEqual(output, 100);
});
it("Should return 0", () => {
  const rating = "0";
  const output = grabRating(rating);
  assert.deepEqual(output, 0);
});
it("Should return 0 when no rating provided", () => {
  const rating = undefined;
  const output = grabRating(rating);
  assert.deepEqual(output, 0);
});
