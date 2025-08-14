// models/Staff.js
const db = require('../config/db');

// find user by email
exports.findByEmail = async (email) => {
    const [rows] = await db.query("SELECT * FROM staff WHERE email = ?", [email]);
    return rows[0];
};
// create user
exports.createUser = async (name, email,username, hashedPassword, role) => {
    const [result] = await db.query(
        "INSERT INTO staff (name, email,username, password, role) VALUES (?, ?, ?, ?, ?)",
        [name, email,username, hashedPassword, role]
    );
    return result.insertId;
};

//get all users
exports.getAllUsers = async () => {
    const [rows] = await db.query("SELECT staff_id, name, email, username, role FROM staff");
    return rows;
};

// Get user by ID
exports.getUserById = async (id) => {
    const [rows] = await db.query("SELECT staff_id, name, email, username, role FROM staff WHERE staff_id = ?", [id]);
    return rows[0];
};

// Update user
exports.updateUser = async (id, name, email, username, role) => {
    const [result] = await db.query(
        "UPDATE staff SET name = ?, email = ?, username = ?, role = ? WHERE staff_id = ?",
        [name, email, username, role, id]
    );
    return result.affectedRows;
};

// Delete user
exports.deleteUser = async (id) => {
    const [result] = await db.query("DELETE FROM staff WHERE staff_id = ?", [id]);
    return result.affectedRows;
};