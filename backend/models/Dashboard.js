const db = require("../config/db");

const DashboardModel = {
  // -------- Coordinator Stats --------
  getCoordinatorStats: async (coordinatorId) => {
    const [[staffCount]] = await db.query(`SELECT COUNT(*) AS totalStaff FROM staff`);
    
    const [[activeCourses]] = await db.query(
      `SELECT COUNT(*) AS activeCourses FROM courses WHERE coordinator_id = ? AND status = 'Active'`,
      [coordinatorId]
    );

    const [[pendingLogs]] = await db.query(
      `SELECT COUNT(*) AS pendingLogs 
       FROM logsheets l 
       JOIN courses c ON l.course_id = c.course_id
       WHERE l.status = 'Pending' AND c.coordinator_id = ?`,
      [coordinatorId]
    );

    const [[totalHours]] = await db.query(
      `SELECT IFNULL(SUM(TIMESTAMPDIFF(HOUR, l.start_time, l.end_time)), 0) AS totalHours
       FROM logsheets l 
       JOIN courses c ON l.course_id = c.course_id
       WHERE c.coordinator_id = ?`,
      [coordinatorId]
    );

    return {
      staffCount: staffCount.totalStaff,
      activeCourses: activeCourses.activeCourses,
      pendingLogs: pendingLogs.pendingLogs,
      totalHours: totalHours.totalHours
    };
  },

  // -------- Coordinator Pending Logs --------
  getCoordinatorPendingLogs: async (coordinatorId) => {
    const [rows] = await db.query(
      `SELECT l.logsheet_id AS id, c.course_name AS course, l.date, l.status, s.name AS staffName
       FROM logsheets l
       JOIN courses c ON l.course_id = c.course_id
       JOIN staff s ON l.faculty_id = s.staff_id
       WHERE l.status = 'Pending' AND c.coordinator_id = ?`,
      [coordinatorId]
    );
    return rows;
  },

  // -------- Staff Stats --------
  getStaffStats: async (staffId) => {
    const [[assignedSchedules]] = await db.query(
      `SELECT COUNT(*) AS assignedSchedules FROM schedules WHERE faculty_id = ?`,
      [staffId]
    );

    const [[logsSubmitted]] = await db.query(
      `SELECT COUNT(*) AS logsSubmitted FROM logsheets WHERE faculty_id = ?`,
      [staffId]
    );

    const [[pendingApproval]] = await db.query(
      `SELECT COUNT(*) AS pendingApproval FROM logsheets WHERE faculty_id = ? AND status = 'Pending'`,
      [staffId]
    );

    const [[approvedHours]] = await db.query(
      `SELECT IFNULL(SUM(TIMESTAMPDIFF(HOUR, start_time, end_time)), 0) AS approvedHours
       FROM logsheets WHERE faculty_id = ? AND status = 'Approved'`,
      [staffId]
    );

    return {
      assignedSchedules: assignedSchedules.assignedSchedules,
      logsSubmitted: logsSubmitted.logsSubmitted,
      pendingApproval: pendingApproval.pendingApproval,
      approvedHours: approvedHours.approvedHours
    };
  },

  // -------- Staff Recent Logs --------
  getStaffRecentLogs: async (staffId) => {
    const [rows] = await db.query(
      `SELECT l.logsheet_id AS id, c.course_name AS course, l.date, l.status
       FROM logsheets l
       JOIN courses c ON l.course_id = c.course_id
       WHERE l.faculty_id = ?
       ORDER BY l.date DESC
       LIMIT 5`,
      [staffId]
    );
    return rows;
  }
};

module.exports = DashboardModel;
