import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Download,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

import api from "../services/api";

// PDF Worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

function PDFViewer() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [pdfUrl, setPdfUrl] = useState("");
  const [title, setTitle] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.2);

  useEffect(() => {
    const fetchMaterial = async () => {
      try {
        let material;

        try {
          const { data } = await api.get(`/materials/${id}`);
          material = data.material;
        } catch {
          const { data } = await api.get("/materials");
          material = data.materials.find((item) => item._id === id);
        }

        if (!material) {
          setError("Material not found");
          return;
        }

        setTitle(material.title);
        setPdfUrl(material.fileUrl || material.pdfUrl);
      } catch (err) {
        console.error(err);
        setError("Unable to load PDF");
      } finally {
        setLoading(false);
      }
    };

    fetchMaterial();
  }, [id]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const nextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber((prev) => prev + 1);
    }
  };

  const previousPage = () => {
    if (pageNumber > 1) {
      setPageNumber((prev) => prev - 1);
    }
  };

  const zoomIn = () => {
    setScale((prev) => prev + 0.2);
  };

  const zoomOut = () => {
    if (scale > 0.6) {
      setScale((prev) => prev - 0.2);
    }
  };

  if (loading) {
    console.log("PDF URL:", pdfUrl);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Loading PDF...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-red-600">
          {error}
        </h1>

        <button
          onClick={() => navigate(-1)}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }
    return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">

      {/* Header */}

      <div className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-lg">

        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 px-4 py-4">

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 px-4 py-2 rounded-lg transition"
          >
            <ArrowLeft size={20} />
            Back
          </button>

          <h2 className="flex-1 text-center text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
            {title}
          </h2>

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

      {/* Zoom Controls */}

      <div className="flex justify-center items-center gap-4 py-5">

        <button
          onClick={zoomOut}
          className="bg-gray-700 hover:bg-gray-800 text-white p-3 rounded-full"
        >
          <ZoomOut size={20} />
        </button>

        <span className="font-bold text-lg dark:text-white">
          {(scale * 100).toFixed(0)}%
        </span>

        <button
          onClick={zoomIn}
          className="bg-gray-700 hover:bg-gray-800 text-white p-3 rounded-full"
        >
          <ZoomIn size={20} />
        </button>

      </div>

      {/* PDF */}

      <div className="flex justify-center px-3">

        <div className="bg-white rounded-xl shadow-xl p-4 overflow-auto">

          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <h2 className="text-xl font-bold text-center">
                Loading PDF...
              </h2>
            }
            error={
              <h2 className="text-red-600 font-bold text-center">
                Unable to load PDF
              </h2>
            }
          >

            <Page
              pageNumber={pageNumber}
              scale={scale}
              renderAnnotationLayer={true}
              renderTextLayer={true}
            />

          </Document>

        </div>

      </div>
            {/* Navigation */}

      <div className="flex flex-wrap justify-center items-center gap-5 py-8">

        <button
          onClick={previousPage}
          disabled={pageNumber <= 1}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-5 py-2 rounded-lg transition"
        >
          <ChevronLeft size={20} />
          Previous
        </button>

        <div className="text-lg font-bold dark:text-white">
          Page {pageNumber} of {numPages || 0}
        </div>

        <button
          onClick={nextPage}
          disabled={pageNumber >= numPages}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-5 py-2 rounded-lg transition"
        >
          Next
          <ChevronRight size={20} />
        </button>

      </div>

    </div>
  );
}

export default PDFViewer;