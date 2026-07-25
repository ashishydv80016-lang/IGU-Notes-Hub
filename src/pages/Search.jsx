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
  });

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const { data } = await api.get("/filters");
        setBranches(data.branches || []);
        setSemesters(data.semesters || []);
        setSubjects(data.subjects || []);
        setTypes(data.types || []);
      } catch (error) {
        console.error("Unable to load search filters:", error);
      }
    };

    fetchFilters();
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const params = Object.fromEntries(
          Object.entries(filters).filter(([, value]) => value),
        );
        const { data } = await api.get("/search", { params });
        setMaterials(data.materials || []);
      } catch (error) {
        console.error("Unable to search materials:", error);
        setMaterials([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [filters]);

  const updateFilter = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-center text-4xl font-bold text-blue-700">
          Search Notes &amp; Previous Papers
        </h1>

        <div className="mb-8 rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
          <div className="grid gap-4 md:grid-cols-5">
            <input
              type="text"
              placeholder="Search..."
              value={filters.keyword}
              onChange={(event) => updateFilter("keyword", event.target.value)}
              className="rounded-lg border p-3"
            />
            <select value={filters.branch} onChange={(event) => updateFilter("branch", event.target.value)} className="rounded-lg border p-3">
              <option value="">All Branches</option>
              {branches.map((branch) => <option key={branch} value={branch}>{branch}</option>)}
            </select>
            <select value={filters.semester} onChange={(event) => updateFilter("semester", event.target.value)} className="rounded-lg border p-3">
              <option value="">All Semesters</option>
              {semesters.map((semester) => <option key={semester} value={semester}>{semester}</option>)}
            </select>
            <select value={filters.subject} onChange={(event) => updateFilter("subject", event.target.value)} className="rounded-lg border p-3">
              <option value="">All Subjects</option>
              {subjects.map((subject) => <option key={subject} value={subject}>{subject}</option>)}
            </select>
            <select value={filters.type} onChange={(event) => updateFilter("type", event.target.value)} className="rounded-lg border p-3">
              <option value="">All Types</option>
              {types.map((type) => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>
        </div>

        {loading ? (
          <h2 className="text-center text-xl font-semibold">Searching...</h2>
        ) : materials.length === 0 ? (
          <h2 className="text-center text-xl">No materials found.</h2>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {materials.map((item) => (
              <div key={item._id} className="rounded-xl bg-white p-6 shadow-lg transition hover:shadow-xl dark:bg-gray-800">
                <h2 className="text-2xl font-bold text-blue-700">{item.title}</h2>
                <p className="mt-3"><strong>Subject:</strong> {item.subject}</p>
                <p><strong>Branch:</strong> {item.branch}</p>
                <p><strong>Semester:</strong> {item.semester}</p>
                <p><strong>Type:</strong> {item.type}</p>
                <div className="mt-5 flex gap-3">
                  <Link to={`/viewer/${item._id}`} className="rounded-lg bg-blue-600 px-4 py-2 text-white">View</Link>
                  <a href={item.fileUrl} target="_blank" rel="noreferrer" className="rounded-lg bg-green-600 px-4 py-2 text-white">Download</a>
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
