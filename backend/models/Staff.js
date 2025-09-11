const db = require('../config/db');

// Find staff by email
exports.findByEmail = async (email) => {
    const [rows] = await db.query("SELECT * FROM staff WHERE email = ?", [email]);
    return rows[0];
};

// Create staff user
exports.createUser = async (name, email, username, hashedPassword, role, phone_number, department, office_location, joined_date) => {
    const [result] = await db.query(
        `INSERT INTO staff (name, email, username, password, role, phone_number, department, office_location, joined_date) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [name, email, username, hashedPassword, role, phone_number || null, department || null, office_location || null, joined_date || null]
    );
    return result.insertId;
};

// Get all users
exports.getAllUsers = async () => {
    const [rows] = await db.query(
        "SELECT staff_id, name, email, username, role, phone_number, department, office_location, joined_date FROM staff"
    );
    return rows;
};

// Get user by ID
exports.getUserById = async (id) => {
    const [rows] = await db.query(
        "SELECT staff_id, name, email, username, role, phone_number, department, office_location, joined_date FROM staff WHERE staff_id = ?", 
        [id]
    );
    return rows[0];
};

// Update user
exports.updateUser = async (id, name, email, username, role, phone_number, department, office_location, joined_date) => {
    const [result] = await db.query(
        `UPDATE staff 
         SET name = ?, email = ?, username = ?, role = ?, phone_number = ?, department = ?, office_location = ?, joined_date = ?
         WHERE staff_id = ?`,
        [name, email, username, role, phone_number, department, office_location, joined_date, id]
    );
    return result.affectedRows;
};

// Delete user
exports.deleteUser = async (id) => {
    const [result] = await db.query("DELETE FROM staff WHERE staff_id = ?", [id]);
    return result.affectedRows;
};

 exports.getUserPassById = async (id) => {
  const [rows] = await db.query(
    "SELECT staff_id, name, email, role, username, password FROM staff WHERE staff_id = ?",
    [id]
  );
  return rows[0];
};

exports.updatePassword = async (id, hashedPassword) => {
    const [result] = await db.query(
        "UPDATE staff SET password = ? WHERE staff_id = ?",
        [hashedPassword, id]
    );
    return result.affectedRows;
};