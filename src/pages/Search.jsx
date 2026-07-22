import { useState } from "react";

function Search() {

  const [search, setSearch] = useState("");

  const materials = [
    {
      title: "Data Structures Notes",
      branch: "CSE",
      semester: "1st Semester"
    },
    {
      title: "Engineering Mathematics Paper",
      branch: "CSE",
      semester: "1st Semester"
    },
    {
      title: "Thermodynamics Notes",
      branch: "Mechanical",
      semester: "2nd Semester"
    },
    {
      title: "Electrical Engineering Notes",
      branch: "Electrical",
      semester: "1st Semester"
    }
  ];


  const filteredMaterials = materials.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.branch.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">

      <h1 className="text-4xl font-bold text-center text-blue-700">
        Search Notes & Papers
      </h1>


      <div className="flex justify-center mt-8">

        <input
          type="text"
          placeholder="Search by subject or branch..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 border p-3 rounded-lg shadow"
        />

      </div>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

        {filteredMaterials.length > 0 ? (

          filteredMaterials.map((item, index) => (

            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl"
            >

              <h2 className="text-xl font-bold text-blue-700">
                📚 {item.title}
              </h2>

              <p className="mt-3 text-gray-600">
                Branch: {item.branch}
              </p>

              <p className="text-gray-600">
                Semester: {item.semester}
              </p>


              <button className="mt-4 bg-blue-600 text-white px-5 py-2 rounded">
                View Material
              </button>

            </div>

          ))

        ) : (

          <p className="text-center text-gray-500 col-span-3">
            No materials found
          </p>

        )}

      </div>

    </div>
  );
}

export default Search;