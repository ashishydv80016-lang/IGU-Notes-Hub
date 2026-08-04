import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-blue-900 text-white mt-20">

      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid md:grid-cols-4 gap-8">

          {/* Website Info */}
          <div>
            <h2 className="text-2xl font-bold mb-4">
              🎓 IGU Notes Hub
            </h2>

            <p className="text-gray-300">
              A platform for IGU students to access
              notes, previous year papers, syllabus
              and study materials.
            </p>
          </div>


          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2">

              <li>
                <Link
                  to="/"
                  className="hover:text-yellow-300"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/notes"
                  className="hover:text-yellow-300"
                >
                  Notes
                </Link>
              </li>

              <li>
                <Link
                  to="/previous-papers"
                  className="hover:text-yellow-300"
                >
                  Previous Papers
                </Link>
              </li>

              <li>
                <Link
                  to="/syllabus"
                  className="hover:text-yellow-300"
                >
                  Syllabus
                </Link>
              </li>

            </ul>
          </div>


          {/* Important Pages */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              Important
            </h3>

            <ul className="space-y-2">

              <li>
                <Link
                  to="/about"
                  className="hover:text-yellow-300"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="hover:text-yellow-300"
                >
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  to="/privacy-policy"
                  className="hover:text-yellow-300"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  to="/terms"
                  className="hover:text-yellow-300"
                >
                  Terms & Conditions
                </Link>
              </li>

            </ul>
          </div>


          {/* Disclaimer */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              Legal
            </h3>

            <ul className="space-y-2">

              <li>
                <Link
                  to="/disclaimer"
                  className="hover:text-yellow-300"
                >
                  Disclaimer
                </Link>
              </li>

              <li>
                <span>
                  © 2026 IGU Notes Hub
                </span>
              </li>

            </ul>

          </div>


        </div>


        <div className="border-t border-blue-700 mt-8 pt-5 text-center">

          <p className="text-gray-300">
            © 2026 IGU Notes Hub. All Rights Reserved.
          </p>

        </div>


      </div>

    </footer>
  );
}

export default Footer;