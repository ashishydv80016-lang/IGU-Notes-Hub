import { useState, useEffect, useContext } from "react";
import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { darkMode, setDarkMode } =
    useContext(ThemeContext);

  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const loadUser = () => {
      const storedUser = JSON.parse(
        localStorage.getItem("user")
      );
      setUser(storedUser);
    };

    loadUser();

    window.addEventListener("storage", loadUser);

    return () => {
      window.removeEventListener(
        "storage",
        loadUser
      );
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

    alert("Logged Out Successfully");

    navigate("/login");
  };

  const navClass = (path) =>
    `transition duration-200 hover:text-yellow-300 ${
      location.pathname === path
        ? "text-yellow-300 font-bold"
        : ""
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-blue-700 dark:bg-gray-900 text-white shadow-lg">

      <div className="max-w-7xl mx-auto px-5">

        <div className="h-16 flex justify-between items-center">

          {/* Logo */}

          <Link
            to="/"
            className="text-2xl font-bold tracking-wide"
          >
            🎓 IGU Notes Hub
          </Link>

          {/* Desktop Menu */}

          <div className="hidden lg:flex items-center gap-5">

            <Link
              to="/"
              className={navClass("/")}
            >
              🏠 Home
            </Link>

            <Link
              to="/notes"
              className={navClass("/notes")}
            >
              📚 Notes
            </Link>

            <Link
              to="/previous-papers"
              className={navClass("/previous-papers")}
            >
              📝 Previous Papers
            </Link>

            {user && (
              <>
                <Link
                  to="/favorites"
                  className={navClass("/favorites")}
                >
                  ❤️ Favorites
                </Link>

                <Link
                  to="/downloads"
                  className={navClass("/downloads")}
                >
                  📥 Downloads
                </Link>

                <Link
                  to="/profile"
                  className={navClass("/profile")}
                >
                  👤 Profile
                </Link>
              </>
            )}

            {user?.role === "admin" && (
              <>
                <Link
                  to="/admin"
                  className={navClass("/admin")}
                >
                  📊 Dashboard
                </Link>

                <Link
                  to="/admin/users"
                  className={navClass("/admin/users")}
                >
                  👥 Users
                </Link>

                <Link
                  to="/admin/materials"
                  className={navClass("/admin/materials")}
                >
                  📄 Materials
                </Link>

                <Link
                  to="/admin/upload"
                  className={navClass("/admin/upload")}
                >
                  ⬆ Upload
                </Link>
              </>
            )}

            {/* Theme Button */}

            <button
              onClick={() =>
                setDarkMode(!darkMode)
              }
              className="bg-white text-black dark:bg-gray-700 dark:text-white px-3 py-2 rounded-lg hover:scale-105 transition"
            >
              {darkMode
                ? "☀ Light"
                : "🌙 Dark"}
            </button>

            {!user ? (
              <>
                <Link
                  to="/login"
                  className={navClass("/login")}
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <span className="font-semibold">
                  👋 {user.name}
                </span>

                <button
                  onClick={logoutHandler}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
                >
                  Logout
                </button>
              </>
            )}

          </div>

          {/* Mobile Button */}

          <button
            className="lg:hidden text-3xl"
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
          >
            {menuOpen ? "✖" : "☰"}
          </button>

        </div>

        {/* Mobile Menu */}

        {menuOpen && (

          <div className="lg:hidden flex flex-col gap-3 pb-5 border-t border-blue-500 pt-4">

            <Link
              to="/"
              className={navClass("/")}
            >
              🏠 Home
            </Link>

            <Link
              to="/notes"
              className={navClass("/notes")}
            >
              📚 Notes
            </Link>

            <Link
              to="/previous-papers"
              className={navClass("/previous-papers")}
            >
              📝 Previous Papers
            </Link>

            {user && (
              <>
                <Link
                  to="/favorites"
                  className={navClass("/favorites")}
                >
                  ❤️ Favorites
                </Link>

                <Link
                  to="/downloads"
                  className={navClass("/downloads")}
                >
                  📥 Downloads
                </Link>

                <Link
                  to="/profile"
                  className={navClass("/profile")}
                >
                  👤 Profile
                </Link>
              </>
            )}

            {user?.role === "admin" && (
              <>
                <Link
                  to="/admin"
                  className={navClass("/admin")}
                >
                  📊 Dashboard
                </Link>

                <Link
                  to="/admin/users"
                  className={navClass("/admin/users")}
                >
                  👥 Users
                </Link>

                <Link
                  to="/admin/materials"
                  className={navClass("/admin/materials")}
                >
                  📄 Materials
                </Link>

                <Link
                  to="/admin/upload"
                  className={navClass("/admin/upload")}
                >
                  ⬆ Upload Material
                </Link>
                <Link
  to="/syllabus"
  className={navClass("/syllabus")}
>
  📖 Syllabus
</Link>
              </>
            )}

            <button
              onClick={() =>
                setDarkMode(!darkMode)
              }
              className="bg-white text-black dark:bg-gray-700 dark:text-white py-2 rounded-lg"
            >
              {darkMode
                ? "☀ Light Mode"
                : "🌙 Dark Mode"}
            </button>

            {!user ? (
              <>
                <Link
                  to="/login"
                  className={navClass("/login")}
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className={navClass("/register")}
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={logoutHandler}
                className="bg-red-600 hover:bg-red-700 py-2 rounded-lg"
              >
                Logout
              </button>
            )}

          </div>

        )}

      </div>

    </nav>
  );
}

export default Navbar; 