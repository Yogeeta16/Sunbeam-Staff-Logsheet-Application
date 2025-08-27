const db = require('../config/db');

//  Get all logs (with optional filtering by staff/coordinator)
exports.getAll = async (role, facultyId) => {
    let query = `
        SELECT l.*, s.name AS faculty_name, c.course_name, m.module_name 
        FROM logsheets l
        LEFT JOIN staff s ON l.faculty_id = s.staff_id
        LEFT JOIN courses c ON l.course_id = c.course_id
        LEFT JOIN modules m ON l.module_id = m.module_id
    `;
    const params = [];

    if (role === 'Staff') {
        query += " WHERE l.faculty_id = ?";
        params.push(facultyId);
    }
    query += " ORDER BY l.date DESC";

    const [rows] = await db.query(query, params);
    return rows;
};

//  Get log by ID
exports.getById = async (id) => {
    const [rows] = await db.query(
        `SELECT l.*, s.name AS faculty_name, c.course_name, m.module_name 
         FROM logsheets l
         LEFT JOIN staff s ON l.faculty_id = s.staff_id
         LEFT JOIN courses c ON l.course_id = c.course_id
         LEFT JOIN modules m ON l.module_id = m.module_id
         WHERE l.logsheet_id = ?`,
        [id]
    );
    return rows[0];
};

//  Create log
exports.create = async (data) => {
    const {
        schedule_id, date, start_time, end_time,
        course_id, module_id, type,
        topics_taught, assignment_given, student_progress, faculty_id
    } = data;

    const [result] = await db.query(
        `INSERT INTO logsheets 
        (schedule_id, date, start_time, end_time, course_id, module_id, type, status, topics_taught, assignment_given, student_progress, faculty_id) 
        VALUES (?, ?, ?, ?, ?, ?, ?, 'Pending', ?, ?, ?, ?)`,
        [schedule_id, date, start_time, end_time, course_id, module_id, type, topics_taught, assignment_given, student_progress, faculty_id]
    );

    return result.insertId;
};

//  Update log (staff only if Pending)
exports.updateById = async (id, data, facultyId) => {
    const {
        date, start_time, end_time,
        course_id, module_id, type,
        topics_taught, assignment_given, student_progress
    } = data;

    const [result] = await db.query(
        `UPDATE logsheets 
         SET date=?, start_time=?, end_time=?, course_id=?, module_id=?, type=?, topics_taught=?, assignment_given=?, student_progress=? 
         WHERE logsheet_id=? AND faculty_id=? AND status='Pending'`,
        [date, start_time, end_time, course_id, module_id, type, topics_taught, assignment_given, student_progress, id, facultyId]
    );

    return result.affectedRows;
};

//  Delete log (staff only if Pending)
exports.deleteById = async (id, facultyId) => {
    const [result] = await db.query(
        "DELETE FROM logsheets WHERE logsheet_id=? AND faculty_id=? AND status='Pending'",
        [id, facultyId]
    );
    return result.affectedRows;
};

//  Approve / Reject log (Coordinator only)
exports.updateStatus = async (id, status) => {
    const [result] = await db.query(
        "UPDATE logsheets SET status=? WHERE logsheet_id=?",
        [status, id]
    );
    return result.affectedRows;
};
