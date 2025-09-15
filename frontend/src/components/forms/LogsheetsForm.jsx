import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";

export const LogsheetsForm = ({
  formData,
  setFormData,
  courses,
  modules,
  schedules,
  isCoordinator,
  viewOnly,
  logsheet,
  onSubmit,
}) => {
  const handleChange = (field, value) =>
    setFormData(prev => ({ ...prev, [field]: value }));

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4">
        {/* Course */}
        <div className="space-y-2">
          <Label>Course</Label>
          <Select
            value={formData.courseId}
            onValueChange={v => handleChange("courseId", v)}
            disabled={viewOnly || isCoordinator}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select course" />
            </SelectTrigger>
            <SelectContent>
              {courses.map(c => (
                <SelectItem key={c.course_id} value={c.course_id.toString()}>
                  {c.course_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Module */}
        <div className="space-y-2">
          <Label>Module</Label>
          <Select
            value={formData.moduleId}
            onValueChange={v => handleChange("moduleId", v)}
            disabled={viewOnly || isCoordinator || !modules.length}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select module" />
            </SelectTrigger>
            <SelectContent>
              {modules.map(m => (
                <SelectItem key={m.module_id} value={m.module_id.toString()}>
                  {m.module_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Schedule */}
        {!isCoordinator && (
          <div className="space-y-2">
            <Label>Schedule</Label>
            <Select
              value={formData.scheduleId}
              onValueChange={v => handleChange("scheduleId", v)}
              disabled={viewOnly || !schedules.length}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select schedule" />
              </SelectTrigger>
              <SelectContent>
                {schedules.map(s => (
                  <SelectItem key={s.schedule_id} value={s.schedule_id.toString()}>
                    {`${new Date(s.date).toLocaleDateString("en-GB")} (${s.start_time} - ${s.end_time})`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Date & Type */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Date</Label>
            <Input
              type="date"
              value={formData.date}
              onChange={e => handleChange("date", e.target.value)}
              disabled={viewOnly || isCoordinator}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Type</Label>
            <Select
              value={formData.type}
              onValueChange={v => handleChange("type", v)}
              disabled={viewOnly || isCoordinator}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Lecture">Lecture</SelectItem>
                <SelectItem value="Lab">Lab</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Start & End Time */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Start Time</Label>
            <Input type="time" value={formData.start_time} disabled required />
          </div>
          <div className="space-y-2">
            <Label>End Time</Label>
            <Input type="time" value={formData.end_time} disabled required />
          </div>
        </div>

        {/* Textareas for staff */}
        {!isCoordinator && (
          <>
            <div className="space-y-2">
              <Label>Topics Taught</Label>
              <Textarea
                value={formData.topics_taught}
                onChange={e => handleChange("topics_taught", e.target.value)}
                disabled={viewOnly}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Assignment Given</Label>
              <Textarea
                value={formData.assignment_given}
                onChange={e => handleChange("assignment_given", e.target.value)}
                disabled={viewOnly}
              />
            </div>
            <div className="space-y-2">
              <Label>Student Progress</Label>
              <Textarea
                value={formData.student_progress}
                onChange={e => handleChange("student_progress", e.target.value)}
                disabled={viewOnly}
              />
            </div>
          </>
        )}

        {/* Coordinator status */}
        {isCoordinator && logsheet && (
          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={formData.status} onValueChange={v => handleChange("status", v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <Button type="submit" className="bg-gradient-primary">
          Submit
        </Button>
      </div>
    </form>
  );
};
