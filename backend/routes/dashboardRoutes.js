const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");
const { verifyToken, isCoordinator ,isStaff} = require('../middleware/roleMiddleware');

// Coordinator Dashboard
router.get('/coordinator', verifyToken, isCoordinator, dashboardController.getCoordinatorDashboard);

// Staff Dashboard
router.get('/staff', verifyToken, isStaff, dashboardController.getStaffDashboard);

module.exports = router;
