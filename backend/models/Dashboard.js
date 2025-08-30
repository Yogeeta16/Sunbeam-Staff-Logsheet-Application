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
