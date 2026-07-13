import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  useEffect(() => {
    const data = favorites.filter(
      (item) =>
        item.material &&
        (
          item.material.title.toLowerCase().includes(search.toLowerCase()) ||
          item.material.subject.toLowerCase().includes(search.toLowerCase()) ||
          item.material.branch.toLowerCase().includes(search.toLowerCase())
        )
    );

    setFiltered(data);
  }, [favorites, search]);

  const fetchFavorites = async () => {
    try {
      const res = await api.get("/favorites");

      setFavorites(res.data.favorites || []);
      setFiltered(res.data.favorites || []);
    } catch (error) {
      console.error(error);
      toast.error("Unable to load favorites");
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (id) => {
    try {
      await api.delete(`/favorites/${id}`);

      const updated = favorites.filter(
        (item) => item.material?._id !== id
      );

      setFavorites(updated);
      setFiltered(updated);

      toast.success("Removed from Favorites");
    } catch (error) {
      console.error(error);
      toast.error("Unable to remove favorite");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="min-h-[70vh] flex flex-col justify-center items-center">

          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>

          <p className="mt-5 text-xl font-semibold">
            Loading Favorites...
          </p>

        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-5 py-10">

        <div className="flex flex-col lg:flex-row justify-between items-center gap-5 mb-8">

          <div>

            <h1 className="text-4xl font-bold">
              ❤️ My Favorites
            </h1>

            <p className="text-gray-500 mt-2">
              {filtered.length} Materials Saved
            </p>

          </div>

          <input
            type="text"
            placeholder="Search favorites..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-xl p-3 w-full lg:w-96"
          />

        </div>

        {filtered.length === 0 ? (

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 text-center">

            <div className="text-7xl mb-4">
              ❤️
            </div>

            <h2 className="text-3xl font-bold">
              No Favorites Yet
            </h2>

            <p className="text-gray-500 mt-4">
              Save your favourite notes to access them quickly.
            </p>

            <Link
              to="/notes"
              className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
            >
              Browse Notes
            </Link>

          </div>

        ) : (

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">

            {filtered.map((item) => (

              <div
                key={item._id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition overflow-hidden"
              >

                <div className="bg-pink-600 text-white p-5">

                  <h2 className="text-2xl font-bold">
                    {item.material?.title}
                  </h2>

                </div>

                <div className="p-6 space-y-3">

                  <p>
                    📚 <strong>Branch:</strong> {item.material?.branch}
                  </p>

                  <p>
                    🎓 <strong>Semester:</strong> {item.material?.semester}
                  </p>

                  <p>
                    📖 <strong>Subject:</strong> {item.material?.subject}
                  </p>

                  <p>
                    📄 <strong>Type:</strong> {item.material?.type}
                  </p>

                  <div className="grid grid-cols-2 gap-3 mt-5">

                    <Link
                      to={`/material/${item.material?._id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-center"
                    >
                      View
                    </Link>

                    <a
                      href={item.material?.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-center"
                    >
                      Download
                    </a>

                    <button
                      onClick={() => removeFavorite(item.material?._id)}
                      className="col-span-2 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
                    >
                      Remove Favorite
                    </button>

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

export default Favorites;