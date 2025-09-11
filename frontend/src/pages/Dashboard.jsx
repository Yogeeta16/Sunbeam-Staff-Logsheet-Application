import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { StatusBadge } from "../components/ui/status-badge";
import { Button } from "../components/ui/button";
import {
  Users,
  BookOpen,
  ClipboardList,
  Clock,
  TrendingUp,
  Calendar,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { getCoordinatorDashboard, getStaffDashboard } from "../api";

// Map string icon names from API to actual Lucide icons
const iconMap = {
  Users,
  BookOpen,
  ClipboardList,
  Clock,
  TrendingUp,
  Calendar,
  CheckCircle,
  AlertCircle,
};

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
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboard();
  }, [isCoordinator]);

  const StatCard = ({ title, value, icon }) => {
    const Icon = iconMap[icon] || Users;
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6 bg-background">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
        <p className="text-muted-foreground">
          {isCoordinator
            ? "Here's an overview of your team's progress"
            : "Track your schedules and logsheet submissions"}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard key={index} title={stat.title} value={stat.value} icon={stat.icon} />
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ClipboardList className="w-5 h-5 mr-2" />
              {isCoordinator ? "Recent Logsheets" : "My Recent Logs"}
            </CardTitle>
            <CardDescription>
              {isCoordinator
                ? "Latest submissions requiring attention"
                : "Your recent logsheet submissions"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {logs.length > 0 ? (
              logs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex-1">
                    {isCoordinator && <p className="font-medium text-sm">{log.staffName}</p>}

                    <p className="text-sm text-muted-foreground">{log.course}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(log.date).toLocaleDateString()} •{" "}
                      {log.hours ? `${log.hours} hrs` : log.type || ""}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <StatusBadge status={log.status?.toLowerCase()} />
                    {isCoordinator && log.status?.toLowerCase() === "pending" && (
                      <div className="flex space-x-1">
                        <Button size="sm" variant="outline" className="h-8 px-2">
                          <CheckCircle className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 px-2">
                          <AlertCircle className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No logs available</p>
            )}
          </CardContent>
        </Card>

   
      </div>
    </div>
  );
};

export default Dashboard;
