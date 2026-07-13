import { useState, useEffect } from "react";
import api from "../services/api";

function EditMaterialModal({ material, onClose, onUpdated }) {
  const [formData, setFormData] = useState({
    title: "",
    branch: "",
    semester: "",
    subject: "",
    type: "",
  });

  useEffect(() => {
    if (material) {
      setFormData({
        title: material.title,
        branch: material.branch,
        semester: material.semester,
        subject: material.subject,
        type: material.type,
      });
    }
  }, [material]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const updateMaterial = async () => {
    try {
      await api.put(`/materials/${material._id}`, formData);

      alert("Material updated successfully!");

      onUpdated();

      onClose();
    } catch (error) {
      console.error(error);
      alert("Update failed!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">

      <div className="bg-white rounded-xl p-8 w-[500px]">

        <h2 className="text-3xl font-bold mb-6">
          ✏ Edit Material
        </h2>

        <input
          className="border w-full p-3 mb-3 rounded"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
        />

        <input
          className="border w-full p-3 mb-3 rounded"
          name="branch"
          value={formData.branch}
          onChange={handleChange}
          placeholder="Branch"
        />

        <input
          className="border w-full p-3 mb-3 rounded"
          name="semester"
          value={formData.semester}
          onChange={handleChange}
          placeholder="Semester"
        />

        <input
          className="border w-full p-3 mb-3 rounded"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Subject"
        />

        <select
          className="border w-full p-3 mb-5 rounded"
          name="type"
          value={formData.type}
          onChange={handleChange}
        >
          <option>Notes</option>
          <option>Previous Paper</option>
          <option>Syllabus</option>
        </select>

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-5 py-2 rounded"
          >
            Cancel
          </button>

          <button
            onClick={updateMaterial}
            className="bg-blue-600 text-white px-5 py-2 rounded"
          >
            Save
          </button>

        </div>

      </div>

    </div>
  );
}

export default EditMaterialModal;