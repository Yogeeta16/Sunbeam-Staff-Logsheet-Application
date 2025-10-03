import axios from "axios";

// API base URLs
const API_BASE_URL = "https://sunbeam-staff-logsheet-application-backend-production.up.railway.app/api";
export const API_DOWNLOAD_URL = "https://sunbeam-staff-logsheet-application-backend-production.up.railway.app";

// Axios instance for API calls
export const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to Authorization header if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});
