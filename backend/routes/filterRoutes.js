import express from "express";
import { getFilters } from "../controllers/filterController.js";

const router = express.Router();

// Get all filter values
router.get("/", getFilters);

export default router;