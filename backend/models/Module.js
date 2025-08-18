const db = require('../config/db');

exports.getAllModules = async () => {
    const [rows] = await db.query(`
        SELECT m.*, c.course_name 
        FROM modules m
        JOIN courses c ON m.course_id = c.course_id
    `);
    return rows;
};

exports.getModuleById = async (id) => {
    const [rows] = await db.query(`
        SELECT m.*, c.course_name 
        FROM modules m
        JOIN courses c ON m.course_id = c.course_id
        WHERE m.module_id = ?
    `, [id]);
    return rows[0];
};

exports.createModule = async (course_id, module_name, curriculum_file_path) => {
    const [result] = await db.query(`
        INSERT INTO modules (course_id, module_name, curriculum_file_path) 
        VALUES (?, ?, ?)
    `, [course_id, module_name, curriculum_file_path || null]);
    return result.insertId;
};

exports.updateModule = async (id, course_id, module_name, curriculum_file_path) => {
    const [result] = await db.query(`
        UPDATE modules 
        SET course_id = ?, module_name = ?, curriculum_file_path = ? 
        WHERE module_id = ?
    `, [course_id, module_name, curriculum_file_path || null, id]);
    return result.affectedRows;
};

exports.deleteModule = async (id) => {
    const [result] = await db.query(`
        DELETE FROM modules WHERE module_id = ?
    `, [id]);
    return result.affectedRows;
};
