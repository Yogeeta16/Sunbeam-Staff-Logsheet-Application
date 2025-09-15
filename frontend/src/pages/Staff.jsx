import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { StaffHeader } from "../components/staff/StaffHeader";
import { StaffTable } from "../components/staff/StaffTable";
import { StaffModal } from "../components/modals/StaffModal";
import { getAllStaff, deleteStaff } from "../api/staff";

const Staff = () => {
  const { user } = useAuth();
  const isCoordinator = user?.role?.toLowerCase() === "coordinator";

  const [staffList, setStaffList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const fetchStaff = async () => {
    const data = await getAllStaff();
    setStaffList(data);
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const filteredStaff = staffList.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (staff) => {
    setSelectedStaff(staff);
    setIsModalOpen(true);
  };

  const handleDelete = async (staff) => {
    if (!confirm(`Are you sure you want to delete ${staff.name}?`)) return;
    try {
      await deleteStaff(staff.staff_id);
      fetchStaff();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = () => {
    fetchStaff();
  };

  return (
    <div className="space-y-6">
      {/* Header + Search + Add */}
      <StaffHeader
        isCoordinator={isCoordinator}
        onAdd={() => setIsModalOpen(true)}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* Staff Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Staff Members</CardTitle>
          <CardDescription>View and manage staff members</CardDescription>
        </CardHeader>
        <CardContent>
          <StaffTable
            staffList={filteredStaff}
            isCoordinator={isCoordinator}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>

      {/* Modal */}
      <StaffModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        staff={selectedStaff}
        onSaved={handleSave}
      />
    </div>
  );
};

export default Staff;
