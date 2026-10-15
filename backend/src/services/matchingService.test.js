import test from "node:test";
import assert from "node:assert/strict";
import { rankSchemes } from "./matchingService.js";
import { demoSchemes } from "../data/schemes.js";

const profile = (overrides = {}) => ({
  gender: "woman",
  socialCategory: "SC",
  disability: false,
  sector: "manufacturing",
  location: "Maharashtra",
  fundingNeed: 500000,
  ...overrides,
});

test("Stand-Up India accepts a woman applicant independently of social category", () => {
  const matches = rankSchemes(profile({ socialCategory: "General", fundingNeed: 2000000 }), demoSchemes);
  assert.ok(matches.some((scheme) => scheme.name === "Stand-Up India"));
});

test("hard funding filters exclude schemes outside the applicant range", () => {
  const matches = rankSchemes(profile({ gender: "man", socialCategory: "General", fundingNeed: 500000 }), demoSchemes);
  assert.ok(!matches.some((scheme) => scheme.name === "Stand-Up India"));
});

test("all returned matches are ranked with explanations and scores", () => {
  const matches = rankSchemes(profile(), demoSchemes);
  assert.ok(matches.length > 0);
  assert.ok(matches.every((scheme) => Number.isInteger(scheme.matchPercentage) && scheme.explanation.length > 0));
  assert.deepEqual(matches.map((scheme) => scheme.matchPercentage), [...matches.map((scheme) => scheme.matchPercentage)].sort((left, right) => right - left));
});
