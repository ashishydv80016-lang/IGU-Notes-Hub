import Material from "../models/Material.js";

export const searchMaterials = async (req, res) => {
  try {
    const {
      keyword = "",
      branch = "",
      semester = "",
      subject = "",
      type = "",
    } = req.query;

    const query = {};

    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { subject: { $regex: keyword, $options: "i" } },
        { branch: { $regex: keyword, $options: "i" } },
        { semester: { $regex: keyword, $options: "i" } },
        { type: { $regex: keyword, $options: "i" } },
      ];
    }

    if (branch) query.branch = branch;
    if (semester) query.semester = semester;
    if (subject) query.subject = subject;
    if (type) query.type = type;

    const materials = await Material.find(query).sort({
      createdAt: -1,
    });

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