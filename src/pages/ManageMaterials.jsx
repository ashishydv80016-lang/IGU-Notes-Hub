import { useEffect, useState } from "react";
import api from "../services/api";
import AdminLayout from "../layouts/AdminLayout";
import EditMaterialModal from "../components/EditMaterialModal";

function ManageMaterials() {
  const [materials, setMaterials] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const res = await api.get("/materials");
      setMaterials(res.data.materials);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMaterial = async (id) => {
    if (!window.confirm("Delete this material?")) return;

    try {
      await api.delete(`/materials/${id}`);
      alert("Material deleted successfully");
      fetchMaterials();
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  const openEditModal = (material) => {
    setSelectedMaterial(material);
    setShowModal(true);
  };

  const filteredMaterials = materials.filter((item) => {
    const keyword = search.toLowerCase();

    return (
      item.title.toLowerCase().includes(keyword) ||
      item.subject.toLowerCase().includes(keyword) ||
      item.branch.toLowerCase().includes(keyword) ||
      item.semester.toLowerCase().includes(keyword) ||
      item.type.toLowerCase().includes(keyword)
    );
  });

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          📄 Material Management
        </h1>

        <input
          type="text"
          placeholder="Search Material..."
          className="border rounded-lg px-4 py-2 w-80"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-x-auto">

        <table className="w-full">

          <thead className="bg-blue-700 text-white">

            <tr>
              <th className="p-4">Title</th>
              <th>Branch</th>
              <th>Semester</th>
              <th>Subject</th>
              <th>Type</th>
              <th>PDF</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {filteredMaterials.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-8 text-gray-500"
                >
                  No materials found.
                </td>
              </tr>
            ) : (
              filteredMaterials.map((item) => (
                <tr
                  key={item._id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-4">{item.title}</td>

                  <td>{item.branch}</td>

                  <td>{item.semester}</td>

                  <td>{item.subject}</td>

                  <td>{item.type}</td>

                  <td>
                    <a
                      href={item.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      📄 View
                    </a>
                  </td>

                  <td>

                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() => openEditModal(item)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                      >
                        ✏ Edit
                      </button>

                      <button
                        onClick={() => deleteMaterial(item._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                      >
                        🗑 Delete
                      </button>

                    </div>

                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

      {showModal && (
        <EditMaterialModal
          material={selectedMaterial}
          onClose={() => setShowModal(false)}
          onUpdated={fetchMaterials}
        />
      )}
    </AdminLayout>
  );
}

export default ManageMaterials;