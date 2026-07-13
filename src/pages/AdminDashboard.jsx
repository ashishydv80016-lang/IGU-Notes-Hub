import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalMaterials: 0,
    totalFavorites: 0,
    totalDownloads: 0,
  });

  const [recentMaterials, setRecentMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/admin/dashboard");

      setStats(res.data.stats);
      setRecentMaterials(res.data.recentMaterials);
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to load dashboard"
      );
    } finally {
      setLoading(false);
    }
  };

  const chartData = [
    {
      name: "Users",
      total: stats.totalUsers,
    },
    {
      name: "Notes",
      total: stats.totalMaterials,
    },
    {
      name: "Favorites",
      total: stats.totalFavorites,
    },
    {
      name: "Downloads",
      total: stats.totalDownloads,
    },
  ];

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="flex justify-center items-center h-[70vh]">
          <h1 className="text-3xl font-bold">
            Loading Dashboard...
          </h1>
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-5 py-10">

        <h1 className="text-4xl font-bold mb-10 text-center">
          📊 Admin Dashboard
        </h1>

        {/* Statistics */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

          <div className="bg-blue-600 text-white rounded-xl shadow-lg p-6 hover:scale-105 duration-300">

            <h2 className="text-lg">
              👥 Total Users
            </h2>

            <p className="text-5xl font-bold mt-3">
              {stats.totalUsers}
            </p>

          </div>

          <div className="bg-green-600 text-white rounded-xl shadow-lg p-6 hover:scale-105 duration-300">

            <h2 className="text-lg">
              📚 Total Notes
            </h2>

            <p className="text-5xl font-bold mt-3">
              {stats.totalMaterials}
            </p>

          </div>

          <div className="bg-pink-600 text-white rounded-xl shadow-lg p-6 hover:scale-105 duration-300">

            <h2 className="text-lg">
              ❤️ Favorites
            </h2>

            <p className="text-5xl font-bold mt-3">
              {stats.totalFavorites}
            </p>

          </div>

          <div className="bg-orange-600 text-white rounded-xl shadow-lg p-6 hover:scale-105 duration-300">

            <h2 className="text-lg">
              📥 Downloads
            </h2>

            <p className="text-5xl font-bold mt-3">
              {stats.totalDownloads}
            </p>

          </div>

        </div>

        {/* Analytics Chart */}

        <div className="bg-white rounded-xl shadow-lg p-6 mb-10">

          <h2 className="text-3xl font-bold mb-6">
            📈 Portal Analytics
          </h2>

          <ResponsiveContainer
            width="100%"
            height={350}
          >
            <BarChart data={chartData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="total"
                fill="#2563eb"
                radius={[8, 8, 0, 0]}
              />

            </BarChart>
          </ResponsiveContainer>

        </div>

        {/* Recent Uploads */}

        <div className="bg-white rounded-xl shadow-lg p-6">

          <h2 className="text-3xl font-bold mb-6">
            📄 Recent Uploads
          </h2>

          {recentMaterials.length === 0 ? (

            <div className="text-center py-10">

              <h2 className="text-xl text-gray-500">
                No materials uploaded yet.
              </h2>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full border-collapse">

                <thead>

                  <tr className="bg-gray-200">

                    <th className="border p-3">Title</th>

                    <th className="border p-3">Branch</th>

                    <th className="border p-3">Semester</th>

                    <th className="border p-3">Subject</th>

                    <th className="border p-3">Type</th>

                  </tr>

                </thead>

                <tbody>

                  {recentMaterials.map((item) => (

                    <tr
                      key={item._id}
                      className="hover:bg-gray-100"
                    >

                      <td className="border p-3">
                        {item.title}
                      </td>

                      <td className="border p-3">
                        {item.branch}
                      </td>

                      <td className="border p-3">
                        {item.semester}
                      </td>

                      <td className="border p-3">
                        {item.subject}
                      </td>

                      <td className="border p-3">
                        {item.type}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

      <Footer />
    </>
  );
}

export default AdminDashboard;