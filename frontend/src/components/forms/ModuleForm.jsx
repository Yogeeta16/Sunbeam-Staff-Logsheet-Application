import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { useToast } from "../../hooks/use-toast";

export const ModuleForm = ({ formData, setFormData, onSubmit, courses, loading }) => {
  const { toast } = useToast();

  const [file, setFile] = useState(null);
  const [existingFilePath, setExistingFilePath] = useState(formData.curriculum_file_path || null);

  useEffect(() => {
    setExistingFilePath(formData.curriculum_file_path || null);
  }, [formData.curriculum_file_path]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile || null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.module_name || !formData.course_id) {
      toast({ title: "Error", description: "Module name and course are required." });
      return;
    }

    const formPayload = new FormData();
    formPayload.append("module_name", formData.module_name);
    formPayload.append("course_id", formData.course_id.toString());

    // Append new file if selected
    if (file) {
      formPayload.append("curriculum_file_path", file);
    }

    onSubmit(formPayload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Module Name */}
      <div className="space-y-2">
        <Label>Module Name</Label>
        <Input
          value={formData.module_name}
          onChange={(e) => handleInputChange("module_name", e.target.value)}
          placeholder="Enter module name"
          required
        />
      </div>

      {/* Course Select */}
      <div className="space-y-2">
        <Label>Course</Label>
        <Select
          value={formData.course_id || ""}
          onValueChange={(value) => handleInputChange("course_id", value)}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Select course" />
          </SelectTrigger>
          <SelectContent>
            {courses.map((course) => (
              <SelectItem key={course.course_id} value={course.course_id.toString()}>
                {course.course_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Curriculum PDF Upload */}
      <div className="space-y-2">
        <Label>Curriculum PDF</Label>
        <Input type="file" accept="application/pdf" onChange={handleFileChange} />
        {existingFilePath && !file && (
          <a
            href={existingFilePath}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 underline text-sm"
          >
            View Current PDF
          </a>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="submit" className="bg-gradient-primary hover:opacity-90" disabled={loading}>
          Save Module
        </Button>
      </div>
    </form>
  );
};
