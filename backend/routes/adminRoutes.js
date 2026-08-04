import express from "express";
import { getDashboardStats } from "../controllers/adminController.js";

import protect from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

/*
========================================
Admin Dashboard
GET /api/admin/dashboard
========================================
*/

router.get(
  "/dashboard",
  protect,
  adminMiddleware,
  getDashboardStats
);

/*
========================================
Health Check
GET /api/admin/test
========================================
*/

router.get(
  "/test",
  protect,
  adminMiddleware,
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Admin API Working",
    });
  }
);

export default router;