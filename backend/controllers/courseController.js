// backend/controllers/courseController.js

const db = require('../config/db');

exports.listCourses = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM courses');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getCourseById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query('SELECT * FROM courses WHERE course_id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Course not found' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createCourse = async (req, res) => {
    try {
        const { course_name } = req.body;
        if (!course_name) {
            return res.status(400).json({ message: 'Course name is required' });
        }
        const [result] = await db.query('INSERT INTO courses (course_name) VALUES (?)', [course_name]);
        res.status(201).json({ message: 'Course created successfully', id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const { course_name } = req.body;
        const [result] = await db.query('UPDATE courses SET course_name = ? WHERE course_id = ?', [course_name, id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Course not found' });
        res.json({ message: 'Course updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await db.query('DELETE FROM courses WHERE course_id = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Course not found' });
        res.json({ message: 'Course deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
