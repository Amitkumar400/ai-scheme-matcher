import { listSchemes } from "../services/schemeService.js";

export async function getSchemes(_request, response, next) {
  try {
    const schemes = await listSchemes();
    response.json({ schemes });
  } catch (error) {
    next(error);
  }
}
