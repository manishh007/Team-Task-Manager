import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AssignTask from "./pages/AssignTask";
import ProjectDetails from "./pages/ProjectDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/assign/:projectId" element={<AssignTask />} />
        <Route path="/project/:projectId" element={<ProjectDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;