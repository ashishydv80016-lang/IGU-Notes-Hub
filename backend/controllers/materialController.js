import Material from "../models/Material.js";

// ==========================================
// Upload Material
// ==========================================
export const uploadMaterial = async (req, res) => {
  try {
    console.log("========== UPLOAD ==========");
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    console.log("USER:", req.user);

    const { title, branch, semester, subject, type } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF file.",
      });
    }

    const material = await Material.create({
      title,
      branch,
      semester,
      subject,
      type,
      fileUrl: req.file.path,
      uploadedBy: req.user?._id || null,
    });

    console.log("✅ Material Saved Successfully");
    console.log(material);

    return res.status(201).json({
      success: true,
      message: "Material uploaded successfully",
      material,
    });
  } catch (error) {
    console.error("❌ UPLOAD ERROR:");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Get All Materials
// ==========================================
export const getMaterials = async (req, res) => {
  try {
    const materials = await Material.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
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

// Get Top Downloaded Materials
export const getTopMaterials = async (req, res) => {
  try {
    const materials = await Material.find()
      .sort({ downloads: -1, createdAt: -1 })
      .limit(6);

    res.status(200).json({
      success: true,
      materials,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==========================================
// Delete Material
// ==========================================
export const deleteMaterial = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);

    if (!material) {
      return res.status(404).json({
        success: false,
        message: "Material not found",
      });
    }

    await Material.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Material deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Update Material
// ==========================================
export const updateMaterial = async (req, res) => {
  try {
    const { title, branch, semester, subject, type } = req.body;

    const material = await Material.findById(req.params.id);

    if (!material) {
      return res.status(404).json({
        success: false,
        message: "Material not found",
      });
    }

    material.title = title;
    material.branch = branch;
    material.semester = semester;
    material.subject = subject;
    material.type = type;

    await material.save();

    res.status(200).json({
      success: true,
      message: "Material updated successfully",
      material,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};