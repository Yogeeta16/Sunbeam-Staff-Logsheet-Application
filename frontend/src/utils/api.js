import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // must match your .env
});

// Attach token automatically to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export default api;
