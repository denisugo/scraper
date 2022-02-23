import stringToNumber from "../src/stringToNumber";
import { assert } from "chai";

it("should convert '13 490' to number", () => {
  const str = "13 490";
  assert.equal(stringToNumber(str), 13490);
});

it("should convert '1 098' to number", () => {
  const str = "1 098";
  assert.equal(stringToNumber(str), 1098);
});

it("should convert '1&nbsp;2' to number", () => {
  const str = "1&nbsp;2";
  assert.equal(stringToNumber(str), 12);
});
