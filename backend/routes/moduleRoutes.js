const express = require('express');
const router = express.Router();
const moduleController = require('../controllers/moduleController');
const { verifyToken, isCoordinator } = require('../middleware/roleMiddleware');
const multer = require('multer');
const { moduleStorage } = require('../cloudinary');
const upload = multer({ storage: moduleStorage });

// Staff can view
router.get('/', verifyToken, moduleController.listModules);
router.get('/:id', verifyToken, moduleController.getModule);

// Coordinator can create, update, delete

router.post(
  '/',
  verifyToken,
  isCoordinator,
  upload.single('curriculum_file'), // 🔹 must match form-data key
  moduleController.createModule
);
router.put('/:id', verifyToken, isCoordinator, upload.single('curriculum_file'), moduleController.updateModule);
router.delete('/:id', verifyToken, isCoordinator, moduleController.deleteModule);

module.exports = router;
