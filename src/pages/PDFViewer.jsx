import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Download,
} from "lucide-react";

import api from "../services/api";

function PDFViewer() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [pdfUrl, setPdfUrl] = useState("");
  const [title, setTitle] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMaterial = async () => {
      try {
        const { data } = await api.get(`/materials/${id}`);
        const material = data.material;
        const fileUrl = material.fileUrl || material.pdfUrl;

        if (!fileUrl) {
          setError("This material does not have a PDF file.");
          return;
        }

        setPdfUrl(fileUrl);
        setTitle(material.title);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Unable to load this material.");
      } finally {
        setLoading(false);
      }
    };

    fetchMaterial();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900">
        <h1 className="text-2xl font-bold">
          Loading PDF...
        </h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-100 px-4 dark:bg-gray-900">
        <h1 className="text-2xl font-bold text-red-600">{error}</h1>
        <button onClick={() => navigate(-1)} className="rounded-lg bg-blue-600 px-5 py-2 text-white">
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">

      {/* ================= HEADER ================= */}

      <div className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-lg">

        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 px-4 py-4">

          {/* Back */}

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 px-4 py-2 rounded-lg transition"
          >
            <ArrowLeft size={20} />
            Back
          </button>

          {/* Title */}

          <h2 className="text-xl md:text-2xl font-bold text-center flex-1 text-gray-800 dark:text-white">
            {title}
          </h2>

          {/* Download */}

          <a
            href={pdfUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
          >
            <Download size={20} />
            Download
          </a>

        </div>

      </div>

      <div className="mx-auto max-w-7xl px-2 py-5">
        <iframe
          title={title || "PDF document"}
          src={`${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1`}
          className="h-[calc(100vh-110px)] min-h-[600px] w-full rounded-lg border bg-white shadow-lg"
        >
          <p>
            Your browser cannot display this PDF. Use the Download button above.
          </p>
        </iframe>
      </div>

    </div>
  );
}

export default PDFViewer;
