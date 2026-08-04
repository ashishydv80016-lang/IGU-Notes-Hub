import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function About() {
  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-12">

        <h1 className="text-4xl font-bold text-blue-700 mb-6">
          About IGU Notes Hub
        </h1>

        <p className="text-lg leading-8 mb-5">
          IGU Notes Hub is an educational platform created
          to help students of Indira Gandhi University
          access study materials easily.
        </p>

        <p className="text-lg leading-8 mb-5">
          Our goal is to provide students with organized
          notes, previous year question papers, syllabus
          information and useful academic resources for
          better exam preparation.
        </p>

        <p className="text-lg leading-8 mb-5">
          Students can explore materials according to
          their branch, semester and subjects, making it
          easier to find the right resources at the right
          time.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">
          Our Mission
        </h2>

        <p className="text-lg leading-8">
          Our mission is to make quality educational
          resources easily accessible for university
          students and support better learning.
        </p>

      </div>

      <Footer />
    </>
  );
}

export default About;