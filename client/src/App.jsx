import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Pdfs from "./components/Pdfs";
import ViewPdf from "./components/ViewPdf";
import Dashboard from "./components/DashBoard";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const hideNavAndSidebar = location.pathname.startsWith("/view");

  return (
    <div className="flex h-screen">
      {!hideNavAndSidebar && <Sidebar />}

      <div className="flex-1 flex flex-col">
        {!hideNavAndSidebar && <Navbar />}

        <div className="flex-1 overflow-y-auto p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/pdfs" element={<Pdfs />} exact />
            <Route path="/view/:id" element={<ViewPdf />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
