import Sidebar from "../components/Sidebar";

function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}

export default AdminLayout;