import User from "../models/User.js";
import Material from "../models/Material.js";
import Favorite from "../models/Favorite.js";
import Download from "../models/Download.js";

export const getDashboardStats = async (req, res) => {
  try {
    // ==========================
    // Dashboard Statistics
    // ==========================

    const [
      totalUsers,
      totalMaterials,
      totalFavorites,
      totalDownloads,
      recentMaterials,
      topDownloads,
      latestUsers,
    ] = await Promise.all([
      User.countDocuments(),
      Material.countDocuments(),
      Favorite.countDocuments(),
      Download.countDocuments(),

      Material.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("uploadedBy", "name email"),

      Material.find()
        .sort({ downloads: -1 })
        .limit(5)
        .populate("uploadedBy", "name"),

      User.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select("-password"),
    ]);

    // ==========================
    // Branch Statistics
    // ==========================

    const branchStats = await Material.aggregate([
      {
        $group: {
          _id: "$branch",
          total: { $sum: 1 },
        },
      },
      {
        $sort: { total: -1 },
      },
    ]);

    // ==========================
    // Semester Statistics
    // ==========================

    const semesterStats = await Material.aggregate([
      {
        $group: {
          _id: "$semester",
          total: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // ==========================
    // Recent Upload Count
    // ==========================

    const uploadsThisWeek = await Material.countDocuments({
      createdAt: {
        $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
    });

    // ==========================
    // Response
    // ==========================

    res.status(200).json({
      success: true,

      stats: {
        totalUsers,
        totalMaterials,
        totalFavorites,
        totalDownloads,
        uploadsThisWeek,
      },

      recentMaterials,

      topDownloads,

      latestUsers,

      branchStats,

      semesterStats,
    });
  } catch (error) {
    console.error("Dashboard Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load dashboard",
    });
  }
};