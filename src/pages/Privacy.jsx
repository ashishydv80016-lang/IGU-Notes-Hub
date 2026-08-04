import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Privacy() {
  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-12">

        <h1 className="text-4xl font-bold text-blue-700 mb-6">
          Privacy Policy
        </h1>


        <p className="text-lg leading-8 mb-5">
          At IGU Notes Hub, we respect your privacy and
          are committed to protecting the information of
          our users.
        </p>


        <h2 className="text-2xl font-bold mt-8 mb-3">
          Information We Collect
        </h2>

        <p className="text-lg leading-8">
          We may collect basic information such as account
          details provided during registration and usage
          information to improve our website experience.
        </p>


        <h2 className="text-2xl font-bold mt-8 mb-3">
          Cookies
        </h2>

        <p className="text-lg leading-8">
          Our website may use cookies to improve user
          experience and provide relevant content.
        </p>


        <h2 className="text-2xl font-bold mt-8 mb-3">
          Google AdSense
        </h2>

        <p className="text-lg leading-8">
          We use Google AdSense to display advertisements.
          Google and its partners may use cookies to show
          relevant advertisements based on users' visits
          to this and other websites.
        </p>


        <h2 className="text-2xl font-bold mt-8 mb-3">
          Third Party Services
        </h2>

        <p className="text-lg leading-8">
          We may use third-party services such as analytics
          and advertising providers that may collect
          information according to their own privacy
          policies.
        </p>


        <h2 className="text-2xl font-bold mt-8 mb-3">
          Data Security
        </h2>

        <p className="text-lg leading-8">
          We take reasonable steps to protect user
          information and maintain a safe browsing
          environment.
        </p>


        <h2 className="text-2xl font-bold mt-8 mb-3">
          Contact Us
        </h2>

        <p className="text-lg leading-8">
          If you have questions regarding this Privacy
          Policy, please contact us through our Contact
          page.
        </p>


      </div>

      <Footer />

    </>
  );
}

export default Privacy;