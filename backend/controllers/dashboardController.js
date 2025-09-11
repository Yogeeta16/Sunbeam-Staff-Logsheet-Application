const DashboardModel = require("../models/Dashboard");

exports.getCoordinatorDashboard = async (req, res) => {
  try {
    const coordinatorId = req.user.id; // taken from JWT payload
    const stats = await DashboardModel.getCoordinatorStats(coordinatorId);
    const pendingLogs = await DashboardModel.getCoordinatorPendingLogs(coordinatorId);

    res.json({
      stats: [
        { title: "Total Staff", value: stats.staffCount, icon: "Users" },
        { title: "Active Courses", value: stats.activeCourses, icon: "BookOpen" },
        { title: "Pending Logs", value: stats.pendingLogs, icon: "AlertCircle" },
        { title: "Total Hours", value: stats.totalHours, icon: "Clock" }
      ],
      pendingLogs
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching coordinator dashboard" });
  }
};

exports.getStaffDashboard = async (req, res) => {
  try {
    const staffId = req.user.id; // taken from JWT payload
    const stats = await DashboardModel.getStaffStats(staffId);
    const recentLogs = await DashboardModel.getStaffRecentLogs(staffId);

    res.json({
      stats: [
        { title: "Assigned Schedules", value: stats.assignedSchedules, icon: "BookOpen" },
        { title: "Logs Submitted", value: stats.logsSubmitted, icon: "CheckCircle" },
        { title: "Pending Approval", value: stats.pendingApproval, icon: "AlertCircle" },
        { title: "Approved Hours", value: stats.approvedHours, icon: "TrendingUp" }
      ],
      recentLogs
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching staff dashboard" });
  }
};
