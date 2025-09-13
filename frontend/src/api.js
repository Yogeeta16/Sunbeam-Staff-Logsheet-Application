// src/api.js
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add Authorization header automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

// ---------------- Users ----------------
// ✅ Get all coordinators
export const getCoordinators = async () => {
  try {
    const res = await api.get("/auth/users");
    const users = Array.isArray(res.data) ? res.data : res.data.users || [];
    return users.filter((u) => u.role?.toLowerCase() === "coordinator");
  } catch (error) {
    console.error("Error fetching coordinators:", error.response?.data || error.message);
    return [];
  }
};

// ---------------- Dashboard ----------------
export const getCoordinatorDashboard = async () => {
  try {
    const res = await api.get("/dashboard/coordinator");
    return res.data;
  } catch (error) {
    console.error("Error fetching coordinator dashboard:", error.response?.data || error.message);
    return null;
  }
};

export const getStaffDashboard = async () => {
  try {
    const res = await api.get("/dashboard/staff");
    return res.data;
  } catch (error) {
    console.error("Error fetching staff dashboard:", error.response?.data || error.message);
    return null;
  }
};

// ---------------- Courses ----------------
export const getCourses = async () => {
  try {
    const res = await api.get("/courses");
    return res.data;
  } catch (error) {
    console.error("Error fetching courses:", error.response?.data || error.message);
    return [];
  }
};

export const getCourseById = async (id) => {
  try {
    const res = await api.get(`/courses/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching course ID ${id}:`, error.response?.data || error.message);
    return null;
  }
};

export const createCourse = async (courseData) => {
  try {
    const res = await api.post("/courses", courseData);
    return res.data;
  } catch (error) {
    console.error("Error creating course:", error.response?.data || error.message);
    throw error;
  }
};

export const updateCourse = async (id, courseData) => {
  try {
    const res = await api.put(`/courses/${id}`, courseData);
    return res.data;
  } catch (error) {
    console.error(`Error updating course ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

export const deleteCourse = async (id) => {
  try {
    const res = await api.delete(`/courses/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error deleting course ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};
