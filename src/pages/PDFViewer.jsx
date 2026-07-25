import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Document, Page } from "react-pdf";
import {
  ArrowLeft,
  Download,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

import api from "../services/api";

function PDFViewer() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [pdfUrl, setPdfUrl] = useState("");
  const [title, setTitle] = useState("");

  const [numPages, setNumPages] = useState(0);
  const [scale, setScale] = useState(1.2);

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

  const onLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

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

      {/* ================= ZOOM CONTROLS ================= */}

      <div className="flex justify-center items-center gap-4 py-5">

        <button
          onClick={() =>
            setScale((prev) => Math.max(0.5, prev - 0.2))
          }
          className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow"
        >
          <ZoomOut />
        </button>

        <div className="bg-white dark:bg-gray-800 shadow-lg px-6 py-3 rounded-xl font-bold text-lg dark:text-white">
          {Math.round(scale * 100)}%
        </div>

        <button
          onClick={() =>
            setScale((prev) => Math.min(3, prev + 0.2))
          }
          className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow"
        >
          <ZoomIn />
        </button>

      </div>

      {/* ================= PDF ================= */}

      <div className="flex justify-center px-2 pb-10 overflow-auto">

        <Document
          file={pdfUrl}
          onLoadSuccess={onLoadSuccess}
          loading={
            <div className="text-center text-2xl py-10">
              Loading PDF...
            </div>
          }
          error={
            <div className="text-center text-red-600 text-xl py-10">
              Failed to load PDF.
            </div>
          }
        >
          {Array.from(
            new Array(numPages),
            (_, index) => (
              <div
                key={index}
                className="mb-6 flex justify-center"
              >
                <Page
                  pageNumber={index + 1}
                  scale={scale}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </div>
            )
          )}
        </Document>

      </div>

      {/* ================= FOOTER ================= */}

      <div className="text-center pb-8 text-gray-600 dark:text-gray-400 font-semibold">
        Total Pages : {numPages}
      </div>

    </div>
  );
}

export default PDFViewer;
