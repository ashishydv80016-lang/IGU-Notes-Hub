import { Link } from "react-router-dom";
import { FaBookOpen, FaDownload, FaFilePdf } from "react-icons/fa";

function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white">

      <div className="max-w-7xl mx-auto px-6 py-24">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Side */}

          <div>

            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
              Welcome to
              <br />
              <span className="text-yellow-300">
                IGU Notes Hub
              </span>
            </h1>

            <p className="mt-6 text-xl text-blue-100">
              Download Notes, Previous Year Papers and Syllabus
              for all IGU courses in one place.
            </p>

            <div className="flex gap-5 mt-10">

              <Link
                to="/notes"
                className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-4 rounded-xl font-bold"
              >
                Browse Notes
              </Link>

              <Link
                to="/register"
                className="border-2 border-white px-8 py-4 rounded-xl hover:bg-white hover:text-blue-700 font-bold"
              >
                Join Free
              </Link>

            </div>

          </div>

          {/* Right Side */}

          <div>

            <div className="bg-white rounded-3xl shadow-2xl p-10">

              <div className="space-y-5">

                <div className="flex items-center gap-4 bg-blue-50 p-5 rounded-xl">

                  <FaBookOpen
                    className="text-blue-700"
                    size={35}
                  />

                  <div>

                    <h3 className="text-black font-bold">
                      Study Notes
                    </h3>

                    <p className="text-gray-600">
                      Semester-wise notes
                    </p>

                  </div>

                </div>

                <div className="flex items-center gap-4 bg-green-50 p-5 rounded-xl">

                  <FaFilePdf
                    className="text-green-700"
                    size={35}
                  />

                  <div>

                    <h3 className="text-black font-bold">
                      Previous Papers
                    </h3>

                    <p className="text-gray-600">
                      University Question Papers
                    </p>

                  </div>

                </div>

                <div className="flex items-center gap-4 bg-orange-50 p-5 rounded-xl">

                  <FaDownload
                    className="text-orange-600"
                    size={35}
                  />

                  <div>

                    <h3 className="text-black font-bold">
                      Instant Download
                    </h3>

                    <p className="text-gray-600">
                      Download PDFs anytime
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;