import { api } from "./index";

// Fetch all courses
export const getCourses = async () => {
  try {
    const res = await api.get("/courses");
    return res.data;
  } catch (error) {
    console.error("Error fetching courses:", error.response?.data || error.message);
    return [];
  }
};

// Fetch course by ID
export const getCourseById = async (id) => {
  try {
    const res = await api.get(`/courses/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching course ID ${id}:`, error.response?.data || error.message);
    return null;
  }
};

// Create a new course
export const createCourse = async (courseData) => {
  try {
    const res = await api.post("/courses", courseData);
    return res.data;
  } catch (error) {
    console.error("Error creating course:", error.response?.data || error.message);
    throw error;
  }
};

// Fetch courses assigned to the logged-in coordinator
export const getCoordinatorCourses = async () => {
  try {
    const res = await api.get("/courses/coordinator/courses");
    return res.data || [];
  } catch (error) {
    console.error("Error fetching coordinator courses:", error.response?.data || error.message);
    return [];
  }
};

// Update a course by ID
export const updateCourse = async (id, courseData) => {
  try {
    const res = await api.put(`/courses/${id}`, courseData);
    return res.data;
  } catch (error) {
    console.error(`Error updating course ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

// Delete a course by ID
export const deleteCourse = async (id) => {
  try {
    const res = await api.delete(`/courses/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error deleting course ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};
