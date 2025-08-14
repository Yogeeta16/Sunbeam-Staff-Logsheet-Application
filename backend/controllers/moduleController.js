// backend/controllers/moduleController.js
const Module = require('../models/Module');

exports.listModules = async (req, res) => {
    try {
        const modules = await Module.getAllModules();
        res.json(modules);
    } catch (error) {
        console.error("Error fetching modules:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getModule = async (req, res) => {
    try {
        const { id } = req.params;
        const module = await Module.getModuleById(id);

        if (!module) {
            return res.status(404).json({ message: 'Module not found' });
        }
        res.json(module);
    } catch (error) {
        console.error("Error fetching module:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.createModule = async (req, res) => {
    try {
        const { course_id, module_name, curriculum_file_path } = req.body;

        if (!course_id || !module_name) {
            return res.status(400).json({ message: "course_id and module_name are required" });
        }

        const insertId = await Module.createModule(course_id, module_name, curriculum_file_path);
        res.status(201).json({ message: "Module created successfully", module_id: insertId });
    } catch (error) {
        console.error("Error creating module:", error);
        res.status(500).json({ message: error.sqlMessage || error.message });
    }
};

exports.updateModule = async (req, res) => {
    try {
        const { id } = req.params;
        const { course_id, module_name, curriculum_file_path } = req.body;

        const affectedRows = await Module.updateModule(id, course_id, module_name, curriculum_file_path);
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Module not found' });
        }
        res.json({ message: 'Module updated successfully' });
    } catch (error) {
        console.error("Error updating module:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.deleteModule = async (req, res) => {
    try {
        const { id } = req.params;

        const affectedRows = await Module.deleteModule(id);
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Module not found' });
        }
        res.json({ message: 'Module deleted successfully' });
    } catch (error) {
        console.error("Error deleting module:", error);
        res.status(500).json({ message: "Server error" });
    }
};

