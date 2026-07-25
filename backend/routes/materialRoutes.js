import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { uploadMaterial, getMaterials, getMaterialById, getTopMaterials, deleteMaterial, updateMaterial } from "../controllers/materialController.js";
import protect from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", getMaterials);

router.get("/top", getTopMaterials);

router.get("/:id", getMaterialById);

router.post(
  "/upload",
  protect,
  adminMiddleware,
  (req, res, next) => {
    upload.single("file")(req, res, function (err) {
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({
            success: false,
            message: "PDF size must be less than 10 MB.",
          });
        }

        return res.status(400).json({
          success: false,
          message: err.message,
        });
      }

      next();
    });
  },
  uploadMaterial
);

router.put("/:id", protect, adminMiddleware, updateMaterial);

router.delete("/:id", protect, adminMiddleware, deleteMaterial);

export default router;
