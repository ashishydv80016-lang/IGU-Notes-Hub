import express from "express";

import {
  recordDownload,
  getDownloadHistory,
  clearDownloadHistory,
} from "../controllers/downloadController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Record a download
router.post("/", protect, recordDownload);

// Get logged-in user's download history
router.get("/", protect, getDownloadHistory);

// Clear download history
router.delete("/", protect, clearDownloadHistory);

export default router;