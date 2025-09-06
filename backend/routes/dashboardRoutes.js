const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");
const { verifyToken, isCoordinator ,isStaff} = require('../middleware/roleMiddleware');

// Coordinator Dashboard
router.get('/coordinator', verifyToken, isCoordinator, dashboardController.getCoordinatorDashboard);

// Staff Dashboard
router.get('/staff', verifyToken, isStaff, dashboardController.getStaffDashboard);

// Hours APIs
router.get("/hours/staff", dashboardController.getStaffHours);
router.get("/hours/course", dashboardController.getCourseHours);
router.get("/hours/module", dashboardController.getModuleHours);

// Logs APIs
router.get("/logs/filter", dashboardController.filterLogs);
router.get("/logs/pending", dashboardController.getPendingLogs);

module.exports = router;
