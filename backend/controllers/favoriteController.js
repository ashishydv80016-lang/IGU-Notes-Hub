import Favorite from "../models/Favorite.js";
import Material from "../models/Material.js";
import mongoose from "mongoose";

// ===================================
// Add Favorite
// ===================================
export const addFavorite = async (req, res) => {
  try {
    console.log("\n========== ADD FAVORITE ==========");
    console.log("User:", req.user);
    console.log("Request Body:", req.body);

    const { materialId } = req.body;

    if (!materialId) {
      return res.status(400).json({
        success: false,
        message: "Material ID is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(materialId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Material ID",
      });
    }

    const material = await Material.findById(materialId);

    console.log("Material Found:", material);

    if (!material) {
      return res.status(404).json({
        success: false,
        message: "Material not found",
      });
    }

    const alreadyExists = await Favorite.findOne({
      user: req.user._id,
      material: materialId,
    });

    console.log("Already Exists:", alreadyExists);

    if (alreadyExists) {
      return res.status(400).json({
        success: false,
        message: "Already in favorites",
      });
    }

    const favorite = await Favorite.create({
      user: req.user._id,
      material: materialId,
    });

    console.log("Favorite Saved:", favorite);

    res.status(201).json({
      success: true,
      message: "Added to favorites successfully",
      favorite,
    });

  } catch (error) {
    console.error("Favorite Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===================================
// Remove Favorite
// ===================================
export const removeFavorite = async (req, res) => {
  try {
    console.log("\n========== REMOVE FAVORITE ==========");

    const favorite = await Favorite.findOneAndDelete({
      user: req.user._id,
      material: req.params.id,
    });

    if (!favorite) {
      return res.status(404).json({
        success: false,
        message: "Favorite not found",
      });
    }

    res.json({
      success: true,
      message: "Favorite removed successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===================================
// Get My Favorites
// ===================================
export const getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({
      user: req.user._id,
    })
      .populate("material")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: favorites.length,
      favorites,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};