import express from "express";

import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
} from "../controllers/userController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Authentication
router.post("/register", registerUser);
router.post("/login", loginUser);

// Profile
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

export default router;