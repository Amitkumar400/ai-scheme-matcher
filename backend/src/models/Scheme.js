import mongoose from "mongoose";

const eligibilitySchema = new mongoose.Schema({
  gender: { type: [String], default: [] },
  socialCategories: { type: [String], default: [] },
  anyOf: { type: [mongoose.Schema.Types.Mixed], default: [] },
  disability: { type: Boolean, default: null },
  sectors: { type: [String], default: [] },
  states: { type: [String], default: [] },
  minFunding: { type: Number, default: 0 },
  maxFunding: { type: Number, default: null },
}, { _id: false });

const schemeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  eligibilityRules: { type: eligibilitySchema, required: true },
  benefits: { type: String, required: true },
  issuingBody: { type: String, required: true },
  description: { type: String, default: "" },
}, { timestamps: true });

export const Scheme = mongoose.model("Scheme", schemeSchema);
