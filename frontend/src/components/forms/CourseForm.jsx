import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "../ui/select";

export const CourseForm = ({ course, coordinators, readOnly, onChange }) => {
  const [formData, setFormData] = useState({
    course_name: "",
    coordinator_id: null,
    modules_count: 0,
    status: "Active",
  });

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
  }, [course]);

  const handleChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onChange(updated);
  };

  return (
    <div className="grid gap-4 py-4">
      {/* Course Name */}
      <div className="space-y-2">
        <Label htmlFor="course_name">Course Name</Label>
        <Input
          id="course_name"
          value={formData.course_name}
          onChange={(e) => handleChange("course_name", e.target.value)}
          placeholder="Enter course name"
          required
          disabled={readOnly}
        />
      </div>

      {/* Coordinator */}
      <div className="space-y-2">
        <Label htmlFor="coordinator_id">Course Coordinator</Label>
        <Select
          value={formData.coordinator_id ?? ""}
          onValueChange={(value) => handleChange("coordinator_id", value)}
          disabled={readOnly || coordinators.length === 0}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select coordinator" />
          </SelectTrigger>
          <SelectContent>
            {coordinators.length > 0 ? (
              coordinators.map((coord) => (
                <SelectItem key={coord.staff_id} value={coord.staff_id.toString()}>
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

      {/* Status */}
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select
          value={formData.status}
          onValueChange={(value) => handleChange("status", value)}
          disabled={readOnly}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="active" value="Active">
              Active
            </SelectItem>
            <SelectItem key="inactive" value="Inactive">
              Inactive
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
