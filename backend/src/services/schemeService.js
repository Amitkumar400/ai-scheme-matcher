import { demoSchemes } from "../data/schemes.js";
import { Scheme } from "../models/Scheme.js";

let databaseReady = false;

export function setDatabaseReady(ready) {
  databaseReady = ready;
}

export async function listSchemes() {
  if (!databaseReady) return demoSchemes;
  return Scheme.find().lean();
}

export async function seedSchemes() {
  if (!databaseReady || await Scheme.exists({})) return;
  await Scheme.insertMany(demoSchemes);
}
