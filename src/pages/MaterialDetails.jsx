import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FavoriteButton from "../components/FavoriteButton";
import api from "../services/api";
import DownloadButton from "../components/DownloadButton";

function MaterialDetails() {
  const { id } = useParams();

  const [material, setMaterial] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMaterial();
  }, []);

  const fetchMaterial = async () => {
    try {
      const res = await api.get("/materials");

      const foundMaterial = res.data.materials.find(
        (item) => item._id === id
      );

      setMaterial(foundMaterial);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="flex justify-center items-center h-[70vh]">
          <h1 className="text-3xl font-bold">Loading...</h1>
        </div>

        <Footer />
      </>
    );
  }

  if (!material) {
    return (
      <>
        <Navbar />

        <div className="flex justify-center items-center h-[70vh]">
          <h1 className="text-3xl font-bold text-red-600">
            Material Not Found
          </h1>
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto py-12 px-5">

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

          <div className="bg-blue-700 text-white p-8">

            <h1 className="text-4xl font-bold">
              {material.title}
            </h1>

            <p className="mt-2 text-blue-100">
              IGU Notes Hub
            </p>

          </div>

          <div className="p-8">

            <div className="grid md:grid-cols-2 gap-6">

              <div className="bg-gray-50 rounded-xl p-6">

                <h2 className="text-2xl font-bold mb-5">
                  📄 Material Information
                </h2>

                <div className="space-y-4">

                  <p>
                    <strong>📚 Branch:</strong>{" "}
                    {material.branch}
                  </p>

                  <p>
                    <strong>🎓 Semester:</strong>{" "}
                    {material.semester}
                  </p>

                  <p>
                    <strong>📖 Subject:</strong>{" "}
                    {material.subject}
                  </p>

                  <p>
                    <strong>📄 Type:</strong>{" "}
                    {material.type}
                  </p>

                </div>

              </div>

              <div className="bg-gray-50 rounded-xl p-6">

                <h2 className="text-2xl font-bold mb-5">
                  ⚡ Actions
                </h2>

<DownloadButton material={material} />

                <FavoriteButton materialId={material._id} />

              </div>

            </div>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default MaterialDetails;