import Material from "../models/Material.js";

export const searchMaterials = async (req, res) => {
  try {
    const {
      keyword = "",
      branch = "",
      semester = "",
      subject = "",
      type = "",
      sort = "newest",
    } = req.query;

    const query = {};

    // Keyword Search
    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { subject: { $regex: keyword, $options: "i" } },
        { branch: { $regex: keyword, $options: "i" } },
        { semester: { $regex: keyword, $options: "i" } },
        { type: { $regex: keyword, $options: "i" } },
      ];
    }

    // Filters
    if (branch) query.branch = branch;
    if (semester) query.semester = semester;
    if (subject) query.subject = subject;
    if (type) query.type = type;

    // Sorting
    let sortOption = {};

    switch (sort) {
      case "oldest":
        sortOption = {
          createdAt: 1,
        };
        break;

      case "downloads":
        sortOption = {
          downloads: -1,
        };
        break;

      case "az":
        sortOption = {
          title: 1,
        };
        break;

      default:
        sortOption = {
          createdAt: -1,
        };
    }

    const materials = await Material.find(query).sort(sortOption);

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