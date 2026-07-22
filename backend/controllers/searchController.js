import Material from "../models/Material.js";

export const searchMaterials = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    const materials = await Material.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { subject: { $regex: keyword, $options: "i" } },
        { branch: { $regex: keyword, $options: "i" } },
        { semester: { $regex: keyword, $options: "i" } },
        { type: { $regex: keyword, $options: "i" } },
      ],
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: materials.length,
      materials,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};