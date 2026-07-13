import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    // Remove stored data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="w-64 bg-blue-800 text-white min-h-screen flex flex-col">

      {/* Logo */}
      <div className="text-2xl font-bold text-center py-6 border-b border-blue-700">
        🎓 IGU Admin
      </div>

      {/* Navigation */}
      <nav className="flex flex-col mt-6 flex-1">

        <Link
          to="/admin"
          className="px-6 py-4 hover:bg-blue-700 transition"
        >
          📊 Dashboard
        </Link>

        <Link
          to="/admin/materials"
          className="px-6 py-4 hover:bg-blue-700 transition"
        >
          📄 Materials
        </Link>

        <Link
          to="/upload"
          className="px-6 py-4 hover:bg-blue-700 transition"
        >
          📤 Upload
        </Link>

        <Link
          to="/admin/users"
          className="px-6 py-4 hover:bg-blue-700 transition"
        >
          👥 Users
        </Link>

        <Link
          to="/admin/analytics"
          className="px-6 py-4 hover:bg-blue-700 transition"
        >
          📈 Analytics
        </Link>

      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-blue-700">

        <button
          onClick={logout}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition"
        >
          🚪 Logout
        </button>

      </div>

    </div>
  );
}

export default Sidebar;