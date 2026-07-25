import Material from "../models/Material.js";

export const getFilters = async (req, res) => {
  try {
    const branches = await Material.distinct("branch");
    const semesters = await Material.distinct("semester");
    const subjects = await Material.distinct("subject");
    const types = await Material.distinct("type");

    res.status(200).json({
      success: true,
      branches: branches.sort(),
      semesters: semesters.sort(),
      subjects: subjects.sort(),
      types: types.sort(),
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};