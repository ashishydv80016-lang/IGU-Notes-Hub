import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Features from "../components/Features";
import api from "../services/api";
import Hero from "../components/Hero";

function Home() {
  const [materials, setMaterials] = useState([]);
  const [topMaterials, setTopMaterials] = useState([]);

  useEffect(() => {
    fetchMaterials();
    fetchTopMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const res = await api.get("/materials");
      setMaterials(res.data.materials);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTopMaterials = async () => {
    try {
      const res = await api.get("/materials/top");
      setTopMaterials(res.data.materials);
    } catch (error) {
      console.log(error);
    }
  };

  const latestNotes = materials
    .filter((item) => item.type === "Notes")
    .slice(0, 3);

  const latestPapers = materials
    .filter(
      (item) =>
        item.type === "Previous Paper" ||
        item.type === "PYQ"
    )
    .slice(0, 3);

  return (
    <>
      <Navbar />

 <Hero />

      {/* Statistics */}

      <section className="max-w-7xl mx-auto py-14 px-6">

        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-blue-600 text-white rounded-xl p-8 text-center shadow-lg">

            <h2 className="text-4xl font-bold">
              {materials.length}
            </h2>

            <p className="mt-2">
              Total Materials
            </p>

          </div>

          <div className="bg-green-600 text-white rounded-xl p-8 text-center shadow-lg">

            <h2 className="text-4xl font-bold">
              100+
            </h2>

            <p className="mt-2">
              Students
            </p>

          </div>

          <div className="bg-orange-600 text-white rounded-xl p-8 text-center shadow-lg">

            <h2 className="text-4xl font-bold">
              10+
            </h2>

            <p className="mt-2">
              Branches
            </p>

          </div>

          <div className="bg-purple-600 text-white rounded-xl p-8 text-center shadow-lg">

            <h2 className="text-4xl font-bold">
              24×7
            </h2>

            <p className="mt-2">
              Available
            </p>

          </div>

        </div>

      </section>

      {/* Latest Notes */}

      <section className="max-w-7xl mx-auto px-6 py-10">

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-4xl font-bold">
            📚 Latest Notes
          </h2>

          <Link
            to="/notes"
            className="text-blue-600 font-bold hover:underline"
          >
            View All →
          </Link>

        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {latestNotes.map((item) => (

            <div
              key={item._id}
              className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition"
            >

              <h3 className="text-2xl font-bold">
                {item.title}
              </h3>

              <p className="mt-3">
                <b>📚 Subject:</b> {item.subject}
              </p>

              <p>
                <b>🎓 Semester:</b> {item.semester}
              </p>

              <p>
                <b>🏫 Branch:</b> {item.branch}
              </p>

              <Link
                to={`/materials/${item._id}`}
                className="inline-block mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg"
              >
                View Details
              </Link>

            </div>

          ))}

        </div>

      </section>

      {/* Previous Year Papers */}

      <section className="max-w-7xl mx-auto px-6 py-10">

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-4xl font-bold">
            📝 Previous Year Papers
          </h2>

          <Link
            to="/previous-papers"
            className="text-blue-600 font-bold hover:underline"
          >
            View All →
          </Link>

        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {latestPapers.map((item) => (

            <div
              key={item._id}
              className="bg-yellow-50 border border-yellow-300 rounded-xl shadow-lg p-6 hover:shadow-xl transition"
            >

              <h3 className="text-2xl font-bold">
                {item.title}
              </h3>

              <p className="mt-3">
                <b>📚 Subject:</b> {item.subject}
              </p>

              <p>
                <b>🎓 Semester:</b> {item.semester}
              </p>

              <p>
                <b>🏫 Branch:</b> {item.branch}
              </p>

              <Link
                to={`/materials/${item._id}`}
                className="inline-block mt-5 bg-orange-600 text-white px-5 py-2 rounded-lg"
              >
                Open Paper
              </Link>

            </div>

          ))}

        </div>

      </section>

      {/* Top Downloaded */}

      <section className="max-w-7xl mx-auto px-6 py-10">

        <h2 className="text-4xl font-bold mb-8">
          🔥 Top Downloaded Materials
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {topMaterials.map((item) => (

            <div
              key={item._id}
              className="bg-red-50 border border-red-200 rounded-xl shadow-lg p-6 hover:shadow-xl transition"
            >

              <h3 className="text-2xl font-bold">
                {item.title}
              </h3>

              <p className="mt-3">
                📚 {item.subject}
              </p>

              <p>
                🎓 Semester {item.semester}
              </p>

              <p className="font-bold text-red-600 mt-3">
                📥 {item.downloads || 0} Downloads
              </p>

              <Link
                to={`/materials/${item._id}`}
                className="inline-block mt-5 bg-red-600 text-white px-5 py-2 rounded-lg"
              >
                Open
              </Link>

            </div>

          ))}

        </div>

      </section>

      <Features />

      <Footer />

    </>
  );
}

export default Home;