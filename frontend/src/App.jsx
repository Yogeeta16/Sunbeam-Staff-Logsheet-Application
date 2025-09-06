// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import StaffView from "./pages/dashboard/StaffView";
import CoordinatorView from "./pages/dashboard/CoordinatorView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="staff" element={<StaffView />} />
          <Route path="coordinator" element={<CoordinatorView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
