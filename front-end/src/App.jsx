import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import AdminDashboard from "./components/admin/AdminDashboard";
import UserDashboard from "./components/UserDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/user-dashboard" element={<UserDashboard />} />
    </Routes>
  );
}

export default App;
