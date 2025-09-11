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
