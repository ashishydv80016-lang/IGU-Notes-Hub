import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";

function AdminUpload() {
  const [formData, setFormData] = useState({
    title: "",
    branch: "",
    semester: "",
    subject: "",
    type: "Notes",
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      return alert("Please select a PDF file.");
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

      await api.post("/materials/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("✅ Material Uploaded Successfully");

      setFormData({
        title: "",
        branch: "",
        semester: "",
        subject: "",
        type: "Notes",
      });

      setFile(null);
      document.getElementById("pdfFile").value = "";

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Upload Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-3xl mx-auto py-10 px-5">

        <div className="bg-white rounded-2xl shadow-xl p-8">

          <h1 className="text-4xl font-bold text-center mb-8">
            ⬆ Upload Study Material
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3"
            />

            <select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3"
            >
              <option value="">Select Branch</option>
              <option>CSE</option>
              <option>ECE</option>
              <option>EE</option>
              <option>ME</option>
              <option>CE</option>
              <option>IT</option>
            </select>

            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3"
            >
              <option value="">Select Semester</option>

              {[1,2,3,4,5,6,7,8].map((sem) => (
                <option key={sem}>
                  {sem}
                </option>
              ))}
            </select>

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3"
            />

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >
              <option>Notes</option>
              <option>Previous Paper</option>
              <option>Syllabus</option>
              <option>Lab Manual</option>
              <option>Assignment</option>
              <option>Question Bank</option>
              <option>Practical File</option>
              <option>eBook</option>
            </select>

            <input
              id="pdfFile"
              type="file"
              accept=".pdf"
              onChange={(e) =>
                setFile(e.target.files[0])
              }
              required
              className="w-full border rounded-lg p-3"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold transition"
            >
              {loading
                ? "Uploading..."
                : "⬆ Upload Material"}
            </button>

          </form>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default AdminUpload;