import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

export const ScheduleForm = ({
  formData,
  setFormData,
  staffList,
  courses,
  modules,
  availableModules,
  onSubmit,
  loading = false,
  viewOnly = false,
}) => {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Course */}
      <div>
        <Label>Course</Label>
        <select
          name="course_id"
          value={formData.course_id}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
          disabled={viewOnly}
        >
          <option value="">-- Select Course --</option>
          {courses.map(c => <option key={c.course_id} value={c.course_id}>{c.course_name}</option>)}
        </select>
      </div>

      {/* Module */}
      <div>
        <Label>Module</Label>
        <select
          name="module_id"
          value={formData.module_id}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
          disabled={viewOnly}
        >
          <option value="">-- Select Module --</option>
          {availableModules.map(m => <option key={m.module_id} value={m.module_id}>{m.module_name}</option>)}
        </select>
      </div>

      {/* Faculty */}
      <div>
        <Label>Faculty</Label>
        <select
          name="faculty_id"
          value={formData.faculty_id}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
          disabled={viewOnly} >
            
          <option value="">-- Select Faculty --</option>
          {staffList.map(f => <option key={f.staff_id} value={f.staff_id}>{f.name}</option>)}
        </select>
      </div>

      {/* Date / Type */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Date</Label>
          <Input type="date" name="date" value={formData.date} onChange={handleChange} required disabled={viewOnly} />
        </div>
        <div>
          <Label>Type</Label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
            disabled={viewOnly}
          >
            <option value="Lecture">Lecture</option>
            <option value="Lab">Lab</option>
          </select>
        </div>
      </div>

      {/* Start / End */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Start Time</Label>
          <Input type="time" name="start_time" value={formData.start_time} onChange={handleChange} required disabled={viewOnly} />
        </div>
        <div>
          <Label>End Time</Label>
          <Input type="time" name="end_time" value={formData.end_time} onChange={handleChange} required disabled={viewOnly} />
        </div>
      </div>

      {/* Group / Venue */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>classgroup</Label>
          <Input type="text" name="classgroup" value={formData.classgroup} onChange={handleChange} placeholder="Optional" disabled={viewOnly} />
        </div>
        <div>
          <Label>Venue</Label>
          <Input type="text" name="venue" value={formData.venue} onChange={handleChange} placeholder="Optional" disabled={viewOnly} />
        </div>
      </div>

      {/* Actions */}
      {!viewOnly && (
        <div className="flex justify-end gap-2">
          <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save"}</Button>
        </div>
      )}
    </form>
  );
};
