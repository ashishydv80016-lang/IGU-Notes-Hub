const papers = [
  "Programming in C 2025",
  "Physics 2024",
  "Mathematics 2023",
];

function LatestPapers() {
  return (
    <div className="max-w-6xl mx-auto mt-20">

      <h2 className="text-3xl font-bold mb-8">
        Latest Previous Papers
      </h2>

      <div className="grid md:grid-cols-2 gap-5">

        {papers.map((paper) => (

          <div
            key={paper}
            className="border rounded-lg p-5"
          >
            <h3>{paper}</h3>

            <button className="bg-blue-700 text-white px-4 py-2 mt-3 rounded">
              View PDF
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default LatestPapers;