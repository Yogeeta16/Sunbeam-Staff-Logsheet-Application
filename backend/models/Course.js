const db = require('../config/db');

const Course = {
    // Get all courses with coordinator info
    getAll: async () => {
        const [rows] = await db.query(`
            SELECT c.course_id, c.course_name, c.modules_count, c.status, 
                   s.staff_id AS coordinator_id, s.name AS coordinator_name
            FROM courses c
            JOIN staff s ON c.coordinator_id = s.staff_id
        `);
        return rows;
    },

    // Get course by ID
    getById: async (id) => {
        const [rows] = await db.query(`
            SELECT c.course_id, c.course_name, c.modules_count, c.status, 
                   s.staff_id AS coordinator_id, s.name AS coordinator_name
            FROM courses c
            JOIN staff s ON c.coordinator_id = s.staff_id
            WHERE c.course_id = ?
        `, [id]);
        return rows[0];
    },

    // Create a new course
    create: async (course_name, coordinator_id, status = 'Active') => {
        const [result] = await db.query(
            `INSERT INTO courses (course_name, coordinator_id, modules_count, status) 
             VALUES (?, ?, ?, ?)`,
            [course_name, coordinator_id, 0, status]
        );
        return result.insertId;
    },

    // Update course by ID
    updateById: async (id, course_name, coordinator_id, status) => {
        const [result] = await db.query(
            `UPDATE courses 
             SET course_name = ?, coordinator_id = ?, status = ?
             WHERE course_id = ?`,
            [course_name, coordinator_id, status, id]
        );
        return result.affectedRows;
    },

    // Delete course
    deleteById: async (id) => {
        const [result] = await db.query(
            'DELETE FROM courses WHERE course_id = ?', 
            [id]
        );
        return result.affectedRows;
    },

    // Increment modules_count
    incrementModules: async (course_id) => {
        await db.query(
            'UPDATE courses SET modules_count = modules_count + 1 WHERE course_id = ?',
            [course_id]
        );
    },
      // ✅ Decrement modules_count
    decrementModules: async (course_id) => {
        await db.query(
            'UPDATE courses SET modules_count = GREATEST(modules_count - 1, 0) WHERE course_id = ?',
            [course_id]
        );
    }
};

module.exports = Course;
