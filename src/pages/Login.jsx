import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/users/login", formData);

      // Save token
      localStorage.setItem("token", res.data.token);

      // Save user
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success(res.data.message || "Login Successful!");

      // Redirect according to role
      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message ||
        "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">

      <form
        onSubmit={handleLogin}
        className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 w-full max-w-md"
      >

        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Login
        </h2>

        <div className="mb-4">

          <label className="block mb-2 font-medium dark:text-white">
            Email
          </label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
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
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            value={formData.password}
            onChange={handleChange}
          />

        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
        >
          {loading ? "Logging In..." : "Login"}
        </button>

        <p className="text-center mt-5 dark:text-gray-300">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 cursor-pointer hover:underline font-semibold"
          >
            Register
          </span>
        </p>

      </form>

    </div>
  );
}

export default Login;