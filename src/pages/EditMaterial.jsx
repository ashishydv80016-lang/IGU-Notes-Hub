import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";

function EditMaterial() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    branch: "",
    semester: "",
    subject: "",
    type: "",
  });

  useEffect(() => {
    fetchMaterial();
  }, []);

  const fetchMaterial = async () => {
    try {
      const res = await api.get("/materials");

      const material = res.data.materials.find(
        (item) => item._id === id
      );

      if (!material) {
        alert("Material not found");
        navigate("/admin/materials");
        return;
      }

      setForm({
        title: material.title,
        branch: material.branch,
        semester: material.semester,
        subject: material.subject,
        type: material.type,
      });
    } catch (error) {
      console.error(error);
      alert("Failed to load material");
    } finally {
      setLoading(false);
    }
  };

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/materials/${id}`, form);

      alert("✅ Material Updated Successfully");

      navigate("/admin/materials");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Update Failed"
      );
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="flex justify-center items-center h-[70vh]">
          <h1 className="text-3xl font-bold">
            Loading...
          </h1>
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="max-w-2xl mx-auto py-10 px-5">

        <div className="bg-white rounded-xl shadow-lg p-8">

          <h1 className="text-3xl font-bold mb-8">
            ✏ Edit Material
          </h1>

          <form
            onSubmit={submitHandler}
            className="space-y-5"
          >

            <input
              type="text"
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={changeHandler}
              className="w-full border p-3 rounded-lg"
              required
            />

            <input
              type="text"
              name="branch"
              placeholder="Branch"
              value={form.branch}
              onChange={changeHandler}
              className="w-full border p-3 rounded-lg"
              required
            />

            <input
              type="text"
              name="semester"
              placeholder="Semester"
              value={form.semester}
              onChange={changeHandler}
              className="w-full border p-3 rounded-lg"
              required
            />

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={form.subject}
              onChange={changeHandler}
              className="w-full border p-3 rounded-lg"
              required
            />

            <select
              name="type"
              value={form.type}
              onChange={changeHandler}
              className="w-full border p-3 rounded-lg"
            >
              <option value="Notes">Notes</option>
              <option value="Previous Paper">
                Previous Paper
              </option>
              <option value="Syllabus">
                Syllabus
              </option>
            </select>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg"
            >
              Update Material
            </button>

          </form>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default EditMaterial;