// backend/routes/moduleRoutes.js
const express = require('express');
const router = express.Router();
const moduleController = require('../controllers/moduleController');

// List all modules
router.get('/', moduleController.listModules);

// Get module by ID
router.get('/:id', moduleController.getModule);

// Create module
router.post('/', moduleController.createModule);

// Update module
router.put('/:id', moduleController.updateModule);

// Delete module
router.delete('/:id', moduleController.deleteModule);

module.exports = router;

