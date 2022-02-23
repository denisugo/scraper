import grabStored from "../src/grabStored";
import { assert } from "chai";

it("Should return Skladem 2 ks", () => {
  const str = "Skladem 2 ks";
  const output = grabStored(str);
  assert.deepEqual(output, "Skladem 2 ks");
});

it("Should return Unavailable", () => {
  const str = undefined;
  const output = grabStored(str);
  assert.deepEqual(output, "Unavailable");
});
