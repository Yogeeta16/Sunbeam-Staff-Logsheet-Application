// backend/models/Course.js

const db = require('../config/db');

exports.getAll = async () => {
    const [rows] = await db.query('SELECT * FROM courses');
    return rows;
};

exports.getById = async (id) => {
    const [rows] = await db.query('SELECT * FROM courses WHERE course_id = ?', [id]);
    return rows[0];
};

exports.create = async (name) => {
    const [result] = await db.query('INSERT INTO courses (course_name) VALUES (?)', [name]);
    return result.insertId;  ID
};

exports.updateById = async (id, name) => {
    const [result] = await db.query('UPDATE courses SET course_name = ? WHERE course_id = ?', [name, id]);
    return result.affectedRows;
};

exports.deleteById = async (id) => {
    const [result] = await db.query('DELETE FROM courses WHERE course_id = ?', [id]);
    return result.affectedRows;
};
