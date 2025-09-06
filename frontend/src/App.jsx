// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import StaffView from "./pages/dashboard/StaffView";
import CoordinatorView from "./pages/dashboard/CoordinatorView";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/" element={<Login />} />
      <Route path="staff" element={<StaffView />} />
      <Route path="coordinator" element={<CoordinatorView />} />
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
