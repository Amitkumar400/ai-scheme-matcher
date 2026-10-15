import { z } from "zod";
import mongoose from "mongoose";
import { Feedback } from "../models/Feedback.js";

const feedbackSchema = z.object({
  schemeId: z.string().trim().min(1).max(120).transform((value) => value.replace(/[<>\u0000-\u001f]/g, "")),
  outcome: z.enum(["applied", "approved", "rejected", "not-eligible", "other"]),
  message: z.string().trim().max(500).optional().transform((value) => (value ?? "").replace(/<[^>]*>/g, "").replace(/[\u0000-\u001f\u007f]/g, "")),
}).strict();

const demoFeedback = [];

export async function recordFeedback(request, response, next) {
  try {
    const parsed = feedbackSchema.safeParse(request.body);
    if (!parsed.success) return response.status(400).json({ error: "Please provide a valid scheme and outcome." });
    if (mongoose.connection.readyState === 1) await Feedback.create(parsed.data);
    else demoFeedback.push({ ...parsed.data, createdAt: new Date().toISOString() });
    return response.status(201).json({ message: "Thank you. Your anonymous feedback has been recorded." });
  } catch (error) {
    return next(error);
  }
}
