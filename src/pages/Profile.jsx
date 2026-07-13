import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const res = await api.get("/users/profile");

      setUser(res.data.user);

      setFormData({
        name: res.data.user.name,
        email: res.data.user.email,
      });

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );
    } catch (error) {
      console.error(error);

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      navigate("/login");
    }
  };

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = async () => {
    try {
      const res = await api.put(
        "/users/profile",
        formData
      );

      setUser(res.data.user);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      setEditing(false);

      alert("✅ Profile Updated Successfully");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Profile Update Failed"
      );
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged Out Successfully");

    navigate("/login");
  };

  if (!user) {
    return (
      <>
        <Navbar />

        <div className="flex justify-center items-center h-screen">
          <h1 className="text-3xl font-bold">
            Loading...
          </h1>
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto py-10 px-5">

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

          <div className="bg-blue-700 text-white p-8">

            <h1 className="text-4xl font-bold">
              👤 Student Profile
            </h1>

            <p className="mt-2 text-lg">
              Welcome, {user.name}
            </p>

          </div>

          <div className="grid md:grid-cols-2 gap-8 p-8">

            <div className="bg-gray-50 rounded-xl p-6">

              <h2 className="text-2xl font-bold mb-6">
                Personal Information
              </h2>

              <div className="space-y-5">

                <div>
                  <label className="font-semibold block mb-2">
                    Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={changeHandler}
                    disabled={!editing}
                    className="w-full border rounded-lg p-3"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-2">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={changeHandler}
                    disabled={!editing}
                    className="w-full border rounded-lg p-3"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-2">
                    Role
                  </label>

                  <input
                    value={user.role}
                    disabled
                    className="w-full border rounded-lg p-3 bg-gray-100"
                  />
                </div>

              </div>

            </div>

            <div className="bg-gray-50 rounded-xl p-6">

              <h2 className="text-2xl font-bold mb-6">
                Quick Actions
              </h2>

              {!editing ? (
                <button
                  onClick={() => setEditing(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg mb-4"
                >
                  ✏ Edit Profile
                </button>
              ) : (
                <button
                  onClick={saveProfile}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg mb-4"
                >
                  💾 Save Profile
                </button>
              )}

              <Link
                to="/favorites"
                className="block w-full text-center bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg mb-4"
              >
                ❤️ Favorite Notes
              </Link>

              <Link
                to="/downloads"
                className="block w-full text-center bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg mb-4"
              >
                📥 Download History
              </Link>

              <button
                onClick={logoutHandler}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg"
              >
                🚪 Logout
              </button>

            </div>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default Profile;