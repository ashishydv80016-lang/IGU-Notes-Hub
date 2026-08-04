import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UploadMaterial from "./pages/UploadMaterial";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Notes from "./pages/Notes";
import PreviousPapers from "./pages/PreviousPapers";
import MaterialDetails from "./pages/MaterialDetails";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";
import DownloadHistory from "./pages/DownloadHistory";
import UserManagement from "./pages/UserManagement";
import AdminUpload from "./pages/AdminUpload";
import AdminMaterials from "./pages/AdminMaterials";
import EditMaterial from "./pages/EditMaterial";
import Syllabus from "./pages/Syllabus";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Disclaimer from "./pages/Disclaimer";
import Test from "./pages/Test";


// NEW
import PDFViewer from "./pages/PDFViewer";

function App() {
  return (
    <Routes>

      {/* ================= HOME ================= */}
      <Route path="/" element={<Home />} />

      {/* ================= STUDENT ================= */}
      <Route path="/notes" element={<Notes />} />
      <Route
        path="/previous-papers"
        element={<PreviousPapers />}
      />
      <Route path="/syllabus" element={<Syllabus />} />

      {/* Material Details */}
      <Route
        path="/materials/:id"
        element={<MaterialDetails />}
      />

      {/* NEW PDF VIEWER */}
      <Route
        path="/viewer/:id"
        element={<PDFViewer />}
      />

      {/* ================= AUTH ================= */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ================= STUDENT DASHBOARD ================= */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/favorites"
        element={
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        }
      />

      <Route
        path="/downloads"
        element={
          <ProtectedRoute>
            <DownloadHistory />
          </ProtectedRoute>
        }
      />

      {/* ================= ADMIN ================= */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <ProtectedRoute>
            <UserManagement />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/upload"
        element={
          <ProtectedRoute>
            <AdminUpload />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/materials"
        element={
          <ProtectedRoute>
            <AdminMaterials />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/materials/edit/:id"
        element={
          <ProtectedRoute>
            <EditMaterial />
          </ProtectedRoute>
        }
      />

      {/* Legacy Upload Route */}
      <Route
        path="/upload"
        element={
          <ProtectedRoute>
            <UploadMaterial />
          </ProtectedRoute>
        }
      />
      <Route path="/search" element={<Search />} />

     


{/* ================= ADSENSE PAGES ================= */}

<Route path="/about" element={<About />} />

<Route path="/contact" element={<Contact />} />

<Route
  path="/privacy-policy"
  element={<Privacy />}
/>

<Route 
  path="/terms" 
  element={<Terms />} 
/>

<Route 
  path="/disclaimer" 
  element={<Disclaimer />} 
/>
<Route path="/test" element={<Test />} />


<Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default App;