import express from "express";
import multer from "multer";
import { storage } from "../config/cloudinary.js";
import {
  uploadMaterial,
  getMaterials,
  deleteMaterial,
  updateMaterial,
  getTopMaterials,
} from "../controllers/materialController.js";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

const upload = multer({ storage });

router.get("/top", getTopMaterials);
// Public route
router.get("/", getMaterials);

// Admin only
router.post(
  "/upload",
  protect,
  adminOnly,
  upload.single("file"),
  uploadMaterial
);

// Admin only
router.put(
  "/:id",
  protect,
  adminOnly,
  updateMaterial
);

// Admin only
router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteMaterial
);

export default router;