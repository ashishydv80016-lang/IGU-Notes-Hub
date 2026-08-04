import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Contact() {
  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-12">

        <h1 className="text-4xl font-bold text-blue-700 mb-6">
          Contact Us
        </h1>


        <p className="text-lg leading-8 mb-6">
          If you have any questions, suggestions, feedback,
          or issues related to IGU Notes Hub, feel free to
          contact us.
        </p>


        <div className="bg-blue-50 rounded-xl p-6 shadow">

          <h2 className="text-2xl font-bold mb-4">
            Get in Touch
          </h2>


          <p className="mb-3">
            📧 Email:
            <span className="font-semibold ml-2">
              ashishydv80016@gmail.com
            </span>
          </p>


          <p className="mb-3">
            🎓 Website:
            <span className="font-semibold ml-2">
              IGU Notes Hub
            </span>
          </p>


          <p>
            We try to respond to genuine queries as soon
            as possible.
          </p>

        </div>


        <h2 className="text-2xl font-bold mt-10 mb-4">
          Why Contact Us?
        </h2>


        <ul className="list-disc ml-6 space-y-2 text-lg">

          <li>
            Report incorrect information
          </li>

          <li>
            Suggest new features
          </li>

          <li>
            Request academic resources
          </li>

          <li>
            Share feedback about the website
          </li>

        </ul>


      </div>

      <Footer />
    </>
  );
}

export default Contact;