import express from "express";

import {
  getAllUsers,
  updateUserRole,
  deleteUser,
} from "../controllers/adminUserController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all users
router.get("/", protect, getAllUsers);

// Update user role
router.put("/:id", protect, updateUserRole);

// Delete user
router.delete("/:id", protect, deleteUser);

export default router;