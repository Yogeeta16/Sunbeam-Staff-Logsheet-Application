const dashboardModel = require("../models/Dashboard");

// 1. Staff Hours
exports.getStaffHours = async (req, res) => {
  try {
    const data = await dashboardModel.getStaffHours();
    res.json(data);
  } catch (err) {
    console.error("❌ getStaffHours error:", err);
    res.status(500).json({ error: "Database error" });
  }
};

// 2. Course Hours
exports.getCourseHours = async (req, res) => {
  try {
    const data = await dashboardModel.getCourseHours();
    res.json(data);
  } catch (err) {
    console.error("❌ getCourseHours error:", err);
    res.status(500).json({ error: "Database error" });
  }
};

// 3. Module Hours
exports.getModuleHours = async (req, res) => {
  try {
    const data = await dashboardModel.getModuleHours();
    res.json(data);
  } catch (err) {
    console.error("❌ getModuleHours error:", err);
    res.status(500).json({ error: "Database error" });
  }
};

// 4. Filter Logs
exports.filterLogs = async (req, res) => {
  try {
    const filters = {
      courseId: req.query.courseId,
      moduleId: req.query.moduleId,
      date: req.query.date,
    };
    const data = await dashboardModel.filterLogs(filters);
    res.json(data);
  } catch (err) {
    console.error("❌ filterLogs error:", err);
    res.status(500).json({ error: "Database error" });
  }
};

// 5. Pending Logs
exports.getPendingLogs = async (req, res) => {
  try {
    const data = await dashboardModel.getPendingLogs();
    res.json(data);
  } catch (err) {
    console.error("❌ getPendingLogs error:", err);
    res.status(500).json({ error: "Database error" });
  }
};
