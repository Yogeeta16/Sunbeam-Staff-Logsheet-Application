import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { CoursesStats } from "../components/courses/CoursesStats";
import { CoursesTable } from "../components/courses/CoursesTable";
import { CoursesHeader } from "../components/courses/CoursesHeader";
import { CoursesModal } from "../components/modals/CoursesModal";
import { getCourses, createCourse, updateCourse, deleteCourse } from "../api/courses";

const Courses = () => {
  const { user } = useAuth();
  const isCoordinator = user?.role?.toLowerCase() === "coordinator";

  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isViewMode, setIsViewMode] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (err) {
        console.error("Error fetching courses:", err.response?.data || err.message);
      }
    };
    fetchCourses();
  }, []);

  const openAddModal = () => {
    setSelectedCourse(null);
    setIsViewMode(false);
    setModalOpen(true);
  };

  const openEditModal = (course) => {
    setSelectedCourse(course);
    setIsViewMode(false);
    setModalOpen(true);
  };

  const openViewModal = (course) => {
    setSelectedCourse(course);
    setIsViewMode(true);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    try {
      await deleteCourse(id);
      setCourses(courses.filter((c) => c.course_id !== id));
    } catch (err) {
      console.error("Error deleting course:", err.response?.data || err.message);
    }
  };

  const handleSave = async (formData) => {
    try {
      if (selectedCourse) {
        await updateCourse(selectedCourse.course_id, formData);
        setCourses(
          courses.map((c) =>
            c.course_id === selectedCourse.course_id ? { ...c, ...formData } : c
          )
        );
      } else {
        const newCourse = await createCourse(formData);
        setCourses([...courses, { course_id: newCourse.id, ...formData }]);
      }
      setModalOpen(false);
    } catch (err) {
      console.error("Error saving course:", err.response?.data || err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header + Search + Add */}
      <CoursesHeader
        isCoordinator={isCoordinator}
        onAdd={openAddModal}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* Stats */}
      <CoursesStats courses={courses} />

      {/* Courses Table */}
      <CoursesTable
        courses={courses}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isCoordinator={isCoordinator}
        onEdit={openEditModal}
        onView={openViewModal}
        onDelete={handleDelete}
      />

      {/* Modal */}
      <CoursesModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        course={selectedCourse}
        onSave={handleSave}
        readOnly={isViewMode}
      />
    </div>
  );
};
export default Courses; 