const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const multer = require('multer');
const scheduleController = require('../controllers/scheduleController');
const { verifyToken, isCoordinator, isStaff } = require('../middleware/roleMiddleware');

// ======= MULTER MEMORY STORAGE (for Excel/PDF/Docs) =======
const upload = multer({ storage: multer.memoryStorage() });

// ====== Validation for schedule creation/updating ======
const validateSchedule = [
  body('course_id').isInt().withMessage('course_id required'),
  body('module_id').isInt().withMessage('module_id required'),
  body('date').isISO8601().withMessage('date required (YYYY-MM-DD)'),
  body('start_time').matches(/^\d{2}:\d{2}(:\d{2})?$/).withMessage('start_time HH:MM[:SS]'),
  body('end_time').matches(/^\d{2}:\d{2}(:\d{2})?$/).withMessage('end_time HH:MM[:SS]'),
  body('type').isIn(['Lecture','Lab']).withMessage('type must be Lecture or Lab'),
  body('faculty_id').isInt().withMessage('faculty_id required')
];

// ===== Coordinator Routes =====
router.get('/export', verifyToken, isCoordinator, scheduleController.exportSchedules);

// Upload Excel (Memory storage + Cloudinary)
router.post(
  '/upload',
  verifyToken,
  isCoordinator,
  upload.single('file'), // key must match form-data
  scheduleController.uploadScheduleExcel
);

router.get('/uploads/list', verifyToken, isCoordinator, scheduleController.getScheduleUploads);
router.post('/', verifyToken, isCoordinator, validateSchedule, scheduleController.addSchedule);
router.put('/:id', verifyToken, isCoordinator, validateSchedule, scheduleController.updateSchedule);
router.delete('/:id', verifyToken, isCoordinator, scheduleController.removeSchedule);
router.get('/', verifyToken, isCoordinator, scheduleController.getAllSchedule);

// ===== Staff Routes =====
router.get('/export/staff/:staffId', verifyToken, isStaff, scheduleController.exportSchedulesByStaff);
router.get('/staff/:staffId', verifyToken, isStaff, scheduleController.getSchedulesByStaff);
router.get('/search', verifyToken, scheduleController.searchSchedule);
router.get('/:id', verifyToken, scheduleController.getOneSchedule);
router.get('/staff/:staffId/available', verifyToken, isStaff, scheduleController.getAvailableSchedulesForStaff);

module.exports = router;
