import { useEffect, useState } from "react";
import StaffView from "./StaffView";
import CoordinatorView from "./CoordinatorView";
import api from "../../utils/api";

function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const role = localStorage.getItem("role")?.toLowerCase() || "guest";

  useEffect(() => {
    async function fetchData() {
      try {
        let endpoint = "";
        if (role === "staff") {
          endpoint = "/dashboard/staff";
        } else if (role === "coordinator") {
          endpoint = "/dashboard/coordinator";
        }

        if (endpoint) {
          const res = await api.get(endpoint);
          setData(res.data);
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [role]);

  if (loading) return <p>Loading dashboard...</p>;
  if (!data) return <p>No data available</p>;

  return (
    <div>
      <h1>Main Dashboard</h1>
      <p>Role: {role}</p>

      {role === "staff" && <StaffView data={data} />}
      {role === "coordinator" && <CoordinatorView data={data} />}
    </div>
  );
}

export default Dashboard;
