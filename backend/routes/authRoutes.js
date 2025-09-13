// authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken, isCoordinator } = require('../middleware/roleMiddleware');

// Public routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);

// Protected routes
// Only Coordinators can view ALL users
router.get('/users', verifyToken, authController.getAllUsers);

// All logged-in users can view their own profile OR Coordinators can view any
router.get('/users/:id', verifyToken, authController.getUserById);

// All logged-in users can update their own profile OR Coordinators can update any
router.put('/users/:id', verifyToken, authController.updateUser);

// Only Coordinators can delete
router.delete('/users/:id', verifyToken, isCoordinator, authController.deleteUser);

// Logged-in user can update their own password
router.put('/users/:id/password', verifyToken, authController.updatePassword);

module.exports = router;
