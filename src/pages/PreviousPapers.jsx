import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";
import FavoriteButton from "../components/FavoriteButton";

function PreviousPapers() {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");

  useEffect(() => {
    fetchPapers();
  }, []);

  const fetchPapers = async () => {
    try {
      const res = await api.get("/materials");

      const onlyPapers = res.data.materials.filter(
        (item) =>
          item.type === "Previous Paper" ||
          item.type === "PYQ"
      );

      setPapers(onlyPapers);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const branches = [...new Set(papers.map((m) => m.branch))];
  const semesters = [...new Set(papers.map((m) => m.semester))];
  const subjects = [...new Set(papers.map((m) => m.subject))];

  const filtered = useMemo(() => {
    return papers.filter((item) => {
      const matchSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.subject.toLowerCase().includes(search.toLowerCase()) ||
        item.branch.toLowerCase().includes(search.toLowerCase());

      const matchBranch =
        branch === "" || item.branch === branch;

      const matchSemester =
        semester === "" || item.semester === semester;

      const matchSubject =
        subject === "" || item.subject === subject;

      return (
        matchSearch &&
        matchBranch &&
        matchSemester &&
        matchSubject
      );
    });
  }, [papers, search, branch, semester, subject]);

  const clearFilters = () => {
    setSearch("");
    setBranch("");
    setSemester("");
    setSubject("");
  };

  return (
    <>
      <Navbar />

      <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">

        <div className="max-w-7xl mx-auto px-6 text-center">

          <h1 className="text-5xl font-bold">
            📝 Previous Year Papers
          </h1>

          <p className="text-xl mt-4">
            Download Previous Year Question Papers
            for all IGU branches and semesters.
          </p>

        </div>

      </section>

      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="bg-white shadow-xl rounded-2xl p-6 mb-8">

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">

            <input
              type="text"
              placeholder="Search title, subject or branch..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-lg p-3"
            />

            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="border rounded-lg p-3"
            >
              <option value="">All Branches</option>

              {branches.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>

            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="border rounded-lg p-3"
            >
              <option value="">All Semesters</option>

              {semesters.map((s) => (
                <option key={s} value={s}>
                  Semester {s}
                </option>
              ))}
            </select>

            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="border rounded-lg p-3"
            >
              <option value="">All Subjects</option>

              {subjects.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

          </div>

          <div className="flex justify-between items-center flex-wrap mt-6">

            <h2 className="text-lg font-semibold">
              Showing {filtered.length} Previous Papers
            </h2>

            <button
              onClick={clearFilters}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
            >
              Clear Filters
            </button>

          </div>

        </div>
                {loading ? (

          <div className="text-center py-20">

            <h2 className="text-3xl font-bold">
              Loading...
            </h2>

          </div>

        ) : filtered.length === 0 ? (

          <div className="text-center py-20">

            <h2 className="text-3xl font-bold text-gray-500">
              😔 No Previous Papers Found
            </h2>

            <p className="mt-3 text-gray-600">
              Try changing your search or filters.
            </p>

          </div>

        ) : (

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">

            {filtered.map((paper) => (

              <div
                key={paper._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition overflow-hidden"
              >

                <div className="bg-orange-600 text-white text-center p-6">

                  <div className="text-5xl">
                    📝
                  </div>

                  <h2 className="text-2xl font-bold mt-3">
                    {paper.title}
                  </h2>

                </div>

                <div className="p-6 space-y-3">

                  <p>
                    <strong>📖 Subject:</strong>{" "}
                    {paper.subject}
                  </p>

                  <p>
                    <strong>🏫 Branch:</strong>{" "}
                    {paper.branch}
                  </p>

                  <p>
                    <strong>🎓 Semester:</strong>{" "}
                    {paper.semester}
                  </p>

                  <p>
                    <strong>📄 Type:</strong>{" "}
                    {paper.type}
                  </p>

                  <div className="grid grid-cols-2 gap-3 pt-4">

  <Link
    to={`/viewer/${paper._id}`}
    className="bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded-lg transition"
  >
    👁 View PDF
  </Link>

  <Link
    to={`/materials/${paper._id}`}
    className="bg-green-600 hover:bg-green-700 text-white text-center py-2 rounded-lg transition"
  >
    📄 Details
  </Link>

</div>

<div className="mt-4">
  <FavoriteButton materialId={paper._id} />
</div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

      <Footer />
    </>
  );
}

export default PreviousPapers;
