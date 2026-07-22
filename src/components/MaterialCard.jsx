import { Link } from "react-router-dom";
import { Eye, Download } from "lucide-react";

const MaterialCard = ({ material }) => {
  const pdfUrl = material.fileUrl || material.pdfUrl;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-2xl transition duration-300">

      {/* Title */}
      <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-4">
        {material.title}
      </h2>

      {/* Details */}
      <div className="space-y-2 text-gray-700 dark:text-gray-300">

        <p>
          <span className="font-semibold">Branch:</span>{" "}
          {material.branch}
        </p>

        <p>
          <span className="font-semibold">Semester:</span>{" "}
          {material.semester}
        </p>

        <p>
          <span className="font-semibold">Subject:</span>{" "}
          {material.subject}
        </p>

        <p>
          <span className="font-semibold">Type:</span>{" "}
          {material.type || material.category}
        </p>

      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-6">

        {/* View PDF */}
        <Link
          to={`/viewer/${material._id}`}
          className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl transition"
        >
          <Eye size={20} />
          View PDF
        </Link>

        {/* Download */}
        <a
          href={pdfUrl}
          target="_blank"
          rel="noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition"
        >
          <Download size={20} />
          Download
        </a>

      </div>
    </div>
  );
};

export default MaterialCard;