const db = require("../config/db");

// 🔹 1. Total Hours per Staff
exports.getStaffHours = async () => {
  const [rows] = await db.query(`
    SELECT 
      st.staff_id,
      st.name AS staff_name,
      SUM(TIMESTAMPDIFF(HOUR, l.start_time, l.end_time)) AS total_hours
    FROM logsheets l
    JOIN staff st ON l.faculty_id = st.staff_id
    GROUP BY st.staff_id
  `);
  return rows;
};

// 🔹 2. Total Hours per Course
exports.getCourseHours = async () => {
  const [rows] = await db.query(`
    SELECT 
      c.course_id,
      c.course_name,
      SUM(TIMESTAMPDIFF(HOUR, l.start_time, l.end_time)) AS total_hours
    FROM logsheets l
    JOIN courses c ON l.course_id = c.course_id
    GROUP BY c.course_id
  `);
  return rows;
};

// 🔹 3. Total Hours per Module
exports.getModuleHours = async () => {
  const [rows] = await db.query(`
    SELECT 
      m.module_id,
      m.module_name,
      SUM(TIMESTAMPDIFF(HOUR, l.start_time, l.end_time)) AS total_hours
    FROM logsheets l
    JOIN modules m ON l.module_id = m.module_id
    GROUP BY m.module_id
  `);
  return rows;
};

// 🔹 4. Filter Logs
exports.filterLogs = async ({ courseId, moduleId, date }) => {
  let query = `
    SELECT 
      l.logsheet_id,
      st.name AS staff_name,
      c.course_name,
      m.module_name,
      l.date,
      l.start_time,
      l.end_time,
      l.topics_taught,
      l.assignment_given,
      l.status
    FROM logsheets l
    JOIN staff st ON l.faculty_id = st.staff_id
    JOIN courses c ON l.course_id = c.course_id
    JOIN modules m ON l.module_id = m.module_id
    WHERE 1=1
  `;
  let params = [];

  if (courseId) {
    query += " AND l.course_id = ?";
    params.push(courseId);
  }
  if (moduleId) {
    query += " AND l.module_id = ?";
    params.push(moduleId);
  }
  if (date) {
    query += " AND l.date = ?";
    params.push(date);
  }

  const [rows] = await db.query(query, params);
  return rows;
};

// 🔹 5. Pending Logs
exports.getPendingLogs = async () => {
  const [rows] = await db.query(`
    SELECT 
      l.logsheet_id,
      st.name AS staff_name,
      c.course_name,
      m.module_name,
      l.date,
      l.start_time,
      l.end_time,
      l.status
    FROM logsheets l
    JOIN staff st ON l.faculty_id = st.staff_id
    JOIN courses c ON l.course_id = c.course_id
    JOIN modules m ON l.module_id = m.module_id
    WHERE l.status = 'Pending'
  `);
  return rows;
};

// ---- Coordinator Stats ----
exports.getCoordinatorStats = async () => {
  const [[staffCount]] = await db.query(`SELECT COUNT(*) AS totalStaff FROM staff`);
  const [[courseCount]] = await db.query(`SELECT COUNT(*) AS activeCourses FROM courses`);
  const [[pendingLogs]] = await db.query(`SELECT COUNT(*) AS pendingLogs FROM logsheets WHERE status = 'Pending'`);
  const [[totalHours]] = await db.query(`
    SELECT IFNULL(SUM(TIMESTAMPDIFF(HOUR, start_time, end_time)), 0) AS totalHours
    FROM logsheets WHERE status = 'Approved'
  `);

  return {
    totalStaff: staffCount.totalStaff,
    activeCourses: courseCount.activeCourses,
    pendingLogs: pendingLogs.pendingLogs,
    totalHours: totalHours.totalHours
  };
};

// Coordinator → Pending Logs (latest 10)
exports.getCoordinatorPendingLogs = async () => {
  const [rows] = await db.query(`
    SELECT 
      l.logsheet_id AS id,
      s.name AS staff,
      c.course_name AS course,
      l.date,
      l.type,
      l.status
    FROM logsheets l
    JOIN staff s ON l.faculty_id = s.staff_id
    JOIN courses c ON l.course_id = c.course_id
    WHERE l.status = 'Pending'
    ORDER BY l.date DESC
    LIMIT 10
  `);
  return rows;
};

// ---- Staff Stats ----
exports.getStaffStats = async (staffId) => {
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
};

// Staff → Recent Logs
exports.getStaffRecentLogs = async (staffId) => {
  const [rows] = await db.query(`
    SELECT 
      l.logsheet_id AS id,
      c.course_name AS course,
      l.date,
      l.status
    FROM logsheets l
    JOIN courses c ON l.course_id = c.course_id
    WHERE l.faculty_id = ?
    ORDER BY l.date DESC
    LIMIT 5
  `, [staffId]);

  return rows;
};
