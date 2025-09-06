// Dashboard.jsx
import StaffView from "./StaffView";
import CoordinatorView from "./CoordinatorView";
import { mockData } from "./mockData"; // adjust path if needed

function Dashboard() {
  // Mock user for now
  const user = { role: "staff" }; // or "coordinator"
//  const user = JSON.parse(localStorage.getItem("user")) || { role: "guest" };
console.log (mockData.staff.recentLogs);
  return (
    <div>
      <h1>Main Dashboard</h1>
      <p>Role: {user.role}</p>

      {user.role === "staff" && <StaffView data={mockData.staff} />}
      {user.role === "coordinator" && (
        <CoordinatorView data={mockData.coordinator} />
      )}
    </div>
  );
}

export default Dashboard;

  