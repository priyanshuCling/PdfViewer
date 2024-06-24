import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Pdfs from "./components/Pdfs";
import ViewPdf from "./components/ViewPdf";
import Dashboard from "./components/DashBoard";

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        {/* Sidebar component */}
        <Sidebar />

        <div className="flex-1 flex flex-col">
          {/* Navbar component */}
          <Navbar />

          <div className="flex-1 overflow-y-auto p-6">
            {/* Routes for different pages */}
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/pdfs" element={<Pdfs />} />
              <Route path="/view/:id" element={<ViewPdf />} />{" "}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
