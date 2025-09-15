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

// Get all staff (raw list without filtering)
export const getAllStaff = async () => {
  try {
    const res = await api.get("/auth/users");
    return res.data;
  } catch (err) {
    console.error("Error fetching staff:", err.response?.data || err.message);
    return [];
  }
};

// Get staff by ID
export const getStaffById = async (id) => {
  try {
    const res = await api.get(`/auth/users/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Error fetching staff ${id}:`, err.response?.data || err.message);
    return null;
  }
};

// Update staff by ID
export const updateStaff = async (id, staffData) => {
  try {
    const res = await api.put(`/auth/users/${id}`, staffData);
    return res.data;
  } catch (err) {
    console.error(`Error updating staff ${id}:`, err.response?.data || err.message);
    throw err;
  }
};

// Delete staff by ID
export const deleteStaff = async (id) => {
  try {
    const res = await api.delete(`/auth/users/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Error deleting staff ${id}:`, err.response?.data || err.message);
    throw err;
  }
};

// Update staff password by ID
export const updatePassword = async (id, oldPassword, newPassword) => {
  try {
    const res = await api.put(`/auth/users/${id}/password`, {
      oldPassword,
      newPassword,
    });
    return res.data;
  } catch (err) {
    console.error(`Error updating password for staff ${id}:`, err.response?.data || err.message);
    throw err;
  }
};
