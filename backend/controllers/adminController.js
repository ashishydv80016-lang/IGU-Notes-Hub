import User from "../models/User.js";
import Material from "../models/Material.js";
import Favorite from "../models/Favorite.js";
import Download from "../models/Download.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalMaterials = await Material.countDocuments();

    const totalFavorites = await Favorite.countDocuments();

    const totalDownloads = await Download.countDocuments();

    const recentMaterials = await Material.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,

      stats: {
        totalUsers,
        totalMaterials,
        totalFavorites,
        totalDownloads,
      },

      recentMaterials,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};