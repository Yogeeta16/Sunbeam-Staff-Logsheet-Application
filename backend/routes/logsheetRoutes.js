const express = require('express');
const router = express.Router();
const logsheetController = require('../controllers/logsheetController');
const { verifyToken, isCoordinator, isStaff } = require('../middleware/roleMiddleware');

// Staff & Coordinator
router.get('/', verifyToken, logsheetController.getAllLogs);
router.get('/:id', verifyToken, logsheetController.getLogById);

// Staff only
router.post('/', verifyToken, isStaff, logsheetController.createLog);
router.put('/:id', verifyToken, isStaff, logsheetController.updateLog);
router.delete('/:id', verifyToken, isStaff, logsheetController.deleteLog);

// Coordinator only
router.put('/:id/status', verifyToken, isCoordinator, logsheetController.changeLogStatus);

module.exports = router;
