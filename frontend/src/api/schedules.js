import { api } from "./index";

// Fetch all uploaded schedules list
export const getAllSchedulesUploads = async () => {
  try {
    const res = await api.get("/schedules/uploads/list");
    return res.data; 
  } catch (err) {
    console.error("Error fetching schedules:", err.response?.data || err.message);
    throw err;
  }
};

// Fetch all schedules (for coordinator or admin)
export const getSchedules = async () => {
  try {
    const res = await api.get("/schedules");
    return res.data || [];
  } catch (error) {
    console.error("Error fetching schedules:", error.response?.data || error.message);
    return [];
  }
};

// Fetch schedules for a specific staff
export const getSchedulesByStaff = async (staffId) => {
  try {
    const res = await api.get(`/schedules/staff/${staffId}`);
    return res.data || [];
  } catch (error) {
    if (error.response?.status === 404) {
      console.warn(`No schedules found for staff ID ${staffId}`);
      return [];
    }
    console.error(`Error fetching schedules for staff ${staffId}:`, error.response?.data || error.message);
    return [];
  }
};

// Fetch schedule by ID
export const getScheduleById = async (id) => {
  try {
    const res = await api.get(`/schedules/${id}`);
    return res.data || null;
  } catch (error) {
    console.error(`Error fetching schedule ID ${id}:`, error.response?.data || error.message);
    return null;
  }
};

// Create a new schedule
export const createSchedule = async (scheduleData) => {
  try {
    const res = await api.post("/schedules", scheduleData);
    return res.data;
  } catch (error) {
    console.error("Error creating schedule:", error.response?.data || error.message);
    throw error;
  }
};

// Update an existing schedule
export const updateSchedule = async (id, scheduleData) => {
  try {
    const res = await api.put(`/schedules/${id}`, scheduleData);
    return res.data;
  } catch (error) {
    console.error(`Error updating schedule ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

// Delete a schedule
export const deleteSchedule = async (id) => {
  try {
    const res = await api.delete(`/schedules/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error deleting schedule ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

// Upload schedules via Excel file
export const uploadSchedules = async (file) => {
  if (!file) throw new Error("No file provided for upload");
  try {
    const formData = new FormData();
    formData.append("file", file);
    const res = await api.post("/schedules/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    console.error("Error uploading schedules:", error.response?.data || error.message);
    throw error;
  }
};

// Export schedules (all or by staff ID) to Excel
export const exportSchedules = async (staffId = null) => {
  try {
    const endpoint = staffId ? `/schedules/export/staff/${staffId}` : "/schedules/export";
    const res = await api.get(endpoint, { responseType: "blob" });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", staffId ? `schedules_staff_${staffId}.xlsx` : "schedules.xlsx");
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("Error exporting schedules:", error.response?.data || error.message);
    throw error;
  }
};

// Fetch schedules available for staff (not yet logged in logsheet)
export const getAvailableSchedulesByStaff = async (staffId) => {
  try {
    const res = await api.get(`/schedules/staff/${staffId}/available`);
    return res.data || [];
  } catch (error) {
    if (error.response?.status === 404) {
      console.warn(`No available schedules for staff ID ${staffId}`);
      return [];
    }
    console.error(`Error fetching available schedules for staff ${staffId}:`, error.response?.data || error.message);
    return [];
  }
};

// Fetch schedules based on user role (coordinator or staff)
export const fetchSchedulesApi = async (user, isCoordinator) => {
  if (isCoordinator) return await getSchedules();
  return await getSchedulesByStaff(user.id);
};
