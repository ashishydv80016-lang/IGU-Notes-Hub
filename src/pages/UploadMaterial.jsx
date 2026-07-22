import { useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";

function UploadMaterial() {
  const [formData, setFormData] = useState({
    title: "",
    branch: "",
    semester: "",
    subject: "",
    type: "Notes",
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      return;
    }

    // Allow only PDF
    if (selectedFile.type !== "application/pdf") {
      toast.error("Only PDF files are allowed.");
      e.target.value = "";
      setFile(null);
      return;
    }

    // Maximum 10 MB
    if (selectedFile.size > MAX_FILE_SIZE) {
      toast.error("PDF size must be less than 10 MB.");
      e.target.value = "";
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      branch: "",
      semester: "",
      subject: "",
      type: "Notes",
    });

    setFile(null);

    const input = document.getElementById("pdfFile");
    if (input) input.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a PDF file.");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      data.append("title", formData.title);
      data.append("branch", formData.branch);
      data.append("semester", formData.semester);
      data.append("subject", formData.subject);
      data.append("type", formData.type);
      data.append("file", file);

      const res = await api.post("/materials/upload", data);

      toast.success(
        res.data.message || "Material uploaded successfully!"
      );

      resetForm();

    } catch (err) {
      console.error("Upload Error:", err);

      toast.error(
        err.response?.data?.message ||
        err.message ||
        "Upload Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center items-center px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 w-full max-w-xl"
      >
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
          Upload Material
        </h1>

        <input
          type="text"
          name="title"
          placeholder="Material Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 mb-4"
          required
        />

        <input
          type="text"
          name="branch"
          placeholder="Branch (CSE, ECE...)"
          value={formData.branch}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 mb-4"
          required
        />

        <input
          type="text"
          name="semester"
          placeholder="Semester"
          value={formData.semester}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 mb-4"
          required
        />

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 mb-4"
          required
        />

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 mb-4"
        >
          <option>Notes</option>
          <option>Previous Paper</option>
          <option>PYQ</option>
          <option>Syllabus</option>
        </select>

        <input
          id="pdfFile"
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="w-full border rounded-lg p-3 mb-3"
          required
        />

        {file && (
          <div className="mb-5 text-sm text-gray-600 dark:text-gray-300">
            <p><strong>Selected File:</strong> {file.name}</p>
            <p>
              <strong>Size:</strong>{" "}
              {(file.size / (1024 * 1024)).toFixed(2)} MB
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-3 rounded-lg font-semibold transition"
        >
          {loading ? "Uploading..." : "Upload PDF"}
        </button>
      </form>
    </div>
  );
}

export default UploadMaterial;
