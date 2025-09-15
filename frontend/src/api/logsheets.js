import { api } from "./index";

// Fetch all logsheets (staff = own, coordinator = all)
export const getLogsheets = async () => {
  try {
    const { data } = await api.get("/logsheets");
    return data;
  } catch (err) {
    console.error("Error fetching logsheets:", err);
    throw err;
  }
};

// Fetch logsheet by ID
export const getLogsheetById = async (id) => {
  try {
    const { data } = await api.get(`/logsheets/${id}`);
    return data;
  } catch (err) {
    console.error(`Error fetching logsheet ${id}:`, err);
    throw err;
  }
};

// Create new logsheet (staff only)
export const createLogsheet = async (logsheetData) => {
  try {
    const { data } = await api.post("/logsheets", logsheetData);
    return data;
  } catch (err) {
    console.error("Error creating logsheet:", err);
    throw err;
  }
};

// Update logsheet (staff only, if status is Pending)
export const updateLogsheet = async (id, logsheetData) => {
  try {
    const { data } = await api.put(`/logsheets/${id}`, logsheetData);
    return data;
  } catch (err) {
    console.error(`Error updating logsheet ${id}:`, err);
    throw err;
  }
};

// Delete logsheet (staff only, if status is Pending)
export const deleteLogsheet = async (id) => {
  try {
    const { data } = await api.delete(`/logsheets/${id}`);
    return data;
  } catch (err) {
    console.error(`Error deleting logsheet ${id}:`, err);
    throw err;
  }
};

// Approve or reject logsheet (coordinator only)
export const updateLogsheetStatus = async (id, status) => {
  try {
    const { data } = await api.put(`/logsheets/${id}/status`, { status });
    return data;
  } catch (err) {
    console.error(`Error updating logsheet status ${id}:`, err);
    throw err;
  }
};
