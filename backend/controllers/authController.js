const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/Staff');

//Signup User (only core fields)
exports.signup = async (req, res) => {
    try {
        const { name, email, username, password, role } = req.body;

        // check if user exists
        const existingUser = await userModel.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user in DB (other fields remain NULL/default)
        const userId = await userModel.createUser(name, email, username, hashedPassword, role);

        res.status(201).json({ message: "User created successfully", userId });

    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

//Login User
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findByEmail(email);
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { id: user.staff_id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({
            message: "Login successful",
            token,
            role: user.role,
            id: user.staff_id
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.getAllUsers();
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await userModel.getUserById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        console.error("Get user error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

//Update user (can add extra details here)
exports.updateUser = async (req, res) => {
    try {
        const { name, email, username, role, phone_number, department, office_location, joined_date } = req.body;

        const updated = await userModel.updateUser(
            req.params.id,
            name,
            email,
            username,
            role,
            phone_number,
            department,
            office_location,
            joined_date
        );

        if (!updated) return res.status(404).json({ message: "User not found" });
        res.json({ message: "User updated successfully" });
    } catch (error) {
        console.error("Update error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    try {
        const deleted = await userModel.deleteUser(req.params.id);
        if (!deleted) return res.status(404).json({ message: "User not found" });
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Delete error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Update Password (self only)
exports.updatePassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { oldPassword, newPassword } = req.body;

        // Only allow self-update
        if (req.user.id !== parseInt(id)) {
            return res.status(403).json({ message: "Access denied: you can only update your own password" });
        }

        if (!oldPassword || !newPassword) {
            return res.status(400).json({ message: "Both oldPassword and newPassword are required" });
        }

        if (oldPassword === newPassword) {
            return res.status(400).json({ message: "New password must be different from old password" });
        }

        // Fetch user by ID
       const user = await userModel.getUserPassById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Verify old password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Old password is incorrect" });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update DB
        const updated = await userModel.updatePassword(id, hashedPassword);
        if (!updated) {
            return res.status(500).json({ message: "Password update failed" });
        }

        res.status(200).json({ message: "Password updated successfully" });

    } catch (error) {
        console.error("Error updating password:", error);
        res.status(500).json({ message: "Server error" });
    }
};
