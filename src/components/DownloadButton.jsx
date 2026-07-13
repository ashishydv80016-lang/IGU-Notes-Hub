import api from "../services/api";

function DownloadButton({ material }) {

  const handleDownload = async () => {
    try {

      // Save download history
      await api.post("/downloads", {
        materialId: material._id,
      });

      // Open PDF
      window.open(material.fileUrl, "_blank");

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Download Failed"
      );
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
    >
      📥 Download PDF
    </button>
  );
}

export default DownloadButton;