import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { getCoordinators } from "../../api/staff";
import { CourseForm } from "../forms/CourseForm";

export const CoursesModal = ({ isOpen, onClose, course, onSave, readOnly }) => {
  const [coordinators, setCoordinators] = useState([]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchCoordinators = async () => {
      try {
        const data = await getCoordinators();
        setCoordinators(data.filter(u => u.role?.toLowerCase() === "coordinator"));
      } catch (err) {
        console.error("Error fetching coordinators:", err);
        setCoordinators([]);
      }
    };
    if (isOpen) fetchCoordinators();
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!readOnly) onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {readOnly ? "View Course" : course ? "Edit Course" : "Add New Course"}
          </DialogTitle>
          <DialogDescription>
            {readOnly
              ? "Course details (read-only)."
              : course
              ? "Update the course information below."
              : "Fill in the details to add a new course."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <CourseForm
            course={course}
            coordinators={coordinators}
            readOnly={readOnly}
            onChange={setFormData}
          />
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              {readOnly ? "Close" : "Cancel"}
            </Button>
            {!readOnly && (
              <Button type="submit" className="bg-gradient-primary hover:opacity-90">
                {course ? "Update Course" : "Add Course"}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
