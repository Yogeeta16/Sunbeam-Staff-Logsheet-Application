const express = require('express');
const router = express.Router();
const moduleController = require('../controllers/moduleController');
const multer = require('multer');
const path = require('path');
const { verifyToken, isCoordinator } = require('../middleware/roleMiddleware');  // ⬅️ Import middleware

// File storage config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/modules/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Staff can view
router.get('/', verifyToken, moduleController.listModules);
router.get('/:id', verifyToken, moduleController.getModule);

// Only Coordinator can create, update, delete
router.post('/', verifyToken, isCoordinator, upload.single('curriculum_file'), moduleController.createModule);
router.put('/:id', verifyToken, isCoordinator, upload.single('curriculum_file'), moduleController.updateModule);
router.delete('/:id', verifyToken, isCoordinator, moduleController.deleteModule);

module.exports = router;
