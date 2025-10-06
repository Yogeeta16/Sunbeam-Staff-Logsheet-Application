import { api } from "./index";

// Fetch all modules
export const getModules = async () => {
  try {
    const res = await api.get("/modules", { headers: { "Cache-Control": "no-cache" } });
    return res.data;
  } catch (error) {
    console.error("Error fetching modules:", error.response?.data || error.message);
    return [];
  }
};

// Fetch module by ID
export const getModuleById = async (id) => {
  try {
    const res = await api.get(`/modules/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching module ID ${id}:`, error.response?.data || error.message);
    return null;
  }
};

// Create a new module (expects FormData)
export const createModule = async (formData) => {
  try {
    const res = await api.post("/modules", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    console.error("Error creating module:", error.response?.data || error.message);
    throw error;
  }
};

// Update an existing module (expects FormData)
export const updateModule = async (id, formData) => {
  try {
    const res = await api.put(`/modules/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    console.error(`Error updating module ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

// Delete a module by ID
export const deleteModule = async (id) => {
  try {
    const res = await api.delete(`/modules/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error deleting module ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

// Download or open a file
export const downloadOption = (fileUrl, openInNewTab = false) => {
  if (!fileUrl) return;

  if (openInNewTab) {
    window.open(fileUrl, "_blank");
  } else {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileUrl.split("/").pop();
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
};
