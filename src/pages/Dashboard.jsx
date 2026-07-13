import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged out successfully!");

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-700 text-white shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-3xl font-bold">
            IGU Notes Hub
          </h1>

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-8">

        {/* Welcome Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-blue-700 mb-4">
            Welcome, {user?.name || "Student"} 👋
          </h2>

          <p className="text-lg mb-2">
            <strong>Email:</strong> {user?.email || "N/A"}
          </p>

          <p className="text-lg">
            <strong>Role:</strong> {user?.role || "Student"}
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Upload */}
          <div className="bg-white shadow-lg rounded-xl p-6 text-center">
            <div className="text-5xl mb-4">⬆️</div>

            <h3 className="text-xl font-bold mb-3">
              Upload Material
            </h3>

            <button
              onClick={() => navigate("/upload")}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
            >
              Upload
            </button>
          </div>

          {/* Notes */}
          <div className="bg-white shadow-lg rounded-xl p-6 text-center">
            <div className="text-5xl mb-4">📚</div>

            <h3 className="text-xl font-bold mb-3">
              Notes
            </h3>

            <button
              onClick={() => navigate("/notes")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              View
            </button>
          </div>

          {/* Previous Papers */}
          <div className="bg-white shadow-lg rounded-xl p-6 text-center">
            <div className="text-5xl mb-4">📄</div>

            <h3 className="text-xl font-bold mb-3">
              Previous Papers
            </h3>

            <button
              onClick={() => navigate("/papers")}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
            >
              View
            </button>
          </div>

          {/* Syllabus */}
          <div className="bg-white shadow-lg rounded-xl p-6 text-center">
            <div className="text-5xl mb-4">📖</div>

            <h3 className="text-xl font-bold mb-3">
              Syllabus
            </h3>

            <button
              onClick={() => navigate("/syllabus")}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg"
            >
              View
            </button>
          </div>

        </div>

        {/* Quick Stats */}
        <div className="mt-10 grid md:grid-cols-3 gap-6">

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <h3 className="text-xl font-bold text-blue-700">
              📚 Notes
            </h3>

            <p className="text-4xl mt-4 font-bold">
              0
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <h3 className="text-xl font-bold text-green-700">
              📄 Papers
            </h3>

            <p className="text-4xl mt-4 font-bold">
              0
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <h3 className="text-xl font-bold text-purple-700">
              ⬆️ Uploads
            </h3>

            <p className="text-4xl mt-4 font-bold">
              0
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;