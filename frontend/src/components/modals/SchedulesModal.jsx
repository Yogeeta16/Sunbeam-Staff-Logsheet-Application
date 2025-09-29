import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import { getStaff } from "../../api/staff";
import { getCourses } from "../../api/courses";
import { getModules } from "../../api/modules";
import { createSchedule, updateSchedule } from "../../api/schedules";
import { ScheduleForm } from "../forms/ScheduleForm";

export function SchedulesModal({ isOpen, onClose, schedule, refreshSchedules, viewOnly = false }) {
  const [staffList, setStaffList] = useState([]);
  const [courses, setCourses] = useState([]);
  const [modules, setModules] = useState([]);
  const [availableModules, setAvailableModules] = useState([]);
  const [formData, setFormData] = useState({
    course_id: "", module_id: "", faculty_id: "", date: "", start_time: "", end_time: "", type: "Lecture", classgroup: "", venue: ""
  });
  const [loading, setLoading] = useState(false);

  // Load dropdowns
  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const [staffData, courseData, moduleData] = await Promise.all([getStaff(), getCourses(), getModules()]);
        setStaffList(staffData || []);
        setCourses(courseData || []);
        setModules(moduleData || []);
      } catch (err) {
        console.error("Error fetching dropdowns:", err);
      }
    };
    fetchDropdowns();
  }, []);

  // Load schedule into form
  useEffect(() => {
    if (schedule) {
      setFormData({
        course_id: schedule.course_id?.toString() || "",
        module_id: schedule.module_id?.toString() || "",
        faculty_id: schedule.faculty_id?.toString() || "",
        date: schedule.date ? new Date(schedule.date).toISOString().split("T")[0] : "",
        start_time: schedule.start_time || "",
        end_time: schedule.end_time || "",
        type: schedule.type || "Lecture",
        classgroup: schedule.classgroup || "",
        venue: schedule.venue || "",
      });
    } else {
      setFormData({ course_id: "", module_id: "", faculty_id: "", date: "", start_time: "", end_time: "", type: "Lecture", classgroup: "", venue: "" });
    }
  }, [schedule]);

  // Filter modules based on course
  useEffect(() => {
    if (formData.course_id) {
      setAvailableModules(modules.filter(m => m.course_id?.toString() === formData.course_id));
    } else {
      setAvailableModules(modules);
    }
  }, [formData.course_id, modules]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (viewOnly) return;

    try {
      setLoading(true);
      if (schedule) {
        await updateSchedule(schedule.schedule_id, formData);
        toast({ title: "Updated", description: "Schedule updated successfully." });
      } else {
        await createSchedule(formData);
        toast({ title: "Created", description: "Schedule created successfully." });
      }
      if (refreshSchedules) refreshSchedules();
      onClose();
    } catch (err) {
      console.error("Error saving schedule:", err);
      toast({ title: "Error", description: "Failed to save schedule." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{viewOnly ? "View Schedule" : schedule ? "Edit Schedule" : "Create Schedule"}</DialogTitle>
        </DialogHeader>

        <ScheduleForm
          formData={formData}
          setFormData={setFormData}
          staffList={staffList}
          courses={courses}
          modules={modules}
          availableModules={availableModules}
          onSubmit={handleSubmit}
          loading={loading}
          viewOnly={viewOnly}
        />

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
