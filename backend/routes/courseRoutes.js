// backend/routes/courseRoutes.js
const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { verifyToken, isCoordinator } = require('../middleware/roleMiddleware');

// Staff can view
router.get('/', verifyToken, courseController.listCourses);
router.get('/:id', verifyToken, courseController.getCourseById);

// Only Coordinator can create, update, delete
router.post('/', verifyToken, isCoordinator, courseController.createCourse);
router.put('/:id', verifyToken, isCoordinator, courseController.updateCourse);
router.delete('/:id', verifyToken, isCoordinator, courseController.deleteCourse);
router.get("/coordinator/courses", verifyToken, isCoordinator, courseController.getCoordinatorCourses);

module.exports = router;
