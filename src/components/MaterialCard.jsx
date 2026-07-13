import React from "react";

const MaterialCard = ({ material }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white">
      <h2 className="text-xl font-bold">{material.title}</h2>

      <p><strong>Branch:</strong> {material.branch}</p>
      <p><strong>Semester:</strong> {material.semester}</p>
      <p><strong>Subject:</strong> {material.subject}</p>
      <p><strong>Type:</strong> {material.type || material.category}</p>

      <a
        href={material.fileUrl || material.pdfUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-block mt-3 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Download PDF
      </a>
    </div>
  );
};

export default MaterialCard;