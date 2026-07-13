import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";

function DownloadHistory() {
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDownloads();
  }, []);

  const fetchDownloads = async () => {
    try {
      const res = await api.get("/downloads");
      setDownloads(res.data.downloads);
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
        "Failed to load download history"
      );
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = async () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear your download history?"
    );

    if (!confirmClear) return;

    try {
      await api.delete("/downloads");

      setDownloads([]);

      alert("Download history cleared successfully");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to clear history"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-5 py-10">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-4xl font-bold">
            📥 Download History
          </h1>

          {downloads.length > 0 && (
            <button
              onClick={clearHistory}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
            >
              🗑 Clear History
            </button>
          )}

        </div>

        {loading ? (
          <h2 className="text-center text-2xl">
            Loading...
          </h2>
        ) : downloads.length === 0 ? (
          <h2 className="text-center text-red-600 text-2xl">
            No Downloads Yet
          </h2>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {downloads.map((item) => (

              <div
                key={item._id}
                className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition"
              >

                <h2 className="text-2xl font-bold mb-4">
                  {item.material?.title}
                </h2>

                <p>
                  <strong>📚 Branch:</strong>{" "}
                  {item.material?.branch}
                </p>

                <p>
                  <strong>🎓 Semester:</strong>{" "}
                  {item.material?.semester}
                </p>

                <p>
                  <strong>📖 Subject:</strong>{" "}
                  {item.material?.subject}
                </p>

                <p>
                  <strong>📄 Type:</strong>{" "}
                  {item.material?.type}
                </p>

                <p className="mt-3 text-gray-600 text-sm">
                  Downloaded on:
                </p>

                <p className="font-semibold mb-5">
                  {new Date(
                    item.downloadedAt
                  ).toLocaleString()}
                </p>

                <a
                  href={item.material?.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-center bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
                >
                  📄 Open PDF
                </a>

              </div>

            ))}

          </div>
        )}

      </div>

      <Footer />
    </>
  );
}

export default DownloadHistory;