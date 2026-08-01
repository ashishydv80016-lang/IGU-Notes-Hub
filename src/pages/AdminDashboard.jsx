import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
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
const [topDownloads, setTopDownloads] = useState([]);
const [latestUsers, setLatestUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/admin/dashboard");

      setStats(res.data.stats);
setRecentMaterials(res.data.recentMaterials || []);
setTopDownloads(res.data.topDownloads || []);
setLatestUsers(res.data.latestUsers || []);
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

        {/* Quick Actions */}

<div className="grid md:grid-cols-4 gap-6 mb-10">

  <Link
    to="/admin/upload"
    className="bg-blue-600 text-white rounded-xl p-6 text-center shadow-lg hover:bg-blue-700 transition"
  >
    <div className="text-4xl mb-3">📤</div>
    <h2 className="text-xl font-bold">
      Upload Material
    </h2>
  </Link>

  <Link
    to="/admin/materials"
    className="bg-green-600 text-white rounded-xl p-6 text-center shadow-lg hover:bg-green-700 transition"
  >
    <div className="text-4xl mb-3">📚</div>
    <h2 className="text-xl font-bold">
      Manage Materials
    </h2>
  </Link>

  <Link
    to="/admin/users"
    className="bg-purple-600 text-white rounded-xl p-6 text-center shadow-lg hover:bg-purple-700 transition"
  >
    <div className="text-4xl mb-3">👥</div>
    <h2 className="text-xl font-bold">
      Manage Users
    </h2>
  </Link>

  <Link
    to="/search"
    className="bg-orange-600 text-white rounded-xl p-6 text-center shadow-lg hover:bg-orange-700 transition"
  >
    <div className="text-4xl mb-3">🔍</div>
    <h2 className="text-xl font-bold">
      Search Materials
    </h2>
  </Link>

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

                {/* Quick Actions */}

        <div className="grid md:grid-cols-4 gap-6 mb-10">

          <a
            href="/admin/upload"
            className="bg-blue-600 text-white rounded-xl p-6 text-center shadow-lg hover:scale-105 transition"
          >
            <div className="text-5xl mb-3">📤</div>

            <h2 className="text-xl font-bold">
              Upload Material
            </h2>

            <p className="mt-2 text-blue-100">
              Add new notes & papers
            </p>
          </a>

          <a
            href="/admin/materials"
            className="bg-green-600 text-white rounded-xl p-6 text-center shadow-lg hover:scale-105 transition"
          >
            <div className="text-5xl mb-3">📚</div>

            <h2 className="text-xl font-bold">
              Manage Materials
            </h2>

            <p className="mt-2 text-green-100">
              Edit or delete materials
            </p>
          </a>

          <a
            href="/admin/users"
            className="bg-purple-600 text-white rounded-xl p-6 text-center shadow-lg hover:scale-105 transition"
          >
            <div className="text-5xl mb-3">👥</div>

            <h2 className="text-xl font-bold">
              Manage Users
            </h2>

            <p className="mt-2 text-purple-100">
              View registered users
            </p>
          </a>

          <a
            href="/"
            className="bg-orange-600 text-white rounded-xl p-6 text-center shadow-lg hover:scale-105 transition"
          >
            <div className="text-5xl mb-3">🏠</div>

            <h2 className="text-xl font-bold">
              Visit Website
            </h2>

            <p className="mt-2 text-orange-100">
              Open IGU Notes Hub
            </p>
          </a>

        </div>

        {/* System Status */}

<div className="grid lg:grid-cols-2 gap-8 mb-10">

  <div className="bg-white rounded-xl shadow-lg p-6">

    <h2 className="text-2xl font-bold mb-6">
      🖥️ System Status
    </h2>

    <div className="space-y-5">

      <div className="flex justify-between items-center">

        <span>Backend Server</span>

        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
          ✅ Online
        </span>

      </div>

      <div className="flex justify-between items-center">

        <span>Database</span>

        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
          ✅ Connected
        </span>

      </div>

      <div className="flex justify-between items-center">

        <span>Cloudinary</span>

        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
          ✅ Active
        </span>

      </div>

      <div className="flex justify-between items-center">

        <span>Search API</span>

        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
          ✅ Running
        </span>

      </div>

    </div>

  </div>

  <div className="bg-white rounded-xl shadow-lg p-6">

    <h2 className="text-2xl font-bold mb-6">
      📌 Dashboard Summary
    </h2>

    <div className="space-y-4 text-lg">

      <p>
        👥 Registered Users :
        <strong> {stats.totalUsers}</strong>
      </p>

      <p>
        📚 Uploaded Materials :
        <strong> {stats.totalMaterials}</strong>
      </p>

      <p>
        ❤️ Favorites :
        <strong> {stats.totalFavorites}</strong>
      </p>

      <p>
        📥 Downloads :
        <strong> {stats.totalDownloads}</strong>
      </p>

    </div>

  </div>

</div>

{/* Recent Activity */}

<div className="bg-white rounded-xl shadow-lg p-6 mb-10">

  <h2 className="text-2xl font-bold mb-6">
    🕒 Recent Activity
  </h2>

  <div className="space-y-4">

    <div className="flex justify-between border-b pb-3">
      <span>📚 New material uploaded</span>
      <span className="text-gray-500">Just now</span>
    </div>

    <div className="flex justify-between border-b pb-3">
      <span>📥 Material downloaded</span>
      <span className="text-gray-500">5 min ago</span>
    </div>

    <div className="flex justify-between border-b pb-3">
      <span>👤 New user registered</span>
      <span className="text-gray-500">15 min ago</span>
    </div>

    <div className="flex justify-between border-b pb-3">
      <span>❤️ Material added to favorites</span>
      <span className="text-gray-500">30 min ago</span>
    </div>

    <div className="flex justify-between">
      <span>📄 Previous paper uploaded</span>
      <span className="text-gray-500">1 hour ago</span>
    </div>

  </div>

</div>

{/* Top Downloaded Materials */}

<div className="bg-white rounded-xl shadow-lg p-6 mb-10">

  <h2 className="text-2xl font-bold mb-6">
    🔥 Top Downloaded Materials
  </h2>

  {topDownloads.length === 0 ? (

    <p className="text-gray-500">
      No download data available.
    </p>

  ) : (

    <div className="overflow-x-auto">

      <table className="w-full">

        <thead>

          <tr className="bg-gray-100">

            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-center">Downloads</th>

          </tr>

        </thead>

        <tbody>

          {topDownloads.map((item) => (

            <tr
              key={item._id}
              className="border-b hover:bg-gray-50"
            >

              <td className="p-3">
                {item.title}
              </td>

              <td className="p-3 text-center font-bold text-blue-600">
                {item.downloads}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )}

</div>

{/* Latest Registered Users */}

<div className="bg-white rounded-xl shadow-lg p-6 mb-10">

  <h2 className="text-2xl font-bold mb-6">
    👥 Latest Registered Users
  </h2>

  {latestUsers.length === 0 ? (

    <p className="text-gray-500">
      No users found.
    </p>

  ) : (

    <div className="overflow-x-auto">

      <table className="w-full">

        <thead>

          <tr className="bg-gray-100">

            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-center">Role</th>

          </tr>

        </thead>

        <tbody>

          {latestUsers.map((user) => (

            <tr
              key={user._id}
              className="border-b hover:bg-gray-50"
            >

              <td className="p-3">{user.name}</td>

              <td className="p-3">{user.email}</td>

              <td className="p-3 text-center">
                {user.role}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )}

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