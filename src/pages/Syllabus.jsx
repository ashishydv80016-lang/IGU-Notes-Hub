import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const branches = [
  "CSE",
  "IT",
  "ECE",
  "EE",
  "ME",
  "CE",
];

function Syllabus() {
  return (
    <>
      <Navbar />

      <section className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">

          <h1 className="text-5xl font-bold">
            📘 IGU Syllabus
          </h1>

          <p className="mt-4 text-xl">
            Download semester-wise syllabus for every branch.
          </p>

        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">

          {branches.map((branch) => (

            <div
              key={branch}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition p-6"
            >

              <div className="text-center">

                <div className="text-6xl">
                  📘
                </div>

                <h2 className="text-3xl font-bold mt-4">
                  {branch}
                </h2>

                <p className="text-gray-600 mt-3">
                  Semester-wise syllabus
                </p>

                <button
                  className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                  disabled
                >
                  Coming Soon
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

      <Footer />
    </>
  );
}

export default Syllabus;