import { api } from "./index";

// Get all coordinators
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

// Get all staff users
export const getStaff = async () => {
  try {
    const res = await api.get("/auth/users");
    const users = Array.isArray(res.data) ? res.data : res.data.users || [];
    return users.filter((u) => u.role?.toLowerCase() === "staff");
  } catch (error) {
    console.error("Error fetching staff:", error.response?.data || error.message);
    return [];
  }
};
