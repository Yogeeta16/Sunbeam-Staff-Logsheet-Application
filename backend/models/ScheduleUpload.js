// models/ScheduleUpload.js
const db = require('../config/db');

exports.recordUpload = async ({ file_path, uploaded_by }) => {
  try {
    const [result] = await db.query(
      `INSERT INTO schedule_uploads (file_path, uploaded_by) VALUES (?, ?)`,
      [file_path, uploaded_by]
    );
    return result.insertId;
  } catch (err) {
    console.error('Error recording schedule upload:', err);
    throw new Error('Could not record upload');
  }
};

exports.getAllUploads = async () => {
  try {
    const [rows] = await db.query(
      `SELECT 
          u.upload_id, 
          u.file_path, 
          u.uploaded_at,
          s.staff_id AS uploaded_by,
          s.name AS uploaded_by_name
       FROM schedule_uploads u
       JOIN staff s ON s.staff_id = u.uploaded_by
       ORDER BY u.uploaded_at DESC`
    );
    return rows;
  } catch (err) {
    console.error('Error fetching schedule uploads:', err);
    throw new Error('Could not fetch uploads');
  }
};