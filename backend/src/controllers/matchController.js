import { z } from "zod";
import { listSchemes } from "../services/schemeService.js";
import { rankSchemes } from "../services/matchingService.js";

const cleanText = (max) => z.string().trim().min(1).max(max)
  .transform((value) => value.replace(/<[^>]*>/g, "").replace(/[\u0000-\u001f\u007f]/g, "").trim());

const profileSchema = z.object({
  gender: z.enum(["woman", "man", "nonbinary", "prefer-not-to-say"]),
  socialCategory: z.enum(["SC", "ST", "OBC", "Minority", "General"]),
  disability: z.boolean(),
  sector: cleanText(80),
  location: cleanText(100),
  fundingNeed: z.number().int().min(1).max(1000000000),
}).strict();

export async function matchSchemes(request, response, next) {
  try {
    const parsed = profileSchema.safeParse(request.body);
    if (!parsed.success) {
      return response.status(400).json({ error: "Please check the profile fields and try again." });
    }
    const schemes = await listSchemes();
    const matches = rankSchemes(parsed.data, schemes);
    return response.json({ matches });
  } catch (error) {
    return next(error);
  }
}
