import Download from "../models/Download.js";
import Material from "../models/Material.js";

// =======================================
// Record Download
// =======================================
export const recordDownload = async (req, res) => {
  try {
    const { materialId } = req.body;

    if (!materialId) {
      return res.status(400).json({
        success: false,
        message: "Material ID is required",
      });
    }

    const material = await Material.findById(materialId);

    if (!material) {
      return res.status(404).json({
        success: false,
        message: "Material not found",
      });
    }

    const download = await Download.create({
      user: req.user._id,
      material: materialId,
    });

    res.status(201).json({
      success: true,
      message: "Download recorded successfully",
      download,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =======================================
// Get Download History
// =======================================
export const getDownloadHistory = async (req, res) => {
  try {

    const downloads = await Download.find({
      user: req.user._id,
    })
      .populate("material")
      .sort({ downloadedAt: -1 });

    res.status(200).json({
      success: true,
      downloads,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =======================================
// Clear Download History
// =======================================
export const clearDownloadHistory = async (req, res) => {
  try {

    await Download.deleteMany({
      user: req.user._id,
    });

    res.status(200).json({
      success: true,
      message: "Download history cleared",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};