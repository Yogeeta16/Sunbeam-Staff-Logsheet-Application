import { api } from "./index";

// Fetch coordinator dashboard data
export const getCoordinatorDashboard = async () => {
  try {
    const res = await api.get("/dashboard/coordinator");
    return res.data;
  } catch (error) {
    console.error("Error fetching coordinator dashboard:", error.response?.data || error.message);
    return null;
  }
};

// Fetch staff dashboard data
export const getStaffDashboard = async () => {
  try {
    const res = await api.get("/dashboard/staff");
    return res.data;
  } catch (error) {
    console.error("Error fetching staff dashboard:", error.response?.data || error.message);
    return null;
  }
};
