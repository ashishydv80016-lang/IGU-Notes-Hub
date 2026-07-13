import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function NotFound() {
  return (
    <>
      <Navbar />

      <div className="min-h-[80vh] flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-6">

        <div className="text-center">

          <div className="text-8xl mb-6">
            😕
          </div>

          <h1 className="text-7xl font-extrabold text-blue-700">
            404
          </h1>

          <h2 className="text-3xl font-bold mt-6">
            Page Not Found
          </h2>

          <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-xl mx-auto">
            Sorry, the page you are looking for doesn't exist
            or has been moved.
          </p>

          <div className="mt-10 flex justify-center gap-4 flex-wrap">

            <Link
              to="/"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
            >
              🏠 Go Home
            </Link>

            <Link
              to="/notes"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold"
            >
              📚 Browse Notes
            </Link>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default NotFound;