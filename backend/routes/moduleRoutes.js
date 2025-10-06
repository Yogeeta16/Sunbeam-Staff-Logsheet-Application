const express = require('express');
const router = express.Router();
const moduleController = require('../controllers/moduleController');
const multer = require('multer');
const { verifyToken, isCoordinator } = require('../middleware/roleMiddleware');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { cloudinary } = require('../cloudinary'); // Make sure cloudinary.js is configured

/* ======= OLD LOCAL DISK STORAGE (Commented Out) =======
// const path = require('path');
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/modules/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// });
// const upload = multer({ storage });
======================================================== */

// ======= NEW CLOUDINARY STORAGE =======
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'modules', // Cloudinary folder
        allowed_formats: ['pdf', 'docx', 'pptx', 'jpg', 'png'], // allowed file types
    },
});

const upload = multer({ storage });

// ======= ROUTES =======
// Staff can view
router.get('/', verifyToken, moduleController.listModules);
router.get('/:id', verifyToken, moduleController.getModule);

// Only Coordinator can create, update, delete
router.post('/', verifyToken, isCoordinator, upload.single('curriculum_file'), moduleController.createModule);
router.put('/:id', verifyToken, isCoordinator, upload.single('curriculum_file'), moduleController.updateModule);
router.delete('/:id', verifyToken, isCoordinator, moduleController.deleteModule);

module.exports = router;
