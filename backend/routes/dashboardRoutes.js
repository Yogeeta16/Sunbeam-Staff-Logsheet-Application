const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");

// Hours APIs
router.get("/hours/staff", dashboardController.getStaffHours);
router.get("/hours/course", dashboardController.getCourseHours);
router.get("/hours/module", dashboardController.getModuleHours);

// Logs APIs
router.get("/logs/filter", dashboardController.filterLogs);
router.get("/logs/pending", dashboardController.getPendingLogs);

module.exports = router;
