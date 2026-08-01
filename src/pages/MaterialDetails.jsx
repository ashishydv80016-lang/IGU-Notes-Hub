import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Download,
  Eye,
  Share2,
  Calendar,
  BookOpen,
  GraduationCap,
  Building2,
  FileText,
  ArrowLeft,
  BarChart3,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FavoriteButton from "../components/FavoriteButton";
import DownloadButton from "../components/DownloadButton";
import api from "../services/api";

function MaterialDetails() {
  const { id } = useParams();

  const [material, setMaterial] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMaterial();
  }, []);

  const fetchMaterial = async () => {
    try {
      const res = await api.get("/materials");

      const found = res.data.materials.find(
        (item) => item._id === id
      );

      setMaterial(found);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const shareMaterial = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: material.title,
          text: "Check this study material",
          url,
        });
      } catch (err) {}
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen flex justify-center items-center">

          <div className="text-center">

            <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-blue-600 mx-auto"></div>

            <p className="mt-5 text-xl font-semibold">
              Loading Material...
            </p>

          </div>

        </div>

        <Footer />
      </>
    );
  }

  if (!material) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen flex justify-center items-center">

          <div className="text-center">

            <h1 className="text-4xl font-bold text-red-600">
              Material Not Found
            </h1>

            <p className="mt-3 text-gray-500">
              The requested material does not exist.
            </p>

            <Link
              to="/"
              className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl"
            >
              Go Home
            </Link>

          </div>

        </div>

        <Footer />
      </>
    );
  }

   return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10">

        <div className="max-w-7xl mx-auto px-5">

          {/* Back Button */}

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold mb-6"
          >
            <ArrowLeft size={20} />
            Back
          </Link>

          {/* Hero Card */}

          <div className="rounded-3xl overflow-hidden shadow-2xl">

            <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 p-10 text-white">

              <h1 className="text-4xl md:text-5xl font-extrabold">
                {material.title}
              </h1>

              <p className="mt-3 text-lg text-blue-100">
                IGU Notes Hub • Premium Study Material
              </p>

            </div>

            <div className="bg-white dark:bg-gray-800 p-8">

              <div className="grid lg:grid-cols-3 gap-8">

                {/* LEFT */}

                <div className="lg:col-span-2">

                  <h2 className="text-3xl font-bold mb-6">
                    📄 Material Information
                  </h2>

                  <div className="grid md:grid-cols-2 gap-5">

                    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-5">
                      <div className="flex items-center gap-3">
                        <Building2 className="text-blue-600" />
                        <div>
                          <p className="text-gray-500 text-sm">
                            Branch
                          </p>
                          <p className="font-bold">
                            {material.branch}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-5">
                      <div className="flex items-center gap-3">
                        <GraduationCap className="text-green-600" />
                        <div>
                          <p className="text-gray-500 text-sm">
                            Semester
                          </p>
                          <p className="font-bold">
                            {material.semester}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-5">
                      <div className="flex items-center gap-3">
                        <BookOpen className="text-orange-600" />
                        <div>
                          <p className="text-gray-500 text-sm">
                            Subject
                          </p>
                          <p className="font-bold">
                            {material.subject}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-5">
                      <div className="flex items-center gap-3">
                        <FileText className="text-purple-600" />
                        <div>
                          <p className="text-gray-500 text-sm">
                            Type
                          </p>
                          <p className="font-bold">
                            {material.type}
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Statistics */}

                  <div className="grid md:grid-cols-2 gap-5 mt-8">

                    <div className="bg-blue-50 rounded-xl p-5">

                      <div className="flex items-center gap-3">

                        <BarChart3 className="text-blue-600" />

                        <div>

                          <p className="text-gray-500 text-sm">
                            Downloads
                          </p>

                          <p className="text-2xl font-bold">
                            {material.downloads || 0}
                          </p>

                        </div>

                      </div>

                    </div>

                    <div className="bg-green-50 rounded-xl p-5">

                      <div className="flex items-center gap-3">

                        <Calendar className="text-green-600" />

                        <div>

                          <p className="text-gray-500 text-sm">
                            Uploaded
                          </p>

                          <p className="font-bold">
                            {material.createdAt
                              ? new Date(
                                  material.createdAt
                                ).toLocaleDateString()
                              : "Recently"}
                          </p>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

                {/* RIGHT */}

                <div>

                  <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 shadow">

                    <h2 className="text-2xl font-bold mb-6">
                      ⚡ Quick Actions
                    </h2>
                                        <Link
                      to={`/viewer/${material._id}`}
                      className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition mb-4"
                    >
                      <Eye size={20} />
                      Read Online
                    </Link>

                    <div className="mb-4">
                      <DownloadButton material={material} />
                    </div>

                    <div className="mb-4">
                      <FavoriteButton materialId={material._id} />
                    </div>

                    <button
                      onClick={shareMaterial}
                      className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl transition"
                    >
                      <Share2 size={20} />
                      Share Material
                    </button>

                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow mt-6 p-6">

                    <h3 className="text-xl font-bold mb-4">
                      📌 Material Summary
                    </h3>

                    <div className="space-y-3 text-gray-700 dark:text-gray-300">

                      <p>
                        <strong>Title:</strong> {material.title}
                      </p>

                      <p>
                        <strong>Subject:</strong> {material.subject}
                      </p>

                      <p>
                        <strong>Branch:</strong> {material.branch}
                      </p>

                      <p>
                        <strong>Semester:</strong> {material.semester}
                      </p>

                      <p>
                        <strong>Category:</strong> {material.type}
                      </p>

                      <p>
                        <strong>Downloads:</strong>{" "}
                        {material.downloads || 0}
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default MaterialDetails;