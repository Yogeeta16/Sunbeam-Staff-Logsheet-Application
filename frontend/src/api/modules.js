import { api } from "./index";

// Fetch all modules
export const getModules = async () => {
  try {
    const res = await api.get("/modules", {
      headers: { "Cache-Control": "no-cache" } // bypass browser cache
    });
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

// Create a new module (with optional curriculum file upload)
export const createModule = async (moduleData, file) => {
  try {
    const formData = new FormData();
    formData.append("course_id", moduleData.course_id);
    formData.append("module_name", moduleData.module_name);
    if (file) formData.append("curriculum_file", file);

    const res = await api.post("/modules", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    console.error("Error creating module:", error.response?.data || error.message);
    throw error;
  }
};

// Update an existing module (with optional curriculum file upload)
export const updateModule = async (id, moduleData, file) => {
  try {
    const formData = new FormData();
    formData.append("course_id", moduleData.course_id);
    formData.append("module_name", moduleData.module_name);
    if (file) formData.append("curriculum_file", file);

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
