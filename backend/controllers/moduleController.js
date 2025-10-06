const Module = require('../models/Module');
const Course = require('../models/Course'); 
const { cloudinary } = require('../cloudinary'); // ⬅️ Cloudinary setup

exports.listModules = async (req, res) => {
    try {
      res.set('Cache-Control', 'no-store');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
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

// 🔹 Create Module with Cloudinary
exports.createModule = async (req, res) => {
  try {
    const course_id = req.body.course_id ? parseInt(req.body.course_id, 10) : null;
    const module_name = req.body.module_name;

    if (!course_id || !module_name) {
      return res.status(400).json({ message: "course_id and module_name are required" });
    }

    // 🔹 Use URL from multer-storage-cloudinary
    let curriculum_file_url = req.file?.path || null;

    const insertId = await Module.createModule(course_id, module_name, curriculum_file_url);

    await Course.incrementModules(course_id);

    res.status(201).json({
      message: "Module created successfully",
      module_id: insertId,
      curriculum_file: curriculum_file_url
    });
  } catch (error) {
    console.error("Error creating module:", error);
    res.status(500).json({ message: error.sqlMessage || error.message });
  }
};


// 🔹 Delete Module
exports.deleteModule = async (req, res) => {
    try {
        const { id } = req.params;
        const module = await Module.getModuleById(id);
        if (!module) return res.status(404).json({ message: 'Module not found' });

        const affectedRows = await Module.deleteModule(id);
        if (affectedRows === 0) return res.status(404).json({ message: 'Module not found' });

        await Course.decrementModules(module.course_id);
        res.json({ message: 'Module deleted successfully' });
    } catch (error) {
        console.error("Error deleting module:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// 🔹 Update Module with Cloudinary
exports.updateModule = async (req, res) => {
  try {
    const { id } = req.params;
    const { course_id, module_name } = req.body;
    const newCourseId = course_id ? parseInt(course_id, 10) : null;

    const module = await Module.getModuleById(id);
    if (!module) return res.status(404).json({ message: 'Module not found' });

    const oldCourseId = module.course_id;

    // 🔹 Use multer-cloudinary uploaded URL
    let curriculum_file_url = req.file?.path || module.curriculum_file_path;

    const affectedRows = await Module.updateModule(
      id,
      newCourseId || oldCourseId,
      module_name || module.module_name,
      curriculum_file_url
    );

    if (affectedRows === 0) return res.status(404).json({ message: 'Module not found' });

    if (newCourseId && newCourseId !== oldCourseId) {
      await Course.decrementModules(oldCourseId);
      await Course.incrementModules(newCourseId);
    }

    res.json({ message: 'Module updated successfully', curriculum_file: curriculum_file_url });
  } catch (error) {
    console.error("Error updating module:", error);
    res.status(500).json({ message: error.sqlMessage || error.message });
  }
};

