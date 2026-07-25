import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function LatestNotes({
  filters = {
    search: "",
    branch: "",
    semester: "",
  },
}) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await api.get("/materials");

      const onlyNotes = res.data.materials.filter(
        (item) => item.type === "Notes"
      );

      setNotes(onlyNotes);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredNotes = notes.filter((note) => {
    const searchMatch =
      !filters.search ||
      note.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      note.subject.toLowerCase().includes(filters.search.toLowerCase());

    const branchMatch =
      !filters.branch || note.branch === filters.branch;

    const semesterMatch =
      !filters.semester ||
      String(note.semester) === String(filters.semester);

    return searchMatch && branchMatch && semesterMatch;
  });

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-4xl font-bold mb-8">
        📚 Latest Notes
      </h2>

      {loading ? (
        <div className="text-center text-xl py-10">
          Loading...
        </div>
      ) : filteredNotes.length === 0 ? (
        <div className="text-center text-red-600 text-xl">
          No Notes Found
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNotes.map((note) => (
            <div
              key={note._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
            >
              <div className="bg-blue-700 text-white p-5">
                <h3 className="text-xl font-bold">
                  {note.title}
                </h3>
              </div>

              <div className="p-5 space-y-2">
                <p>
                  <strong>Branch:</strong> {note.branch}
                </p>

                <p>
                  <strong>Semester:</strong> {note.semester}
                </p>

                <p>
                  <strong>Subject:</strong> {note.subject}
                </p>

                <p>
                  <strong>Type:</strong> {note.type}
                </p>

                <div className="flex gap-3 mt-6">

                  <Link
                    to={`/viewer/${note._id}`}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded-lg"
                  >
                    👁 View
                  </Link>

                  <a
                    href={note.fileUrl}
                    download
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white text-center py-2 rounded-lg"
                  >
                    ⬇ Download
                  </a>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default LatestNotes;
