import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";

function AdminMaterials() {
  const [materials, setMaterials] = useState([]);
  const [filteredMaterials, setFilteredMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchMaterials();
  }, []);

  useEffect(() => {
    const filtered = materials.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredMaterials(filtered);
  }, [search, materials]);

  const fetchMaterials = async () => {
    try {
      const res = await api.get("/materials");

      setMaterials(res.data.materials);
      setFilteredMaterials(res.data.materials);
    } catch (error) {
      console.error(error);
      alert("Failed to load materials");
    } finally {
      setLoading(false);
    }
  };

  const deleteMaterial = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this material?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/materials/${id}`);

      alert("Material Deleted Successfully");

      fetchMaterials();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Delete Failed"
      );
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="flex justify-center items-center h-[70vh]">
          <h1 className="text-3xl font-bold">
            Loading Materials...
          </h1>
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-5 py-10">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-4xl font-bold">
            📚 Manage Materials
          </h1>

          <Link
            to="/admin/upload"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
          >
            + Upload Material
          </Link>

        </div>

        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border p-3 rounded-lg mb-6"
        />

        <div className="overflow-x-auto bg-white rounded-xl shadow-lg">

          <table className="w-full">

            <thead className="bg-blue-600 text-white">

              <tr>

                <th className="p-4">Title</th>

                <th className="p-4">Branch</th>

                <th className="p-4">Semester</th>

                <th className="p-4">Subject</th>

                <th className="p-4">Type</th>

                <th className="p-4">Actions</th>

              </tr>

            </thead>

            <tbody>

              {filteredMaterials.length === 0 ? (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center p-8"
                  >
                    No Materials Found
                  </td>

                </tr>

              ) : (

                filteredMaterials.map((item) => (

                  <tr
                    key={item._id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="p-4">{item.title}</td>

                    <td className="p-4">{item.branch}</td>

                    <td className="p-4">{item.semester}</td>

                    <td className="p-4">{item.subject}</td>

                    <td className="p-4">{item.type}</td>

                    <td className="p-4 flex gap-3">

                      <Link
                        to={`/admin/materials/edit/${item._id}`}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() =>
                          deleteMaterial(item._id)
                        }
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default AdminMaterials;