// src/components/modals/CoursesModal.jsx
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { getCoordinators } from "../../api";

export const CoursesModal = ({ isOpen, onClose, course, onSave, readOnly }) => {
  const [formData, setFormData] = useState({
    course_name: "",
    coordinator_id: null, // use null instead of empty string
    modules_count: 0,
    status: "Active",
  });

  const [coordinators, setCoordinators] = useState([]);

  // Fetch coordinators from API
  useEffect(() => {
    const fetchCoordinators = async () => {
      try {
        const data = await getCoordinators();
        // Filter only Coordinators
        const filtered = data.filter((u) => u.role?.toLowerCase() === "coordinator");
        setCoordinators(filtered);
      } catch (err) {
        console.error("Error fetching coordinators:", err);
        setCoordinators([]);
      }
    };

    if (isOpen) fetchCoordinators();
  }, [isOpen]);

  // Reset form when opening modal
  useEffect(() => {
    if (course) {
      setFormData({
        course_name: course.course_name || "",
        coordinator_id: course.coordinator_id?.toString() || null,
        modules_count: course.modules_count ?? 0,
        status: course.status || "Active",
      });
    } else {
      setFormData({
        course_name: "",
        coordinator_id: null,
        modules_count: 0,
        status: "Active",
      });
    }
  }, [course, isOpen]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

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
          <div className="grid gap-4 py-4">
            {/* Course Name */}
            <div className="space-y-2">
              <Label htmlFor="course_name">Course Name</Label>
              <Input
                id="course_name"
                value={formData.course_name}
                onChange={(e) => handleInputChange("course_name", e.target.value)}
                placeholder="Enter course name"
                required
                disabled={readOnly}
              />
            </div>

            {/* Coordinator Dropdown */}
            <div className="space-y-2">
              <Label htmlFor="coordinator_id">Course Coordinator</Label>
              <Select
                value={formData.coordinator_id ?? ""}
                onValueChange={(value) => handleInputChange("coordinator_id", value)}
                disabled={readOnly || coordinators.length === 0}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select coordinator" />
                </SelectTrigger>
                <SelectContent>
                  {coordinators.length > 0 ? (
                    coordinators.map((coord) => (
                      <SelectItem
                        key={coord.staff_id}
                        value={coord.staff_id.toString()} // must be non-empty string
                      >
                        {`${coord.name} (ID: ${coord.staff_id})`}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem key="no-coordinators" value="none" disabled>
                      No coordinators found
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Modules Count */}
            <div className="space-y-2">
              <Label htmlFor="modules_count">Modules Count</Label>
              <Input
                id="modules_count"
                type="number"
                value={formData.modules_count}
                readOnly
              />
            </div>

            {/* Status Dropdown */}
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleInputChange("status", value)}
                disabled={readOnly}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem key="active" value="Active">Active</SelectItem>
                  <SelectItem key="inactive" value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

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
