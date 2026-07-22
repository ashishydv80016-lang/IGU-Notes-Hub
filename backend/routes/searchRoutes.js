import express from "express";
import { searchMaterials } from "../controllers/searchController.js";

const router = express.Router();

// Search API
router.get("/", searchMaterials);

export default router;