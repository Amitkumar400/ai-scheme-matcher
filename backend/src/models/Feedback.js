import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  schemeId: { type: String, required: true, maxlength: 120 },
  outcome: {
    type: String,
    enum: ["applied", "approved", "rejected", "not-eligible", "other"],
    required: true,
  },
  message: { type: String, maxlength: 500, default: "" },
}, { timestamps: true, versionKey: false });

export const Feedback = mongoose.model("Feedback", feedbackSchema);
