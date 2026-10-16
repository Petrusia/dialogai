import assert from "node:assert/strict";
import test from "node:test";
import { isHoneypotFilled, validateInquiry } from "../lib/inquiry.ts";

const valid = {
  name: "Asta",
  email: "asta@example.com",
  city: "Kaunas",
  organization: "Bendruomenės namai",
  topic: "Kaimynų pokalbiai",
  message: "Norime saugios erdvės pokalbiui.",
};

test("priima užpildytą užklausą", () => {
  const result = validateInquiry(valid);
  assert.equal(result.ok, true);
  if (result.ok) assert.equal(result.value.city, "Kaunas");
});

test("reikalauja visų laukų ir galiojančio el. pašto", () => {
  const result = validateInquiry({ ...valid, email: "nepastas", name: "  " });
  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.equal(result.errors.name, "Šis laukas būtinas.");
    assert.equal(result.errors.email, "Įrašykite galiojantį el. pašto adresą.");
  }
});

test("honeypot laikomas užpildytu tik kai yra tekstas", () => {
  assert.equal(isHoneypotFilled({ company: "spam" }), true);
  assert.equal(isHoneypotFilled({ company: "   " }), false);
  assert.equal(isHoneypotFilled({}), false);
});
