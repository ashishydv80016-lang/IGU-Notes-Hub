import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill all fields.");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/users/register", formData);

      toast.success(
        res.data.message || "Registration Successful!"
      );

      setTimeout(() => {
        navigate("/login");
      }, 1200);

    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message ||
        "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">

      <form
        onSubmit={handleRegister}
        className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 w-full max-w-md"
      >

        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          Create Account
        </h2>

        <div className="mb-4">

          <label className="block mb-2 font-medium dark:text-white">
            Full Name
          </label>

          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
            value={formData.name}
            onChange={handleChange}
          />

        </div>

        <div className="mb-4">

          <label className="block mb-2 font-medium dark:text-white">
            Email
          </label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
            value={formData.email}
            onChange={handleChange}
          />

        </div>

        <div className="mb-6">

          <label className="block mb-2 font-medium dark:text-white">
            Password
          </label>

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
            value={formData.password}
            onChange={handleChange}
          />

        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
        >
          {loading ? "Creating Account..." : "Register"}
        </button>

        <p className="text-center mt-5 dark:text-gray-300">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer hover:underline font-semibold"
          >
            Login
          </span>
        </p>

      </form>

    </div>
  );
}

export default Register;