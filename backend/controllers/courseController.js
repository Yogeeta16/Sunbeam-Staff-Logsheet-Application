const Course = require('../models/Course');

//  List all courses
exports.listCourses = async (req, res) => {
    try {
        const courses = await Course.getAll();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//  Get a single course by ID
exports.getCourseById = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course.getById(id);

        if (!course) return res.status(404).json({ message: 'Course not found' });
        res.json(course);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//  Create new course
exports.createCourse = async (req, res) => {
    try {
        const { course_name, coordinator_id, status } = req.body;

        if (!course_name || !coordinator_id) {
            return res.status(400).json({ message: 'Course name and coordinator_id are required' });
        }

        const courseId = await Course.create(course_name, coordinator_id, status);
        res.status(201).json({ message: 'Course created successfully', id: courseId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//  Update course info
exports.updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const { course_name, coordinator_id, status } = req.body;

        const updated = await Course.updateById(id, course_name, coordinator_id, status);
        if (updated === 0) return res.status(404).json({ message: 'Course not found' });

        res.json({ message: 'Course updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//  Delete course
exports.deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Course.deleteById(id);

        if (deleted === 0) return res.status(404).json({ message: 'Course not found' });
        res.json({ message: 'Course deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getCoordinatorCourses = async (req, res) => {
  try {
    const coordinatorId = req.user.id; // from JWT
    const courses = await Course.getCoursesByCoordinatorId(coordinatorId);

    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching courses" });
  }
};