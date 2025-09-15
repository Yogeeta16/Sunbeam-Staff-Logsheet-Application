import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { useToast } from "../../hooks/use-toast";
import { LogsheetsForm } from "../forms/LogsheetsForm";
import { getCourses } from "../../api/courses";
import { getModules } from "../../api/modules";
import { getSchedulesByStaff } from "../../api/schedules";
import { createLogsheet, updateLogsheet, updateLogsheetStatus, getLogsheets } from "../../api/logsheets";


export const LogsheetsModal = ({ isOpen, onClose, logsheet, user, viewOnly = false }) => {
  const { toast } = useToast();
  const isCoordinator = user?.role?.toLowerCase() === "coordinator";

  const [courses, setCourses] = useState([]);
  const [modules, setModules] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [existingLogsheets, setExistingLogsheets] = useState([]);
  const [formData, setFormData] = useState({
    courseId: "",
    moduleId: "",
    scheduleId: "",
    date: "",
    type: "Lecture",
    start_time: "",
    end_time: "",
    topics_taught: "",
    assignment_given: "",
    student_progress: "",
    status: "Pending",
  });

  // Load courses
  useEffect(() => {
    if (!isOpen) return;
    getCourses()
      .then(setCourses)
      .catch(() => toast({ title: "Failed to fetch courses", variant: "destructive" }));
  }, [isOpen]);

  // Load modules for selected course
  useEffect(() => {
    if (!formData.courseId) return setModules([]);
    getModules()
      .then((allModules) => {
        setModules(allModules.filter(m => m.course_id.toString() === formData.courseId));
      })
      .catch(() => toast({ title: "Failed to fetch modules", variant: "destructive" }));
  }, [formData.courseId]);

  // Load all logsheets (to filter schedules that already have one)
  useEffect(() => {
    if (!isOpen || isCoordinator) return;
    getLogsheets()
      .then(setExistingLogsheets)
      .catch(() => toast({ title: "Failed to fetch logsheets", variant: "destructive" }));
  }, [isOpen, isCoordinator]);

  // Load schedules for staff (exclude schedules that already have logsheets)
  useEffect(() => {
    if (!formData.courseId || !formData.moduleId || isCoordinator) return setSchedules([]);
    getSchedulesByStaff(user.id)
      .then((data) => {
        const filtered = data.filter(
          (s) =>
            s.course_id.toString() === formData.courseId &&
            s.module_id.toString() === formData.moduleId
        );
        const available = filtered.filter(
          (s) => !existingLogsheets.some((ls) => ls.schedule_id === s.schedule_id)
        );
        setSchedules(available);
      })
      .catch(() => toast({ title: "Failed to fetch schedules", variant: "destructive" }));
  }, [formData.courseId, formData.moduleId, user.id, isCoordinator, existingLogsheets]);

  // Populate form when editing/viewing
  useEffect(() => {
    if (!isOpen) return;
    if (logsheet) {
      setFormData({
        courseId: logsheet.course_id?.toString() || "",
        moduleId: logsheet.module_id?.toString() || "",
        scheduleId: logsheet.schedule_id?.toString() || "",
        date: logsheet.date ? new Date(logsheet.date).toISOString().split("T")[0] : "",
        type: logsheet.type || "Lecture",
        start_time: logsheet.start_time || "",
        end_time: logsheet.end_time || "",
        topics_taught: logsheet.topics_taught || "",
        assignment_given: logsheet.assignment_given || "",
        student_progress: logsheet.student_progress || "",
        status: logsheet.status || "Pending",
      });
    } else {
      setFormData((prev) => ({ ...prev, date: new Date().toISOString().split("T")[0] }));
    }
  }, [logsheet, isOpen]);

  // Auto-fill date/start/end when schedule is selected
  useEffect(() => {
    if (!formData.scheduleId) return;
    const schedule = schedules.find(s => s.schedule_id.toString() === formData.scheduleId);
    if (schedule) {
      const formattedDate = schedule.date ? new Date(schedule.date).toISOString().split("T")[0] : "";
      setFormData((prev) => ({
        ...prev,
        date: formattedDate,
        start_time: schedule.start_time,
        end_time: schedule.end_time,
      }));
    }
  }, [formData.scheduleId, schedules]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (viewOnly) return;

    const payload = {
      faculty_id: user.id,
      course_id: formData.courseId ? Number(formData.courseId) : null,
      module_id: formData.moduleId ? Number(formData.moduleId) : null,
      schedule_id: formData.scheduleId ? Number(formData.scheduleId) : null,
      date: formData.date,
      type: formData.type,
      start_time: formData.start_time,
      end_time: formData.end_time,
      topics_taught: formData.topics_taught,
      assignment_given: formData.assignment_given,
      student_progress: formData.student_progress,
      status: formData.status || "Pending",
    };

    try {
      if (isCoordinator && logsheet) {
        await updateLogsheetStatus(logsheet.logsheet_id, formData.status);
      } else if (logsheet) {
        await updateLogsheet(logsheet.logsheet_id, payload);
      } else {
        await createLogsheet(payload);
      }
      toast({ title: "Saved successfully" });
      onClose();
    } catch {
      toast({ title: "Save failed", variant: "destructive" });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {viewOnly
              ? "View Logsheet"
              : isCoordinator && logsheet
              ? "Update Status"
              : logsheet
              ? "Edit Logsheet"
              : "Submit Logsheet"}
          </DialogTitle>
        </DialogHeader>

        <LogsheetsForm
          formData={formData}
          setFormData={setFormData}
          courses={courses}
          modules={modules}
          schedules={schedules}
          isCoordinator={isCoordinator}
          viewOnly={viewOnly}
          logsheet={logsheet}
          onSubmit={handleSubmit}
        />

        <DialogFooter className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
