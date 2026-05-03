import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AssignTask from "./pages/AssignTask";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/assign/:projectId" element={<AssignTask />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;