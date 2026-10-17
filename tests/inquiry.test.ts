import assert from "node:assert/strict";
import test from "node:test";
import { inquiryPayload, isHoneypotFilled, upstreamFieldErrors, validateInquiry } from "../lib/inquiry.ts";

const valid = {
  name: "Asta",
  email: "asta@example.com",
  audience: "community",
  organization: "Bendruomenės namai",
  message: "Norime saugios erdvės pokalbiui.",
};

test("priima bendruomenės užklausą ir prideda šaltinį", () => {
  const result = validateInquiry(valid);
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.deepEqual(inquiryPayload(result.value), {
    name: "Asta",
    email: "asta@example.com",
    audience: "community",
    message: "Norime saugios erdvės pokalbiui.",
    website: "",
    source: "dialogai.lt",
    organization: "Bendruomenės namai",
  });
  assert.equal("topic" in inquiryPayload(result.value), false);
});

test("asmeniui organizacijos nesiunčia", () => {
  const result = validateInquiry({ ...valid, audience: "person", organization: "Nereikia", topic: "other" });
  assert.equal(result.ok, true);
  if (!result.ok) return;
  const payload = inquiryPayload(result.value);
  assert.equal(payload.audience, "person");
  assert.equal("organization" in payload, false);
  assert.equal("topic" in payload, false);
});

test("reikalauja vardo, el. pašto, kreipimosi ir žinutės", () => {
  const result = validateInquiry({ ...valid, email: "nepastas", name: "  ", audience: "kiemas", message: "" });
  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.equal(result.errors.name, "Šis laukas būtinas.");
  assert.equal(result.errors.email, "Įrašykite galiojantį el. pašto adresą.");
  assert.equal(result.errors.audience, "Pasirinkite, kas kreipiasi.");
  assert.equal(result.errors.message, "Šis laukas būtinas.");
});

test("riboja vardo, organizacijos ir žinutės ilgį", () => {
  const result = validateInquiry({
    ...valid,
    name: "A".repeat(121),
    organization: "B".repeat(201),
    message: "C".repeat(5001),
  });
  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.equal(result.errors.name, "Tekstas per ilgas.");
  assert.equal(result.errors.organization, "Tekstas per ilgas.");
  assert.equal(result.errors.message, "Tekstas per ilgas.");
});

test("tuščios organizacijos nesiunčia ir temos neprideda", () => {
  const result = validateInquiry({ ...valid, audience: "school", organization: "   ", topic: "training" });
  assert.equal(result.ok, true);
  if (!result.ok) return;
  const payload = inquiryPayload(result.value);
  assert.equal(payload.audience, "school");
  assert.equal("organization" in payload, false);
  assert.equal("topic" in payload, false);
  assert.equal(payload.source, "dialogai.lt");
  assert.equal(payload.website, "");
});

test("honeypot laikomas užpildytu tik kai yra tekstas", () => {
  assert.equal(isHoneypotFilled({ website: "spam" }), true);
  assert.equal(isHoneypotFilled({ website: "   " }), false);
  assert.equal(isHoneypotFilled({}), false);
});

test("422 klaidas paima iš Laravel errors", () => {
  const errors = upstreamFieldErrors({
    message: "The given data was invalid.",
    errors: { email: ["Netinka."], topic: "Pasirinkite temą.", city: ["Ne"] },
  });
  assert.deepEqual(errors, { email: "Netinka." });
});
