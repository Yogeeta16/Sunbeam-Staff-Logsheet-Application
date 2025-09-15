import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getCoordinatorDashboard, getStaffDashboard } from "../api/dashboard";
import { StatCard } from "../components/dashboard/StatCard";
import { RecentLogs } from "../components/dashboard/RecentLogs";

const Dashboard = () => {
  const { user } = useAuth();
  const isCoordinator = user?.role?.toLowerCase() === "coordinator";

  const [stats, setStats] = useState([]);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        if (isCoordinator) {
          const data = await getCoordinatorDashboard();
          setStats(data.stats || []);
          setLogs(data.pendingLogs || []);
        } else {
          const data = await getStaffDashboard();
          setStats(data.stats || []);
          setLogs(data.recentLogs || []);
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };
    fetchDashboard();
  }, [isCoordinator]);

  return (
    <div className="space-y-6 bg-background">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
        <p className="text-muted-foreground">
          {isCoordinator
            ? "Here's an overview of your team's progress"
            : "Track your schedules and logsheet submissions"}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard key={index} title={stat.title} value={stat.value} icon={stat.icon} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentLogs logs={logs} isCoordinator={isCoordinator} />
      </div>
    </div>
  );
};

export default Dashboard;
