import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { ModulesHeader } from "../components/modules/ModulesHeader";
import { ModulesTable } from "../components/modules/ModulesTable";
import { ModulesModal } from "../components/modals/ModulesModal";
import { getModules, createModule, updateModule, deleteModule } from "../api/modules";
import { getCourses } from "../api/courses";
import { downloadOption } from "../api/utils";

const Modules = () => {
  const { user } = useAuth();
  const isCoordinator = user?.role.toLowerCase() === "coordinator";

  const [modules, setModules] = useState([]);
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch all modules
  const fetchModules = async () => {
    const data = await getModules();
    setModules(data);
  };

  // Fetch all courses
  const fetchCourses = async () => {
    const data = await getCourses();
    setCourses(data);
  };

  useEffect(() => {
    fetchModules();
    fetchCourses();
  }, []);

  // Filter modules based on search term
  const filteredModules = modules.filter(
    (m) =>
      m.module_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.course_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    setSelectedModule(null);
    setIsModalOpen(true);
  };

  const handleEdit = (module) => {
    setSelectedModule(module);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this module?")) return;
    try {
      await deleteModule(id);
      setModules((prev) => prev.filter((m) => m.module_id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  // Save module (create or update)
  const handleSave = async (formData) => {
    setLoading(true);
    try {
      if (selectedModule) {
        // Update existing module
        await updateModule(selectedModule.module_id, formData);
      } else {
        // Create new module
        await createModule(formData);
      }
      await fetchModules(); // Refresh the list
      setIsModalOpen(false);
    } catch (error) {
      console.error("Save failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <ModulesHeader
        isCoordinator={isCoordinator}
        onAdd={handleAdd}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <Card>
        <CardHeader>
          <CardTitle>All Modules</CardTitle>
          <CardDescription>
            {isCoordinator ? "Manage course modules" : "Browse available modules"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ModulesTable
            modules={filteredModules}
            isCoordinator={isCoordinator}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onDownload={(path) => downloadOption(path, "modules", true)}
          />
        </CardContent>
      </Card>

      <ModulesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        module={selectedModule}
        onSave={handleSave}
        courses={courses}
        loading={loading}
      />
    </div>
  );
};

export default Modules;
