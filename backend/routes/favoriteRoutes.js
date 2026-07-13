import express from "express";

import {
  addFavorite,
  removeFavorite,
  getFavorites,
} from "../controllers/favoriteController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get logged-in user's favorites
router.get("/", protect, getFavorites);

// Add a material to favorites
router.post("/", protect, addFavorite);

// Remove a material from favorites
router.delete("/:id", protect, removeFavorite);

export default router;