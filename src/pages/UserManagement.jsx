import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredUsers(filtered);
  }, [search, users]);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users");

      setUsers(res.data.users);
      setFilteredUsers(res.data.users);
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to fetch users"
      );
    } finally {
      setLoading(false);
    }
  };

  const changeRole = async (id, role) => {
    try {
      await api.put(`/admin/users/${id}`, {
        role,
      });

      alert("Role Updated Successfully");

      fetchUsers();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to update role"
      );
    }
  };

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this user?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/admin/users/${id}`);

      alert("User Deleted Successfully");

      fetchUsers();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to delete user"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto py-10 px-5">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-4xl font-bold">
            👥 User Management
          </h1>

          <div className="bg-blue-600 text-white px-5 py-3 rounded-lg">
            Total Users: {users.length}
          </div>

        </div>

        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg p-3 mb-8"
        />

        {loading ? (
          <h2 className="text-center text-2xl">
            Loading...
          </h2>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full border">

              <thead className="bg-gray-200">

                <tr>

                  <th className="border p-3">Name</th>

                  <th className="border p-3">Email</th>

                  <th className="border p-3">Role</th>

                  <th className="border p-3">Joined</th>

                  <th className="border p-3">Actions</th>

                </tr>

              </thead>

              <tbody>

                {filteredUsers.map((user) => (

                  <tr key={user._id}>

                    <td className="border p-3">
                      {user.name}
                    </td>

                    <td className="border p-3">
                      {user.email}
                    </td>

                    <td className="border p-3">

                      <select
                        value={user.role}
                        onChange={(e) =>
                          changeRole(
                            user._id,
                            e.target.value
                          )
                        }
                        className="border rounded p-2"
                      >
                        <option value="student">
                          Student
                        </option>

                        <option value="admin">
                          Admin
                        </option>

                      </select>

                    </td>

                    <td className="border p-3">
                      {new Date(
                        user.createdAt
                      ).toLocaleDateString()}
                    </td>

                    <td className="border p-3">

                      <button
                        onClick={() =>
                          deleteUser(user._id)
                        }
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>

      <Footer />
    </>
  );
}

export default UserManagement;