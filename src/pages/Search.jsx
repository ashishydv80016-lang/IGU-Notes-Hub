import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Search() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);

  const [branches, setBranches] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [types, setTypes] = useState([]);

  const [filters, setFilters] = useState({
    keyword: "",
    branch: "",
    semester: "",
    subject: "",
    type: "",
    sort: "newest",
  });

  // ---------------- Fetch Filter Options ----------------

  const fetchFilters = async () => {
    try {
      const res = await api.get("/filters");

      setBranches(res.data.branches || []);
      setSemesters(res.data.semesters || []);
      setSubjects(res.data.subjects || []);
      setTypes(res.data.types || []);
    } catch (err) {
      console.error(err);
    }
  };

  // ---------------- Search Materials ----------------

  const searchMaterials = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          params.append(key, value);
        }
      });

      const res = await api.get(`/search?${params.toString()}`);

      setMaterials(res.data.materials || []);
    } catch (err) {
      console.error(err);
      setMaterials([]);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- Load Initially ----------------

  useEffect(() => {
    fetchFilters();
    searchMaterials();
  }, []);

  // ---------------- Live Search ----------------

  useEffect(() => {
    const timer = setTimeout(() => {
      searchMaterials();
    }, 300);

    return () => clearTimeout(timer);
  }, [filters]);

  // ---------------- UI ----------------

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">
          🔍 Search Notes & Previous Papers
        </h1>

        {/* Filters */}

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-10">

          <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-1 gap-4">

            {/* Keyword */}

            <input
              type="text"
              placeholder="Search..."
              value={filters.keyword}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  keyword: e.target.value,
                })
              }
              className="border rounded-xl p-3"
            />

            {/* Branch */}

            <select
              value={filters.branch}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  branch: e.target.value,
                })
              }
              className="border rounded-xl p-3"
            >
              <option value="">All Branches</option>

              {branches.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>

            {/* Semester */}

            <select
              value={filters.semester}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  semester: e.target.value,
                })
              }
              className="border rounded-xl p-3"
            >
              <option value="">All Semesters</option>

              {semesters.map((semester) => (
                <option key={semester} value={semester}>
                  {semester}
                </option>
              ))}
            </select>

            {/* Subject */}

            <select
              value={filters.subject}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  subject: e.target.value,
                })
              }
              className="border rounded-xl p-3"
            >
              <option value="">All Subjects</option>

              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>

            {/* Type */}

            <select
              value={filters.type}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  type: e.target.value,
                })
              }
              className="border rounded-xl p-3"
            >
              <option value="">All Types</option>

              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            {/* Sort */}

            <select
              value={filters.sort}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  sort: e.target.value,
                })
              }
              className="border rounded-xl p-3"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="downloads">Most Downloaded</option>
              <option value="az">A → Z</option>
            </select>

          </div>

          {/* Bottom */}

          <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">

            <h2 className="font-semibold text-lg">
              📚 Showing {materials.length} Material
              {materials.length !== 1 ? "s" : ""}
            </h2>

            <button
              onClick={() =>
                setFilters({
                  keyword: "",
                  branch: "",
                  semester: "",
                  subject: "",
                  type: "",
                  sort: "newest",
                })
              }
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl"
            >
              Clear Filters
            </button>

          </div>

        </div>

        {/* Loading */}

        {loading ? (

          <div className="flex justify-center py-20">

            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>

          </div>

        ) : materials.length === 0 ? (

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-10 text-center">

            <h2 className="text-3xl font-bold">
              📂 No Materials Found
            </h2>

            <p className="mt-3 text-gray-500">
              Try another keyword or filter.
            </p>

          </div>

        ) : (

          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-8">

            {materials.map((item) => (

              <div
                key={item._id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition overflow-hidden"
              >

                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-5">

                  <h2 className="text-white text-xl font-bold">
                    {item.title}
                  </h2>

                </div>

                <div className="p-5 space-y-2">

                  <p>
                    <strong>📚 Subject:</strong> {item.subject}
                  </p>

                  <p>
                    <strong>🏫 Branch:</strong> {item.branch}
                  </p>

                  <p>
                    <strong>🎓 Semester:</strong> {item.semester}
                  </p>

                  <p>
                    <strong>📄 Type:</strong> {item.type}
                  </p>

                  <p>
                    <strong>📥 Downloads:</strong> {item.downloads || 0}
                  </p>

                  <div className="flex gap-3 mt-5">

                    <Link
                      to={`/viewer/${item._id}`}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl text-center"
                    >
                      📖 View
                    </Link>

                    <a
                      href={item.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl text-center"
                    >
                      📥 Download
                    </a>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Search;