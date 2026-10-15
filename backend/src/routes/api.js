import { Router } from "express";
import { getSchemes } from "../controllers/schemeController.js";
import { matchSchemes } from "../controllers/matchController.js";
import { recordFeedback } from "../controllers/feedbackController.js";

const router = Router();
router.get("/schemes", getSchemes);
router.post("/match", matchSchemes);
router.post("/feedback", recordFeedback);
export default router;
