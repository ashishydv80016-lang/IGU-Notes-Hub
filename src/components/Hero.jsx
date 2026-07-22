import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white">

      {/* Background Decoration */}

      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-white"></div>

        <div className="absolute top-20 right-10 w-60 h-60 rounded-full bg-white"></div>

        <div className="absolute bottom-0 left-1/2 w-96 h-96 rounded-full bg-white"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-24">

        {/* Badge */}

        <div className="flex justify-center">

          <span className="bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full text-sm font-semibold shadow-lg">

            🎓 Indira Gandhi University Resource Portal

          </span>

        </div>

        {/* Heading */}

        <h1 className="text-center text-5xl md:text-7xl font-extrabold mt-8 leading-tight">

          IGU Notes Hub

        </h1>

        {/* Subtitle */}

        <p className="text-center text-lg md:text-2xl mt-6 max-w-4xl mx-auto text-gray-100">

          Access Notes, Previous Year Papers, Syllabus,
          Assignments and Study Materials for all
          branches and semesters in one place.

        </p>

        {/* Buttons */}

        <div className="flex flex-wrap justify-center gap-5 mt-12">

          <Link
            to="/notes"
            className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold shadow-lg hover:scale-105 transition duration-300"
          >
            📚 Browse Notes
          </Link>

          <Link
            to="/previous-papers"
            className="bg-yellow-400 text-black px-8 py-4 rounded-xl font-bold shadow-lg hover:scale-105 transition duration-300"
          >
            📝 Previous Papers
          </Link>

          <Link
            to="/syllabus"
            className="bg-green-500 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:scale-105 transition duration-300"
          >
            📖 Syllabus
          </Link>

        </div>

        {/* Quick Statistics */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20">

            <h2 className="text-4xl font-bold">1000+</h2>

            <p className="mt-2">Notes</p>

          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20">

            <h2 className="text-4xl font-bold">500+</h2>

            <p className="mt-2">Previous Papers</p>

          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20">

            <h2 className="text-4xl font-bold">10+</h2>

            <p className="mt-2">Branches</p>

          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20">

            <h2 className="text-4xl font-bold">24×7</h2>

            <p className="mt-2">Available</p>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;