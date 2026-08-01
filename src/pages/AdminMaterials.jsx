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

  const [currentPage, setCurrentPage] = useState(1);
  const materialsPerPage = 8;

  useEffect(() => {
    fetchMaterials();
  }, []);

  useEffect(() => {
    const filtered = materials.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredMaterials(filtered);
    setCurrentPage(1);
  }, [search, materials]);

  const fetchMaterials = async () => {
    try {
      const res = await api.get("/materials");

      setMaterials(res.data.materials || []);
      setFilteredMaterials(res.data.materials || []);
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

      alert("Material deleted successfully.");

      fetchMaterials();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Delete Failed"
      );
    }
  };

  // Pagination
  const indexOfLastMaterial =
    currentPage * materialsPerPage;

  const indexOfFirstMaterial =
    indexOfLastMaterial - materialsPerPage;

  const currentMaterials =
    filteredMaterials.slice(
      indexOfFirstMaterial,
      indexOfLastMaterial
    );

  const totalPages = Math.ceil(
    filteredMaterials.length /
      materialsPerPage
  );

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
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

        <div className="flex flex-col md:flex-row justify-between items-center gap-5 mb-8">

          <h1 className="text-4xl font-bold">
            📚 Manage Materials
          </h1>

          <Link
            to="/admin/upload"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            + Upload Material
          </Link>

        </div>

        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full border rounded-lg p-3 mb-8"
        />
                {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow-lg">

          <table className="w-full">

            <thead className="bg-blue-600 text-white">

              <tr>

                <th className="p-4 text-left">Title</th>

                <th className="p-4 text-left">Branch</th>

                <th className="p-4 text-left">Semester</th>

                <th className="p-4 text-left">Subject</th>

                <th className="p-4 text-left">Type</th>

                <th className="p-4 text-center">Actions</th>

              </tr>

            </thead>

            <tbody>

              {filteredMaterials.length === 0 ? (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center p-8 text-gray-500"
                  >
                    No Materials Found
                  </td>

                </tr>

              ) : (

                currentMaterials.map((item) => (

                  <tr
                    key={item._id}
                    className="border-b hover:bg-gray-50 transition"
                  >

                    <td className="p-4 font-semibold">
                      {item.title}
                    </td>

                    <td className="p-4">
                      {item.branch}
                    </td>

                    <td className="p-4">
                      {item.semester}
                    </td>

                    <td className="p-4">
                      {item.subject}
                    </td>

                    <td className="p-4">
                      {item.type}
                    </td>

                    <td className="p-4">

                      <div className="flex justify-center gap-3">

                        <Link
                          to={`/admin/materials/edit/${item._id}`}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() =>
                            deleteMaterial(item._id)
                          }
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

          {/* Desktop Pagination */}

          <div className="flex flex-col md:flex-row justify-between items-center gap-5 py-6 px-6 border-t">

            <div className="font-semibold text-gray-600">

              Showing Page {currentPage} of {totalPages || 1}

            </div>

            <div className="flex flex-wrap justify-center gap-2">

              <button
                onClick={previousPage}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg bg-gray-700 text-white disabled:opacity-40"
              >
                ⬅ Previous
              </button>

              {Array.from(
                { length: totalPages },
                (_, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      setCurrentPage(index + 1)
                    }
                    className={`w-10 h-10 rounded-full font-bold ${
                      currentPage === index + 1
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {index + 1}
                  </button>
                )
              )}

              <button
                onClick={nextPage}
                disabled={
                  currentPage === totalPages ||
                  totalPages === 0
                }
                className="px-4 py-2 rounded-lg bg-gray-700 text-white disabled:opacity-40"
              >
                Next ➡
              </button>

            </div>

          </div>

        </div>
                {/* Mobile Cards */}

        <div className="md:hidden space-y-5 mt-6">

          {filteredMaterials.length === 0 ? (

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <h2 className="text-xl font-semibold">
                No Materials Found
              </h2>
            </div>

          ) : (

            currentMaterials.map((item) => (

              <div
                key={item._id}
                className="bg-white rounded-xl shadow-lg p-5"
              >

                <h2 className="text-xl font-bold text-blue-700 mb-3">
                  {item.title}
                </h2>

                <p>
                  <strong>Branch:</strong> {item.branch}
                </p>

                <p>
                  <strong>Semester:</strong> {item.semester}
                </p>

                <p>
                  <strong>Subject:</strong> {item.subject}
                </p>

                <p>
                  <strong>Type:</strong> {item.type}
                </p>

                <div className="flex gap-3 mt-5">

                  <Link
                    to={`/admin/materials/edit/${item._id}`}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white text-center py-2 rounded-lg"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteMaterial(item._id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))

          )}

        </div>

        {/* Mobile Pagination */}

        <div className="md:hidden flex flex-col items-center gap-4 mt-8">

          <div className="font-semibold text-gray-600">
            Showing Page {currentPage} of {totalPages || 1}
          </div>

          <div className="flex flex-wrap justify-center gap-2">

            <button
              onClick={previousPage}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg bg-gray-700 text-white disabled:opacity-40"
            >
              ⬅ Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => (

              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`w-10 h-10 rounded-full font-bold ${
                  currentPage === index + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                {index + 1}
              </button>

            ))}

            <button
              onClick={nextPage}
              disabled={
                currentPage === totalPages ||
                totalPages === 0
              }
              className="px-4 py-2 rounded-lg bg-gray-700 text-white disabled:opacity-40"
            >
              Next ➡
            </button>

          </div>

        </div>

      </div>

      <Footer />

    </>
  );
}

export default AdminMaterials;