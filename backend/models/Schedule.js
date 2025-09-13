// Schedule.js
const db = require('../config/db');

exports.create = async (payload) => {
  const { course_id, module_id, date, start_time, end_time, type, group, venue, faculty_id } = payload;
  const [result] = await db.query(
    `INSERT INTO schedules (course_id, module_id, date, start_time, end_time, type, \`group\`, venue, faculty_id)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [course_id, module_id, date, start_time, end_time, type, group || null, venue || null, faculty_id]
  );
  return result.insertId;
};

exports.bulkInsert = async (rows) => {
  if (!rows.length) return 0;
  const values = rows.map(r => [
    r.course_id, r.module_id, r.date, r.start_time, r.end_time, r.type, r.group || null, r.venue || null, r.faculty_id
  ]);
  const [result] = await db.query(
    `INSERT INTO schedules (course_id, module_id, date, start_time, end_time, type, \`group\`, venue, faculty_id)
     VALUES ?`,
    [values]
  );
  return result.affectedRows;
};

exports.getAll = async () => {
  const [rows] = await db.query(
    `SELECT s.schedule_id, s.date, s.start_time, s.end_time, s.type, s.\`group\`, s.venue,
            c.course_id, c.course_name,
            m.module_id, m.module_name,
            st.staff_id AS faculty_id, st.name AS faculty_name
     FROM schedules s
     JOIN courses c ON c.course_id = s.course_id
     JOIN modules m ON m.module_id = s.module_id
     JOIN staff st ON st.staff_id = s.faculty_id
     ORDER BY s.date DESC, s.start_time DESC`
  );
  return rows;
};

exports.getById = async (id) => {
  const [rows] = await db.query(
    `SELECT s.schedule_id, s.date, s.start_time, s.end_time, s.type, s.\`group\`, s.venue,
            c.course_id, c.course_name,
            m.module_id, m.module_name,
            st.staff_id AS faculty_id, st.name AS faculty_name
     FROM schedules s
     JOIN courses c ON c.course_id = s.course_id
     JOIN modules m ON m.module_id = s.module_id
     JOIN staff st ON st.staff_id = s.faculty_id
     WHERE s.schedule_id = ?`,
    [id]
  );
  return rows[0];
};

exports.update = async (id, payload) => {
  const { course_id, module_id, date, start_time, end_time, type, group, venue, faculty_id } = payload;
  const [result] = await db.query(
    `UPDATE schedules
     SET course_id=?, module_id=?, date=?, start_time=?, end_time=?, type=?, \`group\`=?, venue=?, faculty_id=?
     WHERE schedule_id=?`,
    [course_id, module_id, date, start_time, end_time, type, group || null, venue || null, faculty_id, id]
  );
  return result.affectedRows;
};

exports.remove = async (id) => {
  const [result] = await db.query(`DELETE FROM schedules WHERE schedule_id = ?`, [id]);
  return result.affectedRows;
};

exports.search = async ({ faculty_id, course_id, module_id, date }) => {
  const where = [];
  const params = [];
  if (faculty_id) { where.push('s.faculty_id = ?'); params.push(faculty_id); }
  if (course_id)  { where.push('s.course_id = ?');  params.push(course_id); }
  if (module_id)  { where.push('s.module_id = ?');  params.push(module_id); }
  if (date)       { where.push('s.date = ?');       params.push(date); }

  const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';
  const [rows] = await db.query(
    `SELECT s.schedule_id, s.date, s.start_time, s.end_time, s.type, s.\`group\`, s.venue,
            c.course_id, c.course_name,
            m.module_id, m.module_name,
            st.staff_id AS faculty_id, st.name AS faculty_name
     FROM schedules s
     JOIN courses c ON c.course_id = s.course_id
     JOIN modules m ON m.module_id = s.module_id
     JOIN staff st ON st.staff_id = s.faculty_id
     ${whereSql}
     ORDER BY s.date DESC, s.start_time DESC`,
    params
  );
  return rows;
};

exports.getByStaffId = async (staffId) => {
  const [rows] = await db.query(
    `SELECT s.schedule_id, s.date, s.start_time, s.end_time, s.type, s.\`group\`, s.venue,
            c.course_id, c.course_name,
            m.module_id, m.module_name,
            st.staff_id AS faculty_id, st.name AS faculty_name
     FROM schedules s
     JOIN courses c ON c.course_id = s.course_id
     JOIN modules m ON m.module_id = s.module_id
     JOIN staff st ON st.staff_id = s.faculty_id
     WHERE s.faculty_id = ?
     ORDER BY s.date DESC, s.start_time DESC`,
    [staffId]
  );
  return rows;
};
// gets the schedule for staff for which logsheet not created
exports.getAvailableForStaff = async (staffId) => {
  const [rows] = await db.query(
    `SELECT s.schedule_id, s.date, s.start_time, s.end_time, s.type, s.\`group\`, s.venue,
            c.course_id, c.course_name,
            m.module_id, m.module_name,
            st.staff_id AS faculty_id, st.name AS faculty_name
     FROM schedules s
     JOIN courses c ON c.course_id = s.course_id
     JOIN modules m ON m.module_id = s.module_id
     JOIN staff st ON st.staff_id = s.faculty_id
     WHERE s.faculty_id = ?
       AND NOT EXISTS (
         SELECT 1 FROM logsheets l WHERE l.schedule_id = s.schedule_id
       )
     ORDER BY s.date DESC, s.start_time DESC`,
    [staffId]
  );
  return rows;
};
