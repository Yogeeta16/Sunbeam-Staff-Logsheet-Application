const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/Staff');

// Signup User
exports.signup = async (req, res) => {
    try {
        const { name, email, username ,password, role } = req.body;

        const existingUser = await userModel.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const userId = await userModel.createUser(name, email,username, hashedPassword, role);

            res.status(201).json({ message: "User created successfully", userId });
        } 
    }catch (error) {
            res.status(500).json({ message: "Server error", error });
        }



    
};

// LOgin user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // find user in DB
        const user = await userModel.findByEmail(email);
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // compare password with hashed password from DB
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // generate token
        const token = jwt.sign(
            { id: user.staff_id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({ message: "Login successful", token, role: user.role ,id: user.staff_id});

    } catch (error) {
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
        res.status(500).json({ message: "Server error" });
    }
};

// Update user
exports.updateUser = async (req, res) => {
    try {
        const { name, email, username, role } = req.body;
        const updated = await userModel.updateUser(req.params.id, name, email, username, role);
        if (!updated) return res.status(404).json({ message: "User not found" });
        res.json({ message: "User updated successfully" });
    } catch (error) {
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
        res.status(500).json({ message: "Server error" });
    }
};